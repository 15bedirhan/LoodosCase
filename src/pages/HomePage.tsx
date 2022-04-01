/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {Props, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Easing,
} from 'react-native';

//3rd party libraries && others
import {SafeAreaView} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';

import {COLORS, FONTS, SIZES} from '../constants';
import {AppContext} from '../context/AppContext';

const HomePage = ({navigation}: Props) => {
  const [searchString, setSearchString] = React.useState<string>(''); //user type for search a movie
  const [delaySearch, setDelaySearch] = React.useState<any>(null); //use for search timeout
  const [imageError, setImageError] = React.useState<boolean>(false); //if there are no image show not found component
  const [hasError, setHasError] = React.useState<boolean | object>(false);
  const [loading, setLoading] = React.useState<boolean>(true); //for loading animation

  const {movieData, setMovieData}: any = useContext(AppContext);
  const bounceAnimate = new Animated.Value(0);
  const opacityAnimate = bounceAnimate.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });
  //Function Block
  function searchFnc(text: string) {
    if (delaySearch) {
      clearTimeout(delaySearch);
    }
    //set value to state
    setSearchString(text);
    setDelaySearch(
      setTimeout(() => {
        //request send
        getMovieDetail(text);
      }, 1500),
    );
  }

  function getMovieDetail(text: string) {
    setLoading(true);
    setImageError(false); //set the image error value false right before request send
    fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=78257c9&t=${text}&plot=full`,
    )
      .then(response => response.json())
      .then(data => {
        //result save state
        console.log(data);
        if (data.Response === 'True') {
          setMovieData(data);
        } else {
          setHasError({e: data.Error, error: true});
        }
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
        setHasError({e, error: true});
      });
  }
  function loadingAnimation() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnimate, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnimate, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
      {iterations: 5},
    ).start(() => {
      setLoading(false);
    });
  }
  // UI Block

  const MovieCardComp = () =>
    React.useMemo(
      () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailPage')}
          style={styles.cardContainer}>
          <Text style={styles.title}>{movieData?.Title}</Text>
          {!imageError && (
            <Image
              onError={() => setImageError(true)}
              style={styles.bgImage}
              resizeMode="cover"
              source={{uri: movieData?.Poster}}
            />
          )}
        </TouchableOpacity>
      ),
      [movieData, imageError],
    );

  function renderSearch() {
    return (
      <View style={{width: '85%', alignSelf: 'center', marginVertical: 15}}>
        <Text style={styles.headerText}>Search</Text>
        <View style={styles.searchContainer}>
          <TextInput
            onChangeText={(text: string) => searchFnc(text)}
            value={searchString}
            placeholderTextColor={COLORS.lightGray}
            style={styles.textInput}
            placeholder="Search movie by name..."
          />
          {searchString.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setMovieData(null);
                setSearchString('');
                setHasError(false);
                if (delaySearch) {
                  clearTimeout(delaySearch);
                }
              }}>
              <Text style={{...FONTS.body1, color: COLORS.white}}>x</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  function renderBody() {
    if (movieData) {
      return <MovieCardComp />;
    } else if (hasError?.error) {
      return (
        <Text style={[styles.textInput, {width: '100%', textAlign: 'center'}]}>
          Something went wrong. {hasError?.e}
        </Text>
      );
    }
  }

  React.useEffect(() => {
    //if string remove by keyboard since timeout fired immediately I need to clear the effect so it won't send request
    //also remove movieData
    if (searchString.length === 0 && delaySearch) {
      clearTimeout(delaySearch);
      setMovieData(null);
    }
  }, [searchString, delaySearch]);

  React.useEffect(() => {
    if (loading) {
      loadingAnimation();
    }
  }, [loading]);

  React.useEffect(() => {
    messaging()
      .requestPermission()
      .then(authStatus => {
        // console.log('APNs Status: ', authStatus);
        if (
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
          messaging()
            .getToken()
            .then(token => {
              console.log('device token ', token);
            });
          messaging().onMessage(async remoteMessage => {
            console.log('A new message arrived', remoteMessage);
          });
        }
      })
      .catch(err => {
        console.log('requestPermission Error: ', err);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* loading animation part */}
      {loading && (
        <View style={styles.animatedContainer}>
          <Animated.View
            style={[
              styles.animatedBall,
              {
                transform: [{translateY: bounceAnimate}],
                opacity: opacityAnimate,
              },
            ]}
          />
          <Animated.Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
              opacity: opacityAnimate,
            }}>
            Loading...
          </Animated.Text>
        </View>
      )}

      {/* search area */}
      {renderSearch()}

      {/* container area */}
      {renderBody()}
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  animatedContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBall: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.lightRed,
  },
  headerText: {...FONTS.h1, color: COLORS.white},
  textInput: {
    height: 50,
    width: '90%',
    color: COLORS.white,
    ...FONTS.body2,
  },
  searchContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
    marginVertical: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(127, 93, 240, 0.9)',
    borderRadius: SIZES.base,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: '-15%',
  },
  descText: {...FONTS.body3, color: COLORS.white},
  title: {
    ...FONTS.body1,
    color: COLORS.lightRed,
    fontWeight: 'bold',
    marginVertical: '3%',
  },
  bgImage: {
    width: '100%',
    height: SIZES.height * 0.55,
  },
  cardContainer: {
    width: '85%',
    height: SIZES.height * 0.6,
    alignSelf: 'center',
  },
});
