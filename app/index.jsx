import { View, Text, Image, Link } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'
import { ScrollView } from 'react-native'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../context/GlobalProvider'
const index = () => {
  const {isLoading, isLoggedIn} = useGlobalContext();
  if(!isLoading && isLoggedIn){
    // console.log("is loggen in?: ", isLoggedIn);
    return <Redirect href='/Home' />
  }
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{height: '100%'}}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Image 
              source = {images.logo}
              className="w-[170px] h-[100px] ml-10"
              resizeMode="contain"
            />
            <Image 
              source={images.cards}
              className="max-w--[380px] w-full h-[300px]"
              resizeMode="contain"
            />
                      {/* <Link href='/home' className='text-white'>go to home</Link> */}

            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">Discover Endless Possibilites with <Text className="text-secondary-200">showEm!</Text></Text>
              <Image
                source={images.path} 
                className="w-[136px] h-[15px] absolute top-14 right-20 "
                resizeMode="contain"
              />
            </View>
            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitless with showEm</Text>
            <CustomButton
              title="continue with email"
              handlePress = {()=>router.push('/Signin')}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>
        <StatusBar backgroundColor='#161622' style='light'/>
      </SafeAreaView>
    </>
  )
}

export default index