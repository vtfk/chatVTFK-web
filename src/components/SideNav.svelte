<script>
    import Logo from './Icons/Logo.svelte'

    export let roles = []
</script>

<div class=container>
    <div class="logoContainer">
        <Logo />
    </div>
    <div style="text-align: center; width: 100%;">
        <p style="padding: 0px;"><strong>ChatVTFK</strong></p>
        <!-- {#if environment === 'test'}
            <p style="padding: 0px;"><strong>TEST</strong></p>
        {/if} -->
    </div>
    <div class="sideNavItemsContainer">
        <div class="sideNavFlexHelper">
            <div class="sideNavItem">
                <a href="/authenticated">
                    <div class="icon">
                        🏡
                    </div>
                    <p>Hjem</p>
                </a>
            </div>
            {#if roles.includes('chatVTFK.chatCompletion')}
                <div class="sideNavItem">
                    <a href="/authenticated/chatVTFK">
                        <div class="icon">
                            🤓
                        </div>
                        <p>Chat</p>
                    </a>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    strong {
        color: #000000;
    }
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .logoContainer {
        margin: 0px auto;
        padding-top: 36px;
        width: 3.5rem;
    }
    .sideNavItemsContainer {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0px;
        margin-bottom: 150px;
        width: 100%;
        text-align: center;
    }

    .sideNavFlexHelper {
        width: 100%;
    }

    .sideNavItem {
        width: 100%;
        margin: 0 auto;
        text-align: center;
    }

    .siteNavItemActive, .sideNavItem:hover {
        background: #dcac89;
    }

    .sideNavItem:hover {
        cursor: pointer;
    }

    .icon {
        color: #000000;
        width: 2rem;
        height: 2rem;
        margin: 1rem;
        margin-bottom: -1rem;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }

    button {
        all:unset;
        width: 100%;
    }

    button:active {
        outline: #dcac89 auto;
        width: 100%;
        height: 100%;
    }

    p {
        padding: 1.25rem 0.5rem;
        text-decoration: none;
        font-size: 16px;
        color: #000000;
        display: block;
    }

    @media(orientation: landscape) {
        @media(min-width: 1366px) {
            p {
                font-size: 1rem;
            }
            
            .icon {
                color: #000000;
                width: 2rem;
                height: 2rem;
                margin: 1rem;
                margin-bottom: -1rem;
                margin-left: auto;
                margin-right: auto;
                display: block;
                font-size: 1.5rem;
            }
        }
    }
</style>