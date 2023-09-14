<script>
    import '../app.css'
    import { goto } from '$app/navigation'
    import { navigating } from "$app/stores"
    import { browser } from "$app/environment"
    import { api, web } from '../../config';
	import { userStore } from '$lib/services/store';
	import { get } from 'svelte/store';
	import login from '$lib/Auth/Login';
	import IconSpinner from '../components/Icons/IconSpinner.svelte';

    let msal
    let user

    if(browser && window.location.pathname === '/') {
        window.location.href = `${web.url}/authenticated`
    }

    const loginHandler = async () => {
        if(!get(userStore)) {
            const user = await login()
            userStore.set(user)
        } else {
            {}
        }
    }

    // If user is navigating, check if user have a valid token. If the token is not valid, do something.
    $: if($navigating) {
        user = (get(userStore))
        try {
            // msal = sessionStorage.getItem(`${user.homeAccountId}-login.windows.net-accesstoken-${user.idTokenClaims.aud}-${user.tenantId}-openid profile user.read email--`)
            msal = sessionStorage.getItem(`${user.homeAccountId}-login.windows.net-accesstoken-${user.idTokenClaims.aud}-${user.tenantId}-${api.scope}--`)
            if(msal) {
                msal = JSON.parse(msal)
            } else {
                msal = {}
            }
        } catch(error) {
            console.log('jeg kom hit, da gikk noe galt')
        } finally { 
            // If token is valid
            if(msal !== {} && (msal !== null|| msal !== undefined) && msal.expiresOn > Date.now() / 1000) {
                goto($navigating.to.url.pathname)
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

{#await loginHandler()}
    <div class="centerSpinner">
        <IconSpinner />
    </div>
{:then} 
    <slot/>
{/await}
