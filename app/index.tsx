import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import "../global.css"
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '@/components/Categories';
import axios from 'axios';
import Recipes from '@/app/Recipes';
import Loading from '../components/Loading';
export default function index() {
    const [isActiveCategory, setIsActiveCategory] = useState('Beef')
    const [categories, setCategory] = useState([])
    const [meals, setMeals] = useState([])
    const [isFavourite, setIsFavourite] = useState(false)
    useEffect(() => {
        getCategory()
        getRecipes()
    }, [])


    const handleChangeCategory = category => {
        getRecipes(category)
        setIsActiveCategory(category)
        setMeals([])
    }
    const getCategory = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
            if (response && response.data) {
                setCategory(response.data.categories)
            }


        } catch (error) {
            console.log('error=>', error);

        }
    }
    const getRecipes = async () => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${isActiveCategory}`)
            //console.log("response=>", response.data);

            if (response && response.data) {
                setMeals(response.data.meals)
            }


        } catch (error) {
            console.log('error=>', error);

        }
    }

    return (
        <View className='flex-1 bg-white'>
            <StatusBar style='dark' />
            <ScrollView

                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className='space-y-6 pt-14'
            >
                {/* avater and bell icon */}
                <View className='mx-4 flex-row justify-between p-[10px] items-center mb-2'>
                    <Image
                        className='rounded-full'
                        source={require('../assets/images/avatar.jpeg')}
                        style={{ height: hp(5), width: hp(5.5) }} />
                    <BellIcon onPress={() => setIsFavourite(!isFavourite)} size={hp(4)} className={isFavourite ? "bg-red-600" : ""} color="gray" />
                </View>
                {/* greeting and puncline */}
                <View className='mx-4 space-y-2 mb-2'>
                    <Text style={{ fontSize: hp(1.7) }} className='font-semibold text-neutral-600'>Hello, Owais</Text>
                    <View>
                        <Text style={{ fontSize: hp(2.8) }} className='font-semibold text-neutral-600'>Make your own food.</Text>
                    </View>
                    <Text style={{ fontSize: hp(3.8) }} className='font-semibold text-neutral-600'>
                        stay at <Text className='text-amber-400'>Home</Text>
                    </Text>
                </View>
                {/* search bar */}
                <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-[4px]'>
                    <TextInput
                        placeholderTextColor={'gray'}
                        placeholder='Search any recipe'
                        className='flex-1 text-base pl-3 mb-1 tracking-wider'
                        style={{ fontSize: hp(1.9) }}

                    />
                    <View className='bg-white rounded-full p-3'>
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color='gray' />
                    </View>
                </View>
                {categories.length > 0 && <Categories categories={categories} isActiveCategory={isActiveCategory} handleChangeCategory={handleChangeCategory} />}
                {/* Recipes section */}
                <Recipes meals={meals} categories={categories} />


            </ScrollView>

        </View>
    )
}
