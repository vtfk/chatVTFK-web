<script>
    import '../../app.css'
	import SideNav from "../../components/SideNav.svelte";
    import IconSpinner from '../../components/Icons/IconSpinner.svelte';
	import { onMount } from 'svelte';
    import { varConfig } from '../../../config';
    import { accesstokenStore, msalClientStore } from '../../lib/services/store';

    let msalUser
    let msalToken
    
    onMount(async () => {
        try {
            if(varConfig !== null || varConfig !== undefined) {
                msalUser = sessionStorage.getItem(varConfig?.msal.user)
                msalUser = JSON.parse(msalUser)
                msalToken = sessionStorage.getItem(varConfig?.msal.token)
                msalToken = JSON.parse(msalToken)
            } else {
                console.log('Oi, her er noe galt')
            }
        }catch(error) {
            console.log(error)
        }
    })

    // This function only exists to create a delay for the store to actually get the values.
    const test = async () => {
        const user = await msalUser
        const token = await msalToken
        accesstokenStore.set(token)

        return await user
    }
</script>

<div>
    {#await test()}
        <div class="centerSpinner">
            <IconSpinner />
        </div>
    {:then} 
        <div class="sideNavWrapper">
            <SideNav/>
        </div>
        <div class="contentWrapper">
            <div class="content">
                <h2 style="margin-bottom: 1rem; margin-left: 0.5rem;"> Hei, {msalUser.name} 🤓</h2>
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