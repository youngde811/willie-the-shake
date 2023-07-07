
// This file contains the entry point for our WillieShake app.

// MIT License

// Copyright (c) 2023 David Young

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
// Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
// WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { StatusBar } from 'expo-status-bar';
import { Image, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';

import * as SplashScreen from 'expo-splash-screen';

import InsultEmAll from './src/mobile/InsultEmAll';

import styles from './src/styles/styles.js';

const DefaultBackground = require('./assets/images/StreetRod.jpg');

SplashScreen.preventAutoHideAsync();

function WillieShakeLanding() {
    const insets = useSafeAreaInsets();
    const [fontsLoaded] = useFonts({
        'Inter-Black': require('./assets/fonts/Inter-Black.otf')
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#25292e', paddingTop: insets.top }} onLayout={ onLayoutRootView }>
          <View style={styles.imageContainer}>
            <Image source={DefaultBackground} style={styles.image}/>
            <Text style={{ fontFamily: 'Inter-Black', fontSize: 25, paddingTop: 10 }}>
              Harley-Davidson Street Rod
            </Text>
          </View>
          <StatusBar style="auto"/>
        </View>
    );
}

function WillieShakeInsults() {
    const insets = useSafeAreaInsets();
    const [fontsLoaded] = useFonts({
        'Inter-Black': require('./assets/fonts/Inter-Black.otf')
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: 'white', paddingTop: insets.top }} onLayout={ onLayoutRootView }>
          <View style={styles.imageContainer}>
            <InsultEmAll/>
          </View>
          <StatusBar style="auto"/>
        </View>
    );
}

export default function App() {
  return (
      <SafeAreaProvider>
        <WillieShakeInsults/>
      </SafeAreaProvider>
  );
}
