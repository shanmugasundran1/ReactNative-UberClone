import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { setDestination, setOrigin } from '../slices/navSlice'
import { useDispatch } from 'react-redux'
import NavFavourites from '../components/NavFavourites'

const HomeScreen = () => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={tw`bg-white h-full p-5`}>
      <View style={tw`p-0`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
          source={{ uri: 'https://links.papareact.com/gzs' }}
        />
      </View>

      <GooglePlacesAutocomplete
        placeholder='Where From?'
        style={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
        onPress={(data, details) => {
          dispatch(
            setOrigin({
              location: details.geometry.location,
              description: data.description,
            })
          )
          dispatch(setDestination(null))
        }}
        fetchDetails={true}
        returnKeyType={'search'}
        enablePoweredByContainer={false}
        minLength={2}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={400}
      />

      <NavOptions />
      <NavFavourites />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  text: {
    color: 'blue',
  },
})
