// import login from "./lib/Auth/Login.js"
// // import { userStore } from './lib/services/store'
// import { browser } from "$app/environment"
// import { varConfig, web } from "../config"

// let msal = sessionStorage.getItem(varConfig.msal.token)
// msal = JSON.parse(msal)
// // Skip login on hard reload if token is still valid
// if(msal !== null && msal.expiresOn > Date.now() / 1000) {
//     console.log('Token still valid')
//     // if(browser) {
//     //     if(window.location.pathname === '/') {
//     //         // Nødløsning frem til goto funksjonen fungerer.
//     //         // window.location.href = `${web.url}/authenticated/chatVTFK`
//     //         // Dette funker ikke, er noe svelte greier som ikke funker som det skal.
//     //         // goto('http://localhost:5173/authenticated')
//     //     }
//     // }
   
// } else {
//     const user = await login()
//     // userStore.set(await user)
// } 