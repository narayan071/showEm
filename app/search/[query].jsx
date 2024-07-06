import { View, Text } from 'react-native'
import {React, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from  '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {

  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

 useEffect(()=>{
  refetch();
 },[query])


  return (
    <>
      <SafeAreaView className="bg-primary h-full p-2">
        <FlatList
          data = {posts}
          keyExtractor={(item) => item.$id}
          renderItem={({item})=>(
            <VideoCard video={item}/>
          )}
          ListHeaderComponent={()=>(
            <View className="my-6 px-4">
                <View>
                  <Text className="font-pmedium text-gray-100">
                    Search Results For
                  </Text>
                  <Text className="text-white text-2xl font-pextrabold">
                    {query}
                  </Text>
                  <View className="mt-6 mb-8">
                    <SearchInput initialQuery = {query}
                      placeholder={"Search for a video topic"}
                    />
                  </View>
              </View>
            </View>
          )}
          ListEmptyComponent={()=>(
            <EmptyState 
              subtitle="No videos found!"
              title="No videos found for this search query"
            />
          )}


        />
      </SafeAreaView>
    </>
  )
}

export default Search 