import { View, Text, TextInput, Image, Alert} from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';


const SearchInput = ({initialQuery}) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '')

    return (
            <View className="border-2 border-black-200 w-full h-12 px-4 bg-black-100 rounded-2xl focus:border-secondary-100 items-center flex-row space-x-4">
                <TextInput className="text-base mt-0.5 text-white flex-1 font-pregular "
                    value = {query}
                    placeholder="search for a video topic"
                    placeholderTextColor="#CDCDE0"
                    onChangeText={(e)=> {
                        // console.log(e)
                        setQuery(e)
                    }  }
                />
                <TouchableOpacity
                    onPress={()=>{
                        if(!query){
                            return Alert.alert("missing query", "Please input something to search results accross database")
                        }
                        if(pathname.startsWith('/search')) router.setParams({query})
                        else router.push(`/search/${query}`)
                    }}
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