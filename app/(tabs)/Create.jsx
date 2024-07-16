import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import FormField from '../../components/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as ImagePicker from 'expo-image-picker'
import { createVideo } from '../../lib/appwrite'
import {useGlobalContext} from '../../context/GlobalProvider'
const Create = () => {

  const {user} = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail : null,
    prompt : '',
  })

  const openPicker = async (selectType) =>{
    const result = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images: ImagePicker.MediaTypeOptions.Videos,
        // allowsEditing: true,
        aspect: [4, 3],
        quality: 1, 
      }
    )
    if(!result.canceled) {
      if(selectType === "image") {
        setForm({...form, thumbnail : result.assets[0]});
      }
      if(selectType === 'video'){
        setForm({...form, video : result.assets[0]})
      }
    }
 
  }

  const submit = async ()=>{
     if(!form.prompt || !form.thumbnail || !form.title || !form.video){
      return Alert.alert("please fill in all the fields")
     }
     setUploading(true)
     try {
      await createVideo({
        ...form, userId : user.$id
      })
      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/Home')
     } catch (error) {
      Alert.alert('Error', error.message)
     } finally{
        setForm({
          title: '',
          video: null,
          thumbnail : null,
          prompt : '',
        })
        setUploading(false);

     }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold"> 
          Upload Video!
        </Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder={"give your video a catchy title"}
          handleChangeText={(e) => setForm({...form, title : e})}
          otherStyles="mt-10"
        />
        <View className = "mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium ">Upload video</Text>
          <TouchableOpacity onPress={()=>openPicker('video')}>
            {form.video ? 
              (<Video
                source = {{uri : form.video.uri}}
                className="w-full h-64 rounded-2xl"
                // useNativeControls
                resizeMode={ResizeMode.COVER}
                // isLooping
              />) : (
              <View className="w-full h-40 px-4 bg-black-100 justify-center items-center ">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )  
          }
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
        <Text className="text-base text-gray-100 font-pmedium ">Thumbnail Image</Text>
        <TouchableOpacity onPress={()=>openPicker('image')}>
            {form.thumbnail ? 
              (<Image
                source = {{uri : form.thumbnail.uri}}
                className="w-full h-64 rounded-2xl"
                resizeMode='cover'
              />) : (
              <View className="w-full h-16 px-4 bg-black-100 justify-center items-center border-2 border-black-200 flex-row space-x-2">
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className="w-5 h-5"
                  />
                  <Text className="text-sm text-gray-100 font-pemdium">Choose a file</Text>
              </View>
            )  
          }
          </TouchableOpacity>
        </View>
        <FormField
          title="Description"
          value={form.prompt}
          placeholder={"fill in a suiting description"}
          handleChangeText={(e) => setForm({...form, prompt : e})}
          otherStyles="mt-7"
        />
        <CustomButton 
        title="Submit & Publish"
        containerStyles="mt-7"
        isLoading={uploading}
        handlePress={submit}
      />
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default Create