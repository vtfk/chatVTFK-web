<script>
    import '../../app.css'
	import SideNav from "../../components/SideNav.svelte";
    import IconSpinner from '../../components/Icons/IconSpinner.svelte';
	import { onMount } from 'svelte';
    import { accesstokenStore, userRoles, userStore } from '../../lib/services/store';
	import { get } from 'svelte/store';

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
            const token_parts = accessToken.split(".")
            const token_payload = JSON.parse(atob(token_parts[1]))
            if([token_payload?.roles].length > 0) {
                roles = token_payload.roles
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