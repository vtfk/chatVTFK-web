import { env } from '$env/dynamic/public'

export const authConfig = {
    auth: {
        clientId: env.PUBLIC_VITE_CLIENT_ID,
        authority: env.PUBLIC_VITE_CLIENT_ISS,
        redirectUri: env.PUBLIC_VITE_REDIRECT_URI
    },
        cache: {
        cacheLocation: 'sessionStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
    }
}

export const api = {
    local: {
        url: env.PUBLIC_VITE_API_URL
    }
}

export const web = {
    url: env.PUBLIC_VITE_WEB_URL
}
