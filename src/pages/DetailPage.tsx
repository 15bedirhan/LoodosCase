/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Props, useContext} from 'react';

//3rd party contents and others
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppContext} from '../context/AppContext';

import {COLORS, FONTS, images, SIZES} from '../constants';

const DetailPage = ({navigation}: Props) => {
  const {movieData}: object | any = useContext(AppContext);

  //UI Blocks
  function imgBgComp() {
    return (
      <ImageBackground
        style={styles.bgImageSty}
        blurRadius={1}
        source={{uri: movieData?.Poster}}>
        {/* header Part */}
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              marginLeft: '5%',
            }}>
            <Text style={styles.b3Text}>Back</Text>
          </TouchableOpacity>
        </SafeAreaView>

        {/* bottom Part */}
        <View
          style={{
            margin: '5%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.titleTextSty}>{movieData?.Title}</Text>
            <Text style={[styles.b3Text, {marginLeft: '10%'}]}>
              ({movieData?.Year})
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: '5%'}}>
            {movieData?.Genre?.split(',').map((item: string, index: number) => (
              <Text
                key={`genre-${index}`}
                style={[
                  styles.genreTextSty,
                  {marginLeft: index !== 0 ? '5%' : 0},
                ]}>
                {item}
              </Text>
            ))}
          </View>
        </View>
      </ImageBackground>
    );
  }
  function renderRatingBlock() {
    return (
      <View style={styles.ratingContainer}>
        <View style={styles.ratingItems}>
          <Text
            style={{
              color:
                parseInt?.(movieData?.Metascore) > 49
                  ? COLORS.green
                  : COLORS.red,
              ...FONTS.body2,
            }}>
            {movieData?.Metascore}
          </Text>
          <Text style={styles.b3Text}>Metascore</Text>
        </View>
        <View style={styles.ratingItems}>
          <Image
            source={images.starPng}
            style={[styles.starIcon, {tintColor: COLORS.lightRed}]}
          />
          <Text>
            <Text style={[styles.b3Text, {fontWeight: 'bold'}]}>
              {movieData?.imdbRating}
            </Text>
            <Text style={{...FONTS.body5, color: COLORS.white}}> / 10</Text>
          </Text>
        </View>
        <View style={styles.ratingItems}>
          <TouchableOpacity>
            <Image source={images.starPng} style={styles.starIcon} />
          </TouchableOpacity>
          <Text style={styles.b3Text}>Rate This</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* header with img component */}
      {imgBgComp()}

      {/* rating part */}
      {renderRatingBlock()}

      {/* detailed info part */}
      <View style={{flex: 1, paddingHorizontal: '5%'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginBottom: SIZES.padding}}>
          <Text style={{...FONTS.h1, color: COLORS.white}}>Synopsis</Text>
          <Text
            style={[styles.b3Text, {textAlign: 'justify', marginTop: '5%'}]}>
            {movieData?.Plot}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.dark},
  ratingContainer: {
    margin: '5%',
    borderBottomWidth: 0.3,
    borderTopWidth: 0.3,
    borderColor: COLORS.lightGray,
    paddingVertical: '5%',
    flexDirection: 'row',
  },
  titleTextSty: {...FONTS.body1, color: COLORS.white},
  genreTextSty: {
    ...FONTS.body4,
    color: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.radius,
  },
  ratingItems: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  b3Text: {...FONTS.body3, color: COLORS.white},
  starIcon: {width: 20, height: 20, marginBottom: 5},
  bgImageSty: {height: SIZES.height * 0.55, justifyContent: 'space-between'},
});
