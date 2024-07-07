import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';
export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.narayan.showEm",
    projectId: "6683e4b1003ac4747093",
    databaseId: "6683ea0a003df696a373",
    userCollectionId: "6683ea3b0020223b6ac1",
    videoCollectionId: "6683ea660021c922ce3a",
    storageId: "6683ecfe001e9346d2de"
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
// Register User

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}


export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log("sign in is not happening in the first place!")
    throw new Error(error);
  }
}


export const getCurrentUser = async() =>{
  try {
    const currentAccount = await account.get();
    if(!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )
    if(!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search('title', query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.equal('creator', userId)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error.message);
  }
}



export const signOut = async () =>{
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}