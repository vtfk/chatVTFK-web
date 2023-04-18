<!-- <script>
    import { goto } from '$app/navigation'
    import { navigating } from "$app/stores"
    import { browser } from "$app/environment"
    import { web } from '../../config';
	import { userStore } from '$lib/services/store';
	import { get } from 'svelte/store';


    let msal
    
    const user = get(userStore)
    console.log('Jeg kom hit i vercel')
    if(browser && window.location.pathname === '/') {
        window.location.href = `${web.url}/authenticated/chatVTFK`
    }
    // If user is navigating, check if user have a valid token. If the token is not valid, do something
    $: if($navigating) {
        try {
            msal = sessionStorage.getItem(`${user.homeAccountId}-login.windows.net-accesstoken-${user.idTokenClaims.aud}-${user.tenantId}-openid profile user.read email--`)
            msal = JSON.parse(msal)
        } catch(error) {
            console.log(error)
        } finally { 
            // If token is valid
            if(msal !== null && msal.expiresOn > Date.now() / 1000) {
                goto(`${web.url}/authenticated/chatVTFK`)
                // if($navigating.to.url.pathname === 'http://localhost:5173/authenticated/chatVTFK') {
                //     goto('http://localhost:5173/authenticated/chatVTFK')
                // } else {
                //     goto($navigating.to.url.pathname)
                // }
            } 
            else {
                sessionStorage?.clear()
                userStore.set(undefined)
                goto($navigating.to.url.pathname)
                location.reload(true)
            }
        }
    }
    console.log('Jeg kom hit i vercel2')
</script>
 -->
<slot></slot>