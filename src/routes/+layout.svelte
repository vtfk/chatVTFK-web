<script>
    import { goto } from '$app/navigation'
    import { navigating } from "$app/stores"
    import { browser } from "$app/environment"
    import { varConfig, web } from '../../config';

    let msal

    if(browser && window.location.pathname === '/') {
        window.location.href = `${web.url}/authenticated`
    }
    // If user is navigating, check if user have a valid token. If the token is not valid, do something
    $: if($navigating) {
        try {
            msal = sessionStorage.getItem(varConfig.msal.token)
            msal = JSON.parse(msal)
        } catch(error) {
            console.log(error)
        } finally { 
            // If token is valid
            if(msal !== null && msal.expiresOn > Date.now() / 1000) {
                goto(`${web.url}/authenticated`)
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
</script>

<slot></slot>