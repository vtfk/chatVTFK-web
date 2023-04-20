import axios from 'axios'
import { api } from '../../../config'
import { get } from 'svelte/store'
import { msalClientStore, userStore } from './store'
import login from '$lib/Auth/Login'

// Implement method to execute requets
const apiRequest = async (method, endpoint, body) => {
  let accessToken
  try {
    const msalClient = get(msalClientStore)
    accessToken = (await msalClient.acquireTokenSilent({ scopes: api.scope })).accessToken
    
  } catch (error) {
    // If acquireTokenSilent failed - we assume the user has been logged out or the refresh token has expired - simply log in again :)
    await login(true)
    const msalClient = get(msalClientStore)
    accessToken = (await msalClient.acquireTokenSilent({ scopes: api.scope })).accessToken
  }

  const headers = {
    authorization: `Bearer ${accessToken}`
  }
  if (['get', 'delete'].includes(method)) {
    const res = await axios[method](`${api.url}/${endpoint}`, { headers })
    return res.data
  } else {
    const res = await axios[method](`${api.url}/${endpoint}`, body, { headers })
    return res.data
  }
}

// export const getPhoto = async (upn) => {
//   let accessToken
//   try {
//     const msalClient = get(msalClientStore)
//     accessToken = (await msalClient.acquireTokenSilent({ scopes: ['User.ReadBasic.All'] })).accessToken
//   } catch (error) {
//     // If acquireTokenSilent failed - we assume the user has been logged out or the refresh token has expired - simply log in again :)
//     await login(true)
//     const msalClient = get(msalClientStore)
//     accessToken = (await msalClient.acquireTokenSilent({ scopes: ['User.ReadBasic.All'] })).accessToken
//   }

//   const headers = {
//     authorization: `Bearer ${accessToken}`
//   }
  
//   const res = await axios.get(`https://graph.microsoft.com/v1.0/users/${upn}/photos/120x120/$value`, { headers, responseType: 'blob' })
//   return res.data
// }

// Post chat completion 
export const chatCompletion = async (body) => await apiRequest ('post', 'Response', body)

// // Get me
// export const getMe = async () => await apiRequest('get', 'me')

// // Get user
// export const getPerson = async (parameter) => await apiRequest('get', `GetEmployee/${parameter}`)

// // Get orgUnits
// export const getOrg = async (parameter) => await apiRequest('get', `GetOrg/${parameter}`)

// // Get tasks
// export const getTasks = async (parameter) => await apiRequest('get', `GetTasks/${parameter}`)

// // Save my edited competence
// export const saveCompetence = async (competence) => await apiRequest('post', 'UpsertCompetence', competence)

// // Get settings
// export const getSettings = async () => await apiRequest('get', 'Settings')

// // Save edited settings
// export const saveSettings = async (adminSettings) => await apiRequest('post', 'Settings', adminSettings)

// // Send mail to users
// export const sendMail = async (mailPayload) => await apiRequest('post', 'SendMail', mailPayload)

// // Get employee positions (data list)
// export const getPositions = async () => await apiRequest('get', 'GetPositions')

// // Save Critical Tasks (filtered by the unit leader)
// export const saveCritical = async (criticalTasks) => await apiRequest('post', `CriticalTask`, criticalTasks)

// // Get the critical tasks filtered by the unit leader
// export const getCriticalTasks = async () => await apiRequest('get', 'GetSoloRoles')

// // Get chucky
// export const getChuck = async () => {
//   const res = (await axios.get('https://api.chucknorris.io/jokes/categories')).data
//   return res.map(ele => {
//     return {
//       value: ele,
//       category: 'Et valg'
//     }
//   })
// }
