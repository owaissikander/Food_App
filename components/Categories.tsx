import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { categoryData } from '../constants/Data'
import Animated, { FadeInDown } from 'react-native-reanimated';
import axios from 'axios';
import { CachedImage } from './helpers/image';


export default function Categories({ categories, isActiveCategory, handleChangeCategory }) {


    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className='space-x-7'
                contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 15, }}>

                {
                    categories.map((cat: any, index: number) => {
                        let isActive = cat.strCategory == isActiveCategory
                        let aciveButtonColor = isActive ? 'bg-amber-400' : 'bg-black/10'
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleChangeCategory(cat.strCategory)}
                                className='flex items-center space-y-1'
                            >

                                <View className='rounded-full p-[12px]' style={{ paddingHorizontal: 4 }}>
                                    {/* <Image
                                        source={{ uri: cat.strCategoryThumb }}
                                        style={{ width: hp(6), height: hp(6) }}
                                        className='rounded-full'
                                    /> */}
                                    <CachedImage

                                        uri={cat.strCategoryThumb}
                                        style={{ width: hp(6), height: hp(6) }}
                                        className='rounded-full p-[6px]'

                                    />
                                </View>
                                <Text
                                    className={isActive ? 'text-amber-400' : 'text-neutral-400'}
                                    style={{ fontSize: hp(1.6) }}>
                                    {cat.strCategory}
                                </Text>

                            </TouchableOpacity>

                        )
                    })
                }
            </ScrollView>
        </Animated.View>
    )
}
