import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';
import { useGlobalContext } from '../context/GlobalProvider';
import { updateDocument, getCurrentUser } from '../lib/appwrite';

const VideoCard = ({ video: { $id: videoId, title, thumbnail, video, prompt, creator: { username, avatar } } }) => {
    const { user, setUser } = useGlobalContext();
    const [play, setPlay] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    useEffect(() => {
        const isBookmarked = user?.bookmarks?.some(bookmark => bookmark.$id === videoId);
        setBookmark(isBookmarked);
    }, [user, videoId]);

    const handleBookmark = async () => {
        const bookmarkedVideoIds = user.bookmarks.map(bookmark => bookmark.$id);
        const isBookmarked = bookmarkedVideoIds.includes(videoId);

        const updateData = {
            bookmarks: isBookmarked
                ? user.bookmarks.filter(bookmark => bookmark.$id !== videoId)
                : [...user.bookmarks, { $id: videoId }],
        };

        try {
            await updateDocument(user.$id, updateData);
            const updatedUser = await getCurrentUser();
            setUser(updatedUser); 
            setBookmark(!isBookmarked); 
        } catch (error) {
            console.error('Error updating bookmarks:', error);
        }
    };

    return (
        <View className="flex-col items-center px-4 mb-4 pt-4 border border-gray-400 rounded-lg">
            <View className="flex-row gap-3 items-start ">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary-200 justify-center items-center p-0.5">
                        <Image
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-lg"
                            resizeMethod='cover'
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                        <Text className="text-gray-100 text-sm" numberOfLines={1}>{username}</Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu}
                        className="w-5 h-5"
                        resizeMode='contain'
                    />
                </View>
            </View>
            
            {play ? (
                <Video
                    source={{ uri: video }} 
                    className="w-full h-60 rounded-xl mt-3"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    onPress={() => setPlay(true)}
                    activeOpacity={0.7}
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode='cover'
                    />
                </TouchableOpacity>
            )}
            <View className="w-full mt-3 ml-2">
                <Text className="text-left font-pbold text-l text-gray-300">Description</Text>
                <Text className="text-white font-pregular text-xs">{prompt}</Text>
            </View>
            <View className="flex-row  justify-between p-3 rounded-lg mt-3">
                <TouchableOpacity className="flex-1 items-start ml-3" onPress={handleBookmark}>
                    {bookmark ? 
                        <Image source={icons.heartFill}
                        className="w-6 h-6"
                        resizeMode='contain'
                    />
                    :
                        <Image source={icons.heart}
                        className="w-6 h-6"
                        resizeMode='contain'
                    />
                    }
                    
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 items-end mr-3">
                    <Image source={icons.chat}
                        className="w-6 h-6"
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default VideoCard;
