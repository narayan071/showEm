import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';
import { useGlobalContext } from '../context/GlobalProvider';
import { updateDocument, getCurrentUser, deleteDocument } from '../lib/appwrite';

const VideoCard = ({ video }) => {
    const { user, setUser } = useGlobalContext();
    const [play, setPlay] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    if (!video || !video.$id || !video.creator) {
        return null; 
    }

    const { $id: videoId, title, thumbnail, video: videoUrl, prompt, creator: { username, avatar, $id: creatorId } } = video;

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
            console.log("bookmark clicked")
            await updateDocument(user.$id, updateData);
            const updatedUser = await getCurrentUser();
            setUser(updatedUser);
            setBookmark(!isBookmarked);
            console.log("finish here")
        } catch (error) {
            console.error('Error updating bookmarks:', error);
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            "Delete Video",
            "Are you sure you want to delete this video?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await deleteDocument(videoId);
                            console.log('Video deleted successfully');
                        } catch (error) {
                            console.error('Error deleting video:', error);
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <View className="flex-col items-center px-4 mb-4 pt-4 border border-gray-400 rounded-lg">
            <View className="flex-row gap-3 items-start">
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
                {user.$id === creatorId && (
                    <View className="pt-2">
                        <TouchableOpacity onPress={handleDelete}>
                            <Image
                                source={icons.trash}
                                className="w-5 h-5"
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            
            {play ? (
                <Video
                    source={{ uri: videoUrl }} 
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
            <View className="flex-row justify-between p-3 rounded-lg mt-3">
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
