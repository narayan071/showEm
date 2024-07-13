import { View, Text, Image, RefreshControl, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import EmptyState from '../../components/EmptyState';
import { getBookmarkedPosts } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import VideoCard from '../../components/VideoCard';

const Bookmark = () => {
  const { user, setUser } = useGlobalContext();  
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBookmarkedPosts(); 
    setRefreshing(false);
  };

  const fetchBookmarkedPosts = async () => {
    console.log(user); 
    if (!Array.isArray(user?.bookmarks) || !user.bookmarks.length) {
      setBookmarkedPosts([]);
      return;
    }

    try {
      const bookmarkIds = user.bookmarks.map(bookmark => bookmark.$id);
      const posts = await getBookmarkedPosts(bookmarkIds);
      setBookmarkedPosts(posts);
    } catch (error) {
      console.error('Error fetching bookmarked posts:', error);
    }
  };

  useEffect(() => {
    fetchBookmarkedPosts(); 
  }, [user]);

  return (
    <SafeAreaView className="bg-primary h-full p-2">
      <FlatList
        data={bookmarkedPosts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-white text-2xl font-pextrabold">
                  Bookmarks
                </Text>
                <Text className="font-pregular text-gray-100">
                  All your loved ones in one place ❤️
                </Text>
              </View>
              <Image
                resizeMode='contain'
                className="w-10 h-11"
                source={images.logoSmall}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            subtitle="No bookmarks found!"
            title="Upload new video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
