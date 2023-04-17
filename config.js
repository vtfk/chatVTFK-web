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

export const varConfig = {
    msal: {    
        token: '1f5766eb-28da-4bdc-9c18-dfe735d0f547.08f3813c-9f29-482f-9aec-16ef7cbf477a-login.windows.net-accesstoken-d68ca4eb-4e3f-4b78-aa38-ed38fa75e786-08f3813c-9f29-482f-9aec-16ef7cbf477a-openid profile user.read email--',
        user: '1f5766eb-28da-4bdc-9c18-dfe735d0f547.08f3813c-9f29-482f-9aec-16ef7cbf477a-login.windows.net-08f3813c-9f29-482f-9aec-16ef7cbf477a'
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