<script>
    import Logo from './Icons/Logo.svelte'

    export let roles = []
</script>

<div class=container>
    <div class="logoContainer">
        <Logo />
         <!-- {#if environment === 'test'}
            <p style="padding: 0px;"><strong>TEST</strong></p>
        {/if}  -->
    </div>
    <div class="topNavItemsContainer">
        <div class="topNavFlexHelper">
            <div class="topNavItem">
                <a href="/authenticated" style="width: 100%;">
                    <div class="icon">
                        🏡
                    </div>
                    <p>Hjem</p>
                </a>
            </div>
            {#if roles.includes('chatVTFK.chatCompletion')}
                <div class="topNavItem">
                    <a href="/authenticated/chatVTFK" style="width: 100%;">
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
    .container {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: row;
    }
    .logoContainer {
        margin: 0px auto;
        margin: 1.5rem;
        width: 3rem;
    }
    .topNavItemsContainer {
        flex: 1;
        margin-top: 0px;
        width: 100%;
        height: 100%;
    }

    .topNavFlexHelper {
        display: flex;
        width: 100%;
    }

    .topNavItem {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        margin: 0 auto;
    }

    .topNavItemActive, .topNavItem:hover {
        background: #dcac89;
    }

    .topNavItem:hover {
        cursor: pointer;
        width: 100%;
    }

    .icon {
        color: #000000;
        width: 1.5rem;
        height: 2rem;
        margin: 2rem;
        margin-bottom: -1.5rem;
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
        text-align: center;
    }
</style>