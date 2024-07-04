import { View, Text, TextInput, Image} from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { icons } from '../constants';

const SearchInput = ({
    title, 
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    handleSearch,
    ...props
}) => {

    return (
            <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary-100 items-center flex-row space-x-4">
                <TextInput className="text-base mt-0.5 text-white flex-1 font-pregular "
                    placeholder={placeholder}
                    value={value}
                    placeholderTextColor="#7B7B8B"
                    onChangeText={handleChangeText}
                    {...props}
                />
                <TouchableOpacity
                    onPress={()=>{handleSearch}}
                >
                    <Image
                        source={icons.search}
                        resizeMode='contain'
                        className="w-6 h-6"
                    />
                </TouchableOpacity>
            </View>
    )
}

export default SearchInput