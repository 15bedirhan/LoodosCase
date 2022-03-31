import * as React from 'react';

//3rd party libraries
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppContextWrapper} from '../context/AppContext';

//pages
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';

//types
import {RootStackParamList} from '../types/RootStackState';
import SplashScreen from '../pages/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App({isHeadless}: React.Props) {
  if (isHeadless) {
    return null;
  }
  return (
    <AppContextWrapper>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="DetailPage" component={DetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextWrapper>
  );
}

export default App;
