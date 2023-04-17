
import { PublicClientApplication } from '@azure/msal-browser'
import { authConfig } from '../../../config'
import { msalClientStore } from '$lib/services/store.js' 
import { get } from 'svelte/store'

const popupLogin = async (forceLogin = false) => {
  const msalClient = get(msalClientStore) || new PublicClientApplication(authConfig)
  const accounts = msalClient.getAllAccounts()
  if (accounts.length === 0 || forceLogin) {
    const loginResponse = await msalClient.loginPopup({ scopes: ['User.Read'] })
    msalClient.setActiveAccount(loginResponse.account)
    msalClientStore.set(msalClient)
    return loginResponse.account
  }
  return accounts[0]
}

const login = async (forceLogin = false) => {
  const msalClient = get(msalClientStore) || new PublicClientApplication(authConfig)
  const loginResponse = await msalClient.handleRedirectPromise()
  if (loginResponse && !forceLogin) {
    msalClient.setActiveAccount(loginResponse.account)
    msalClientStore.set(msalClient)
    return loginResponse.account
  } else {
    msalClient.loginRedirect({ scopes: ['User.Read'] })
  }
}

export default login
 