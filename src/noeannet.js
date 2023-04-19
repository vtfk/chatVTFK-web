

/* 
    Sveltekit og vercel har noen problemer i kildekoden som gjør at SSR ikke fungerer som tenkt. Vi benytter oss derfor av CSR for å komme rundt dette problemet
*/


// import login from "./lib/Auth/Login.js"
// import { browser } from "$app/environment"
// import { userStore } from "$lib/services/store.js"
// import { get } from "svelte/store"

// // console.log(varConfig)
// // let msal = sessionStorage.getItem(varConfig.msal.token)
// // msal = JSON.parse(msal)

// let user = undefined
// if(user !== undefined) {

// // Skip login on hard reload if token is still valid
// // if(msal !== null && msal.expiresOn > Date.now() / 1000) {
//     // if(msal !== null) {
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
//     console.log('Vi logger inn')
//     const user = await login()
//     console.log('Vi har logger inn')
//     userStore.set(user)
//     console.log('Vi har satt bruker i store')
//     console.log(get(userStore))
// } 
// // 