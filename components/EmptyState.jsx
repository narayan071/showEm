import { View, Text, Image} from 'react-native'
import React from 'react'
import { images } from '../constants'
import { router } from 'expo-router'
import CustomButton from './CustomButton'
const EmptyState = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
        <Image 
            source={images.empty}
            className="w-[270px] px h-[215px]"
            resizeMode='contain'
        />
        <Text className="text-white mt-2 text-2xl font-pextrabold">
            {subtitle}
        </Text>
        <Text className="font-pmedium text-gray-100">
            {title}
        </Text>
        <CustomButton
          title= "create a video"
          handlePress={()=>router.push('/Create')}
          containerStyles={"w-full my-5"}
        />
    </View>
  )
}

export default EmptyState