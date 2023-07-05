<script>
    import '../../app.css'
	import SideNav from "../../components/SideNav.svelte";
    import IconSpinner from '../../components/Icons/IconSpinner.svelte';
	import { onMount } from 'svelte';
    import { accesstokenStore, userRoles, userStore } from '../../lib/services/store';
	import { get } from 'svelte/store';
	import TopNav from '../../components/TopNav.svelte';

    let msalUser
    let msalToken
    let user
    let accessToken
    let roles

    onMount(async () => {
        user = get(userStore)
        // msalToken = sessionStorage.getItem(`${user.homeAccountId}-login.windows.net-accesstoken-${user.idTokenClaims.aud}-${user.tenantId}-openid profile user.read email--`)
        msalToken = sessionStorage.getItem(`${user.homeAccountId}-login.windows.net-accesstoken-${user.idTokenClaims.aud}-${user.tenantId}-api://c443279c-2806-488f-b032-c9cf7fa52852/user_impersonation--`)
        if (msalToken) {
            msalToken = JSON.parse(msalToken)
            accessToken = msalToken?.secret
            const tokenParts = accessToken.split(".")
            const tokenPayload = JSON.parse(atob(tokenParts[1]))
            if([tokenPayload?.roles].length > 0) {
                roles = tokenPayload.roles
                userRoles.set(roles)
            } else {
                roles = undefined
            }
        } else {
            msalToken = {}
        }
        msalUser = sessionStorage.getItem(`${user.homeAccountId}-login.windows.net-${user.tenantId}`)
        if(msalUser) {
            msalUser = JSON.parse(msalUser)
        } else {
            msalUser = {}
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
            <SideNav roles={roles}/>
        </div>
        <div class="topNavWrapper">
            <TopNav roles={roles} />
        </div>
        <div class="contentWrapper">
            <div class="content">
                <h2> Hei, {msalUser.name} 🤓</h2>
                <slot></slot>
            </div>
        </div>
    {/await}
   
</div>

<style>
    .sideNavWrapper, .contentWrapper {
        min-height: 100vh;
    }

    .topNavWrapper { 
        position: sticky;
        width: 100%;
        background-color: var(--varme-1);
        height: calc((var(--topNavHeight)));
        top: 0;
        bottom: 0;
        left: 0;
        overflow-y:auto;
        overflow-x:hidden;
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
        /* align-items: center;  */
        flex-wrap: wrap;
        margin-left: var(--sidenavWidth);
        width: calc(100vw - var(--sidenavWidth));
        height: 80%;
        padding: 0px 32px;
        overflow:auto;
    }

    .content {
        margin-top: 2rem;
        width: 100%;
        height: 80%;
        padding: 3rem;
    } 

    h2 {
        margin-bottom: 1rem; 
        margin-left: 0.5rem;
    }

    @media(max-width: 885px) {
        .sideNavWrapper {
            display: none;
        }

        .contentWrapper {
            margin-left: 0;
            width: auto;
            padding: 0px 0px;
            margin-top: 0rem;
            height: 80%;
        }

        .content {
            margin-top: 0rem;
            width: 100%;
            padding: 2rem;
            height: 80%;
        }

        h2 {
            margin-bottom: 0rem; margin-left: 0rem;
        }
    }

    @media(min-width: 886px) {
        .topNavWrapper {
            display: none;
        }
    }
</style>