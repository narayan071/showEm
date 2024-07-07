import { View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import {useGlobalContext} from '../../context/GlobalProvider'

const Signin = () => {

  const [form, setForm] = useState({
    username : "",
    email : "",
    password : "",
    confirmpassword : "",
  })
  const {setUser, setIsLoggedIn} = useGlobalContext()

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async()=>{
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields');
    }
      setIsSubmitting(true);
      try {
        const result = await createUser(form.email, form.password, form.username);
        setUser(result);
        setIsLoggedIn(true)
        router.replace('/Home');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
      finally{
        setIsSubmitting(false);
      }
      console.log("create user clicked")
    }
  

  return (
    <SafeAreaView className="bg-primary h-full flex-1">
      <ScrollView>
        <View className="w-full justify-center align-center min-h-[100vh]  px-4 py-4" >
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          <Text className="font-psemibold text-2xl text-white mt-5">Sign up for showEm</Text>
          <FormField
            title="Name"
            value={form.username}
            placeholder="enter your username"
            handleChangeText = {(e)=>setForm({...form, username: e})}
            otherStyles="mt-7"
            // keyboardType="email-address"
          />
          <FormField
            title="Email"
            value={form.email}
            placeholder="enter your email id"
            handleChangeText = {(e)=>setForm({...form, email: e})}
            keyboardType="email-address"
            otherStyles="mt-3"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e)=>setForm({...form, password: e})}
            otherStyles="mt-3"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="Re-enter your password"
            handleChangeText={(e)=>setForm({...form, password: e})}
            otherStyles="mt-3"
          />
          <CustomButton
            title="Sign-Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className='justify-center mx-auto mt-7 flex-row'>
            <Text className="text-gray-100 text-lg font-psemibold">Member already ? </Text>
            <Link href="/Signin" className='text-lg text-secondary-200  font-psemibold'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signin