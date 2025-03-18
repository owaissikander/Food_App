import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '@/constants/Data';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from '../components/Loading';
import { CachedImage } from '../components/helpers/image';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';


export default function Recipes({ meals, categories }) {
    const navigation = useNavigation()
    return (
        <View className='mx-4 space-y-3'>
            <Text style={{ fontSize: hp(3) }} className='font-semibold text-neutral-600'>Recipes</Text>
            <View>
                {
                    categories.length == 0 || meals.length == 0 ? (
                        <Loading size="large" className='mt-20' />
                    ) :
                        (<MasonryList
                            data={meals}
                            keyExtractor={(item): string => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <CardItem item={item} index={i} navigation={navigation} />}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                        />)
                }
            </View>
        </View>
    )
}
const CardItem = ({ item, index, navigation }) => {
    let isEven = index % 2 == 0;

   

    
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>

            <Pressable className='flex justify-center mb-4 space-y-1'
                 onPress={() => router.push({ pathname: '/RecipesDetailScreen', params: item })}
                style={{
                    width: '100%',
                    paddingLeft: isEven ? 0 : 8,
                    paddingRight: isEven ? 8 : 0,
                    marginBottom: 20
                }}>
                {/* <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35 }}
                    className='bg-black/5'
                /> */}
                <CachedImage
                    uri={item.strMealThumb}
                    style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35 }}
                    className='bg-black/5'
                    sharedTransitionTag={item.strMeal}
                />
                <Text
                    className='font-semibold ml-2 text-neutral-600 '
                    style={{ fontSize: hp(1.7) }}>
                    {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
                </Text>
            </Pressable>
        </Animated.View>
    )
}