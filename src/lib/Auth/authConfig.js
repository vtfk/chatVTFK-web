import { env } from '$env/dynamic/private'

// Config object to be passed to MSAL on creation
const msalConfig = {
    auth: {
      clientId: env.VITE_CLIENT_ID,
      authority: env.VITE_CLIENT_ISS,
      redirectUri: env.VITE_REDIRECT_URI
    },
    cache: {
      cacheLocation: 'sessionStorage', // This configures where your cache will be stored
      storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
    }
  }
  
  export default msalConfig
  