/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/stacks/RootStack';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message is handled in the background!', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App);
