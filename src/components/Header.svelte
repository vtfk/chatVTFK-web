<script>
    import InitialsBadge from "./InitialsBadge.svelte";

    export let name;
    export let initials;

</script>

<div class="header">
    <div class="headerRight">
        <div class="name">
            <p>{name}</p>
        </div>
        <div class="initials">
            <InitialsBadge initials={initials} />
        </div>
        <!--
        <div class="menu">
            <Menu />
        </div>
        -->
    </div>
</div>

<style>
    .header {
        padding: 2rem 1rem;
        width: 100%;
        display: flex;
        margin-bottom: 1rem;
    }
    .headerLeft {
        display: flex;
        align-items: center;
        width: 60%;
    }
    .headerRight {
        display: flex;
        align-items: center;
        margin-left: auto;
    }
    .name {
        margin: 0px 4px;
    }
    .initials {
        margin: 0px 4px;
    }
    .mobileHeader {
        position: relative;
        left: -16px; /* right/left-padding of contentWrapper in App.Svelte */
        display: none;
        width: 100vw;
    }
    .mobileNav {
        display: flex;
        padding: 1rem 1.5rem;
        background-color: var(--varme-1);
        position: relative;
    }
    .mobileSearchBar {
        margin: 1rem 1rem;
    }
    .mobileLeft {
        display: flex;
        align-items: center;
        position: relative;
    }
    .mobileRight {
        display: flex;
        align-items: center;
        margin-left: auto;
    }
    .mobileRight:hover {
        cursor: pointer;
        background-color: #dcac89;
    }
    .logoContainer {
        width: 42px;
        display: flex;
        align-items: center;
        position: relative;
    }
    .menuButton {
        display: flex;
        align-items: center;
        width: 40px;
        padding: 0.3rem;
    }
    .mobileMenu {
        display: none;
        background-color: #ebc6ac;
    }
    .mobileMenu.showMenu {
        display: block;
    }
    .tempInfo {
        margin-bottom: 24px;
        padding: 24px;
        background-color: var(--siv-2);
    }
    .menuOption {
        padding: 1rem;
        display: flex;
        justify-content: center;
        border-bottom: 1px solid black;
        font-weight: bold;
    }
    /* .active, .menuOption:hover {
        background: #dcac89;
        cursor: pointer;
    } */
    @media(max-width: 885px) {
        .header {
            display: none;
        }
        .mobileHeader {
            display: block;
        }
        .testEnvWarn {
            display: none;
        }
    }

</style>
