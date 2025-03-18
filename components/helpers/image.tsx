import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import Animated from "react-native-reanimated"




export const CachedImage = (props) => {
    const [cacheSource, setCacheSource] = useState(null)
    const { uri } = props



    useEffect(() => {
        const getCachedSource = async () => {
            try {
                const cachedImageData = await AsyncStorage.getItem(uri)
                if (cachedImageData) {
                    setCacheSource({ uri: cachedImageData });
                } else {
                    const response = await fetch(uri);
                    const imageBlob = await response.blob();
                    const base64Data = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob)
                        reader.onloadend = () => {
                            resolve(reader.result)
                        }
                    })

                    await AsyncStorage.setItem(uri, base64Data)
                    setCacheSource({ uri: base64Data })
                }
            } catch (error) {
                console.log('error caching image ', error);
                setCacheSource({ uri })
            }
        }
        getCachedSource()
    }, [])
    return <Animated.Image source={cacheSource} {...props} />

}