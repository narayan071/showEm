import { View, Text, Image, Link } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { ScrollView } from 'react-native';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../context/GlobalProvider';

const index = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) {
    return <Redirect href='/Home' />;
  }
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <StatusBar backgroundColor='#161622' style='light' />
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4 mt-7">
            <Image
              source={images.logo}
              className="w-[170px] h-[100px] ml-10"
              resizeMode="contain"
            />
            <Image
              source={images.cards}
              className="max-w--[380px] w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">Share Your Moments with <Text className="text-secondary-200">showEm!</Text></Text>
              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute top-14 right-20"
                resizeMode="contain"
              />
            </View>
            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Upload, and explore videos from around the world. Your story deserves to be seen.</Text>
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push('/Signin')}
              containerStyles="w-full mt-14"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default index;
