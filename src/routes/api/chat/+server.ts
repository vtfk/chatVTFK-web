// import { json, type RequestEvent } from "@sveltejs/kit";
// import axios from 'axios'
// /*
//     Denne brukes ikke lenger, ble kun skrevet for å få en rask poc, se azf-chat-vtfkpå github
// */
// export const POST = async (event:RequestEvent) => {
//     const requestBody = await event.request.json()
//     const { priorMessages = [], message, isInitializing = false } = requestBody

//     const headers = {
//         'Content-Type': 'application/json',
//         Authorization: "Bearer "
//     }

//     const initialMessage = {
// 		role: 'system',
// 		content: 'Skriv en kort introduksjon og kort om hva du kan brukes til. Du heter ChatVTFK'
// 	}

//     const messages = isInitializing ? [initialMessage] : [
//         initialMessage,
//         ...priorMessages, 
//         { 
//             role: 'user',
//             content: message
//         }
//     ]


//     // const modmsg =  {input: ""}

//     // const modres = await axios.post('https://api.openai.com/v1/moderations', modmsg, {headers: headers})

//     // console.log(modres.data.results)

//     const completionBody = {
//         model: 'gpt-3.5-turbo',
//         // temperature: 1,
//         messages
//     }

//     const request = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(completionBody)
//     }).then((res) => {
//         if(!res.ok) {
//             throw new Error(res.statusText)
//         }
//         return res
//     }).then((res) => res.json())

//     console.log(request)

//     const completionMessage = request?.choices?.map?.((choice: { message: { role: any; content: any; }; }) => ({
//         role: choice.message?.role,
//         content: choice.message?.content
//     }))

//     return json(completionMessage)
// }