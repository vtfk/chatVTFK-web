<script>
    import '../app.css'
    import { goto } from '$app/navigation'
    import { navigating } from "$app/stores"
    import { browser } from "$app/environment"
    import { web } from '../../config';
	import { userStore } from '$lib/services/store';
	import { get } from 'svelte/store';
	import login from '$lib/Auth/Login';

    let msal
    
    const user = get(userStore)
    console.log('Jeg kom hit i vercel')
    if(browser && window.location.pathname === '/') {
        window.location.href = `${web.url}/authenticated/chatVTFK`
    }

    const loginHandler = async () => {
        if(!get(userStore)) {
            console.log('Vi logger inn')
            const user = await login()
            console.log('Vi har logger inn')
            userStore.set(user)
            console.log('Vi har satt bruker i store')
            console.log(get(userStore))
        } else {
            console.log('logga inn jo!')
        }
        
    }
    // If user is navigating, check if user have a valid token. If the token is not valid, do something
    // $: if($navigating) {
    //     try {
    //         msal= sessionStorage.getItem('1f5766eb-28da-4bdc-9c18-dfe735d0f547.08f3813c-9f29-482f-9aec-16ef7cbf477a-login.windows.net-accesstoken-d68ca4eb-4e3f-4b78-aa38-ed38fa75e786-08f3813c-9f29-482f-9aec-16ef7cbf477a-openid profile user.read email--')
    //         // msal = sessionStorage.getItem(`${user.homeAccountId}-login.windows.net-accesstoken-${user.idTokenClaims.aud}-${user.tenantId}-openid profile user.read email--`)
    //         if(msal) {
    //             msal = JSON.parse(msal)
    //         } else {
    //             msal = {}
    //         }
    //     } catch(error) {
    //         console.log(error)
    //     } finally { 
    //         // If token is valid
    //         if(msal !== null && msal.expiresOn > Date.now() / 1000) {
    //             goto(`${web.url}/authenticated/chatVTFK`)
    //             // if($navigating.to.url.pathname === 'http://localhost:5173/authenticated/chatVTFK') {
    //             //     goto('http://localhost:5173/authenticated/chatVTFK')
    //             // } else {
    //             //     goto($navigating.to.url.pathname)
    //             // }
    //         } 
    //         else {
    //             sessionStorage?.clear()
    //             userStore.set(undefined)
    //             goto($navigating.to.url.pathname)
    //             location.reload(true)
    //         }
    //     }
    // }
    console.log('Jeg kom hit i vercel2')
</script>
{#await loginHandler()}
    <p>logger inn</p>
{:then} 
    <slot></slot>
{/await}
