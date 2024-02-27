import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client'
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

import Landing from './src/screens/landing/Landing'
import store from './src/store/Store';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { colors } from './assets/styles/Colors';

import * as FileSystem from 'expo-file-system';


const httpLink = createUploadLink({
  uri: Constants.manifest.extra.backendUrl
})


const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync('access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
});

const wsLink = new WebSocketLink(
  {
    uri: Constants.manifest.extra.webSocketUrl,
    options: {
      reconnect: true
    }
  }
);

const splitLink = ApolloLink.split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const link = ApolloLink.from([splitLink])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link)
});


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.secondary,
    background: 'white',
  },
};

const App = () => {
  
  CreateCache = async () => {
    try{
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory)
    } catch (e){
      {}
    }
  }

  const setToken = async() => {
    await SecureStore.setItemAsync('access_token', '').then(response =>
      {}
    )  
  }
  
  useEffect(() => {
    CreateCache

    setToken()
    
  })

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <Landing />
        </PaperProvider>
      </Provider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('Mapsy', () => App);
export default App;