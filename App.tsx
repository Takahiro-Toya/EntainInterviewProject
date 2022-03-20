/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HorseListScreen } from './src/screens/horseList';

const App = () => {

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <HorseListScreen />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
