<script>
    import '../app.css'
    import { goto } from '$app/navigation'
    import { navigating } from "$app/stores"
    import { browser } from "$app/environment"
    import { web } from '../../config';
	import { userStore } from '$lib/services/store';
	import { get } from 'svelte/store';
	import IconSpinner from '../components/Icons/IconSpinner.svelte';
	import SideNav from '../components/SideNav.svelte';
    

    let msal
    
    const user = get(userStore)
    console.log('Jeg kom hit i vercel')
    // if(browser && window.location.pathname === '/') {
    //     window.location.href = `${web.url}/authenticated/chatVTFK`
    // }
    // If user is navigating, check if user have a valid token. If the token is not valid, do something
    $: if($navigating) {
        try {
            msal = sessionStorage.getItem(`${user.homeAccountId}-login.windows.net-accesstoken-${user.idTokenClaims.aud}-${user.tenantId}-openid profile user.read email--`)
            if(msal) {
                msal = JSON.parse(msal)
            } else {
                msal = {}
            }
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

<div>
    {#await msal}
        <div class="centerSpinner">
            <IconSpinner />
        </div>
    {:then} 
        <div class="sideNavWrapper">
            <SideNav/>
        </div>
        <div class="contentWrapper">
            <div class="content">
                <h2 style="margin-bottom: 1rem; margin-left: 0.5rem;">Hei</h2>
                <slot></slot>
            </div>
        </div>
    {/await}
   
</div>

<style>
    .sideNavWrapper, .contentWrapper {
        min-height: 100vh;
    }

    .sideNavWrapper {
        position: fixed;
        width: calc(var(--sidenavWidth));
        background-color: var(--varme-1);
        top: 0;
        bottom: 0;
        left: 0;
        overflow-y:auto;
        overflow-x:hidden;
    }

    .contentWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin-left: var(--sidenavWidth);
        width: calc(98vw - var(--sidenavWidth));
        padding: 0px 32px;
        overflow:auto;
    }

    .content {
        margin-top: 2rem;
        width: 90%;
        padding: 3rem;
    } 
</style>