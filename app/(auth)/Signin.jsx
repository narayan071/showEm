import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
const Signin = () => {

  const [form, setForm] = useState({
    email : "",
    password : "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = ()=>{

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4  py-4 mt-7" >
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          <Text className="font-psemibold text-2xl text-white mt-5">Log in to showEm</Text>
          <FormField
            title="Email"
            value={form.email}
            placeholder="enter registered email id"
            handleChangeText = {(e)=>setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e)=>setForm({...form, password: e})}
            
          />

          <CustomButton
            title="Sign-in"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className='justify-center mx-auto mt-7 flex-row'>
            <Text className="text-gray-100 text-lg font-psemibold">Don't have an account ? </Text>
            <Link href="/Signup" className='text-lg text-secondary-200  font-psemibold'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signin