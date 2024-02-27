import { GOOGLE_API_KEY, BACKEND_URL, WS_URL } from 'react-native-dotenv';


export default ({ config }) => {
  return {
    ...config,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "mapsy.cl.mapsy",
      config: {
        googleMapsApiKey: GOOGLE_API_KEY
      }
    },
    android: {
      package: "mapsy.cl.mapsy",
      config: {
        googleMaps: {
          apiKey: GOOGLE_API_KEY
        }
      }
    },
    extra: {
      googleApiKey: GOOGLE_API_KEY,
      backendUrl: BACKEND_URL,
      webSocketUrl: WS_URL
    }
  };
};