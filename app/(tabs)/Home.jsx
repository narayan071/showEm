import { View, Text, Image, RefreshControl, Alert } from 'react-native'
import {React, useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native'
import {images} from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from  '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {


  const {data : posts, refetch} = useAppwrite(getAllPosts);
  const {data : latestPosts} = useAppwrite(getLatestPosts);
  // console.log(posts);
  
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async() =>{
    setRefreshing(true);
    
    await refetch();
    setRefreshing(false);
  }



  return (
    <>
      <SafeAreaView className="bg-primary h-full p-2">
        <FlatList
          data = {posts}
          // data = {[]}
          keyExtractor={(item) => item.$id}
          renderItem={({item})=>(
            <VideoCard video={item}/>
          )}
          ListHeaderComponent={()=>(
            <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-gray-100">
                    Welcome back!
                  </Text>
                  <Text className="text-white text-2xl font-pextrabold">
                    Narayan
                  </Text>
                </View>
                <Image
                  resizeMode='contain'
                  className="w-9 h-10"
                  source={images.logoSmall}
                />
              </View>
              <SearchInput
                placeholder={"Search for a video topic"}
              />
              
              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="font-pregular text-lg text-gray-100 mb-3">Latest Videos</Text>
                <Trending posts = {latestPosts}/>
              </View>
            </View>
          )}
          ListEmptyComponent={()=>(
            <EmptyState 
              subtitle="No videos found!"
              title="Be the first one to upload a video"
            />
          )}

          refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={onRefresh} />}

        />
      </SafeAreaView>
    </>
  )
}

export default Home