import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {Props} from 'react';

//3rd party libraries
import NetInfo from '@react-native-community/netinfo';
import remoteConfig from '@react-native-firebase/remote-config';
//constants & others
import {COLORS, FONTS} from '../constants';

const SplashScreen = ({navigation}: Props) => {
  const [remoteConfigText, setRemoteConfigText] = React.useState<string>('');

  function getRemoteConfig() {
    const LoodosText = remoteConfig().getValue('Loodos');
    console.log('bb', remoteConfig().getValue('loodos_text').asString());
    setRemoteConfigText(LoodosText.asString());
    console.log('aa', LoodosText.asString());

    setTimeout(() => {
      navigation.replace('HomePage');
    }, 3000);
  }
  function checkInternetConnection() {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      console.log('Is isInternetReachable?', state.isInternetReachable);
      if (!state.isInternetReachable) {
        Alert.alert('Warning', 'You must have an active internet connection', [
          {
            text: 'Try Again!',
            onPress: () => {
              checkInternetConnection();
            },
          },
        ]);
      } else {
        getRemoteConfig();
      }
    });
  }
  React.useEffect(() => {
    checkInternetConnection();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{...FONTS.body1, color: COLORS.white}}>
        {remoteConfigText}
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
  },
});
