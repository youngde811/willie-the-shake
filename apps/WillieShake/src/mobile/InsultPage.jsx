// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

// This component renders the insult page itself.

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

import React, { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, ImageBackground, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { AppBar, HStack, IconButton, Button } from "@react-native-material/core";

import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import * as SplashScreen from 'expo-splash-screen';

import EmbeddedWebView from './EmbeddedWebView';
import InsultEmAll from './InsultEmAll';
import FavoriteInsults from './FavoriteInsults';

import styles from '../styles/styles.js';

const backgroundImage = require("../../assets/images/willie.png");
const insults = require('../../assets/data/insults.json');

SplashScreen.preventAutoHideAsync();

export default function WillieShakeInsults({ appConfig }) {
    const [insultData, setInsultData] = useState([]);
    const [appIsReady, setAppIsReady] = useState(false);
    const [wikiVisible, setWikiVisible] = useState(false);
    const [gitHubVisible, setGitHubVisible] = useState(false);
    const [favoritesVisible, setFavoritesVisible] = useState(false);

    const [fontsLoaded] = useFonts({
        'Inter-Black': require('../../assets/fonts/Inter-Black.otf')
    });

    useEffect(() => {
        async function prepare() {
            try {
                setInsultData(insults.insults);
            } catch (e) {
                console.log("Failure awaiting app load: " + JSON.stringify(e, null, 4));
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
            setAppIsReady(true);
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const showProject = () => {
        setGitHubVisible(true);
    };

    const showWiki = () => {
        setWikiVisible(true);
    };

    const showFavorites = () => {
        setFavoritesVisible(true);
    };
    
    return (
        <ImageBackground source={ backgroundImage } resizeMode='cover' style={ styles.backgroundImage }>
          <SafeAreaView style={[{ paddingTop: 10 }, styles.appTopView]} onLayout={ onLayoutRootView }>
            <StatusBar style="auto"/>
            <AppBar title={ appConfig.names.appTitle } subtitle={ appConfig.names.appSubtitle } style={ styles.appBar }
                    subtitleStyle={ styles.appBarSubtitle } transparent={ true } trailing={ props => (
                <HStack>
                  <IconButton
                    icon={ props => <MaterialIcons name="favorite" { ...props }/>} onPress={ showFavorites }
                    { ...props }/>
                  <IconButton
                    icon={ props => <EvilIcons name="sc-github" { ...props }/>} onPress={ showProject }
                    { ...props }/>
                  <IconButton
                    icon={ props => <EvilIcons name="external-link" { ...props }/>} onPress={ showWiki }
                    { ...props }/>
                </HStack>
            )}/>
            <ActivityIndicator animating={ !appIsReady } size='large' color='#3b63b3'/>
            <View style={ styles.insultTopView }>
              { insultData.length > 0 ? 
                <InsultEmAll insults={ insultData } appConfig={ appConfig }/>
                :
                null }
            </View>
            { wikiVisible ? <EmbeddedWebView webPage={ appConfig.wikiPage } setDismiss={ () => setWikiVisible(false) }/> : null }
            { gitHubVisible ? <EmbeddedWebView webPage={ appConfig.projectURL } setDismiss={ () => setGitHubVisible(false) }/> : null }
            { favoritesVisible ? <FavoriteInsults appConfig={ appConfig } setDismiss={ () => setFavoritesVisible(false) }/> : null }
          </SafeAreaView>
        </ImageBackground>
    );
}
