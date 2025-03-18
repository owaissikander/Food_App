import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { CachedImage } from '@/components/helpers/image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, HeartIcon, Square2StackIcon, Square3Stack3DIcon, UserIcon } from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams
import Loading from '@/components/Loading'
import axios from 'axios'
import Animated, { FadeInDown } from 'react-native-reanimated'

export default function RecipesDetailScreen() {
    const params = useLocalSearchParams(); // Access route parameters
    const navigation = useNavigation()
    const [isFavourite, setIsFavourite] = useState(false)
    const [loading, setLoading] = useState(false)
    const { strMeal, strMealThumb, strArea, idMeal } = params
    const [meal, setMeal] = useState(null)
    useEffect(() => {
        getMealData(idMeal)
    }, [])

    const getMealData = async (id: number) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            console.log('got data===', response.data);
            if (response && response.data)
                setMeal(response.data.meals[0])
        } catch (error) {
            console.log("error======>", error);

        }
    }
    const IngredientIndexes = (meal) => {
        console.log("meal===>", meal);

        if (!meal) return []
        let indexes = []
        for (let i = 1; i <= 20; i++)
            if (meal['strIngredient' + i]) {

                indexes.push(i)
            }
        return indexes

    }
    return (
        <ScrollView
            className='bg-white flex-1'
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}  >

            <StatusBar style={'light'} />

            <View className='flex-row justify-center mt-1  '>
                <CachedImage
                    uri={strMealThumb}
                    style={{ width: wp(98), height: hp(50), borderRadius: 35, borderBottomLeftRadius: 40 }}
                    sharedTransitionTag={strMeal}
                />
            </View>
            <View className='w-full absolute flex-row justify-between p-6 mt-6 items-center'>
                <TouchableOpacity className='p-2 rounded-full ml-5 bg-white' onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color='#fbbf24' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} className='p-2 rounded-full mr-5 bg-white'>
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? 'red' : 'gray'} />
                </TouchableOpacity>

            </View>


            {/* Meals Area...  */}

            {
                loading ? (
                    <Loading size="large" className="mt-16" />
                ) : (
                    <View className='px-4 flex justify-between space-y-4 pt-8'>
                        {/* name and area */}
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className='space-y-2'>
                            <Text style={{ fontSize: hp(3) }} className='font-bold flex-1 text-neutral-700'>
                                {strMeal}
                            </Text>
                            <Text style={{ fontSize: hp(2) }} className='font-medium flex-1 text-gray-400'>
                                {strMeal}
                            </Text>
                        </Animated.View>
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className='flex-row justify-around'>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View style={{ height: hp(6.5), width: hp(6.5) }}
                                    className='bg-white rounded-full flex items-center justify-center'
                                >
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color='#525252' />

                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>
                                        35
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>
                                        35
                                    </Text>
                                </View>
                            </View>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View style={{ height: hp(6.5), width: hp(6.5) }}
                                    className='bg-white rounded-full flex items-center justify-center'
                                >
                                    <UserIcon size={hp(4)} strokeWidth={2.5} color='#525252' />

                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>
                                        03
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>
                                        Serving
                                    </Text>
                                </View>
                            </View>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View style={{ height: hp(6.5), width: hp(6.5) }}
                                    className='bg-white rounded-full flex items-center justify-center'
                                >
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color='#525252' />

                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>
                                        103
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>
                                        Cal
                                    </Text>
                                </View>
                            </View>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View style={{ height: hp(6.5), width: hp(6.5) }}
                                    className='bg-white rounded-full flex items-center justify-center'
                                >
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color='#525252' />

                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>
                                        35
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>
                                        35
                                    </Text>
                                </View>
                            </View>

                        </Animated.View>

                        {/* Ingredient */}

                        <View className='space-y-4'>
                            <Text style={{ fontSize: hp(2.5) }} className='font-bold flex-1 text-neutral-700'>
                                Ingredients
                            </Text>
                            <View className='space-y-2 ml-3'>
                                {
                                    IngredientIndexes(meal).map((i) => {
                                        return (
                                            <View key={i} className='flex-row space-x-4'>
                                                <View style={{ height: hp(1.5), width: hp(1.5) }}
                                                    className='bg-amber-300 rounded-full'
                                                />
                                                <View className='flex-row space-x-2'>
                                                    <Text className='text-neutral-700 font-extrabold'   >
                                                        {meal["strMeasure" + i]}
                                                    </Text>
                                                    <Text className='text-neutral-700 font-medium ' >
                                                        {meal["strIngredient" + i]}
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        {/* Intructions */}
                        <View className='space-y-4' >
                            <Text
                                style={{ fontSize: hp(2.5) }}
                                className='font-bold flex-1 text-neutral-700'>
                                Intructions
                            </Text>
                            <Text style={{ fontSize: hp(1.6) }}
                                className='text-neutral-700'
                            >
                                {
                                    meal?.strInstructions
                                }

                            </Text>
                        </View>




                    </View>



                )
            }

        </ScrollView>
    );
}