// -*- mode: rjsx; eval: (auto-fill-mode 1); -*-

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

import React, { useEffect, useState } from 'react';

import { Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';

import InsultPage from './src/mobile/InsultPage';

const appConfig = require("./assets/appconfig.json");

export default function App() {
    const masterErrorHandler = (e, isFatal) => {
        if (isFatal) {
            Alert.alert(
                'Unexpected exception occurred',
                `
                Error: ${ (isFatal) ? 'Fatal: ' : '' } ${ e.name } ${ e.message }

                Please restart your WillieShake app!
                `,
                [{ text: 'Restart', onPress: () => { RNRestart.Restart(); } }]
            );
        } else {
            console.log('WillieShake: exception: ' + e);
        }
    };

    setJSExceptionHandler(masterErrorHandler);

    return (
        <SafeAreaProvider>
          <InsultPage appConfig={ appConfig }/>
        </SafeAreaProvider>
    );
}
