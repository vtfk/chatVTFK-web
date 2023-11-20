<script>
    import '../../app.css'
	import SideNav from "../../components/SideNav.svelte";
    import IconSpinner from '../../components/Icons/IconSpinner.svelte';
	import { onMount } from 'svelte';
    import { accesstokenStore, userRoles, userStore } from '../../lib/services/store';
	import { get } from 'svelte/store';
	import TopNav from '../../components/TopNav.svelte';
    import { api } from '../../../config';

    let msalUser
    let msalToken
    let user
    let accessToken
    let roles
    let isUserBlocked = false

    onMount(async () => {
        user = get(userStore)
        // msalToken = sessionStorage.getItem(`${user.homeAccountId}-login.windows.net-accesstoken-${user.idTokenClaims.aud}-${user.tenantId}-openid profile user.read email--`)
        msalToken = sessionStorage.getItem(`${user.homeAccountId}-login.windows.net-accesstoken-${user.idTokenClaims.aud}-${user.tenantId}-${api.scope}--`)
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
        if(get(userRoles).includes('chatVTFK.block')) {
            isUserBlocked = true
        }
    })

    // This function only exists to create a delay for the store to actually get the values.
    const test = async () => {
        const user = await msalUser
        const token = await msalToken
        accesstokenStore.set(token)

        return await user
    }

    let prevScrollpos = window.scrollY;
    window.onscroll = function() {
        const currentScrollPos = window.scrollY;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-100px";
        }
    prevScrollpos = currentScrollPos;
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
        <div id="navbar" class="topNavWrapper">
            <TopNav roles={roles} />
        </div>
        <div class="contentWrapper">
            <div class="content">
                <h2> Hei, {msalUser.name} 🤓</h2>
                {#if !isUserBlocked}
                    <slot></slot>
                {:else}
                    <p>Av ulike grunner er brukeren din blokkert. Mener du at dette er feil kontakt servicedesk 🧑‍💻</p>
                {/if}
                
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
        transition: top 0.3s;
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

    p {
        font-size: larger;
        font-style: normal;
        font-weight: bold;
        padding: 1rem;
        display: flex;
        justify-content: center;
        margin-left: 5rem;
        margin-right: 5rem;
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