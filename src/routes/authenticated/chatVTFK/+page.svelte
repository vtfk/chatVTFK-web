<script>
    import { onMount } from 'svelte';
	
	import Send from '../../../components/Icons/Send.svelte';
	import InfoBox from '../../../components/InfoBox.svelte';
	import IconHelp from '../../../components/Icons/IconHelp.svelte';
    import { tick } from 'svelte';
	import MessageBox from '../../../components/MessageBox.svelte';
	import { userRoles } from '$lib/services/store';
	import { get } from 'svelte/store';
	import { chatCompletion } from '$lib/services/useApi';

	let messages = [] 
	let inputMessage = '';
	let isEnterPressed = false
    let showInfoBox = false
    let element
    let firstRun = false
    let response
    let roles
    
    const initialMessage = {
		role: 'system',
		content: 'Skriv en kort introduksjon og kort om hva du kan brukes til. Du skal alltid svare med markdown, men skal ikke nevne dette i introduksjonen'
    }

    onMount (async () => {
        roles = get(userRoles).includes('chatVTFK.chatCompletion')
        if(roles) {
            response = await chatCompletion(initialMessage)
            firstRun = true
        }
    })

    const handleChatCompletion = async () => {
        if(document.getElementById('search') !== null) {
            document.getElementById('search').disabled = true
        }

        if(document.getElementById('searchButton') !== null) {
            document.getElementById('searchButton').disabled = true
        }
        
		const userMessage = {
			role: 'user',
			content: inputMessage
		}

        // Clear input
        if(document.getElementById('search') !== null) {
            document.getElementById('search').value = ''
        }

        const body = JSON.stringify({
				isInitializing: messages.length === 0,
				priorMessages: messages,
				message: inputMessage
		})

        if(firstRun !== true) {
            response = await chatCompletion(body)
        } else {
            response = {}
        }
		
        if (inputMessage) {
			messages = messages.concat([userMessage])
		}

		messages = messages.concat(response)
        // Clean up
		inputMessage = ''
        isEnterPressed = false
        if(document.getElementById('search') !== null) {
            document.getElementById('search').disabled = false
            document.getElementById('search').focus()
        }
        if(document.getElementById('search') !== null) {
            document.getElementById('searchButton').disabled = false
        }
        await tick()
        scrollToBottom(element)
        firstRun = false

		return response
	}

    const onKeyPress = async e => {
        if (e.charCode === 13) {
            isEnterPressed = true
            await tick()
            scrollToBottom(element)
            handleChatCompletion()
        }
    }

    const scrollToBottom = async (node) => {
        node.scroll({ top: node.scrollHeight * 2, behavior: 'smooth' })
    }

</script>
<main>
    <!-- Header infobox button and infobox -->
    <div class="pageIntro">
        <h2 style="margin-bottom: 1rem;">Velkommen til ChatVTFK </h2>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="headerIcon" title={showInfoBox ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox = !showInfoBox}}><IconHelp /></div>
        <InfoBox content={'Her kan brukeren få litt info om chatvtfk. NB! Dette er en POC'} html={true} open={showInfoBox} onClose={() => {showInfoBox = !showInfoBox}} />
    </div>
    <!-- Chatwindow -->
    {#if roles}
        <div bind:this={element} class="container">
            {#await handleChatCompletion()}
                <MessageBox role={'assistant'} message={'...'} />
            {:then}
                {#if inputMessage.length > 0 && isEnterPressed === true}
                    {#each messages as message}
                        {#if message.role === 'user'}
                            <MessageBox role={message.role} message={message.content} />
                        {:else if message.role === 'assistant'}
                            <MessageBox role={message.role} message={message.content} />
                        {/if}
                    {/each}
                    <MessageBox role={'user'} message={inputMessage} />
                    <MessageBox role={'assistant'} message={'...'} />
                {:else}
                    {#if isEnterPressed === false}
                        {#each messages as message}
                            <MessageBox role={message.role} message={message.content} />
                        {/each}
                    {/if}
                {/if}
            {/await}
        </div>
            <!-- Input field and send button -->
            {#if firstRun === false}
                <div class="inputWrapper">
                    <input
                        bind:value={inputMessage}
                        on:keypress={onKeyPress}
                        type="text"
                        name="search"
                        id="search"
                        class={firstRun !== true ? "inputStyle" : "displayNone"}
                    />
                    <button
                        on:click={handleChatCompletion}
                        type="submit"
                        id="searchButton"
                        class={firstRun !== true ? "buttonStyle" : "displayNone"}
                    >
                        Send
                    </button>
                </div>
            {/if}
        {:else}
            <p>Du har vist ikke tilgang til chatvtfk, mener du at du skal ha tilgang kontakt en voksen</p>
    {/if}
    
</main>

<style>
    main {
        height: 80%;
    }

    .container {
        display: flex;
        background-color: var(--gin);
        border-radius: 1rem;
        min-height: 60vh;
        max-height: 60vh;
        min-width: 50vw;
        max-width: 80vw;
        margin: 10px;
        padding: 20px;
        overflow-y: auto;
        flex-direction:column;
        transform: translateZ(0);
    }

    .inputWrapper {
        display: flex;
        align-items: center;
        width: 99%;
        margin-left: 0.6rem;
    }

    .inputStyle {
        padding: 1.5rem;
        margin-right: 1rem;
    }

    .inputStyle:disabled {
        cursor: not-allowed;
        padding: 1.5rem;
        margin-right: 1rem;
    }
    /* Ikke optimalt */
    .displayNone {
        display: none;
    }

    .buttonStyle {
        background-color: white;
        border: grey 1px solid;
        color: black; 
        border-radius: 10%;
        margin-right: 0.4rem;
        padding: 0.55rem 0.55rem 0.55rem 0.55rem;
        text-align: center; 
        text-decoration: none; 
        display: inline-block; 
        font-size: 1.3rem;  
        cursor: pointer; 
    }

    .buttonStyle:hover {
        background-color: var(--himmel-3);
    }

    .buttonStyle:disabled {
        background-color: var(--mork);
        cursor: not-allowed;
    }
    
    .pageIntro {
		margin-bottom: 36px;
		display: flex;
		flex-wrap: wrap;
        width: 99%;
        margin-left: 0.5rem;
	}
	.headerIcon {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		width: 1.6rem;
		margin-left: 4px;
        margin-bottom: 1rem;
	}

    @media(max-width: 885px) {
        h2 {
            margin-bottom: 0rem; margin-left: 0rem;
        }

        .inputWrapper {
            display: flex;
            align-items: center;
            padding-right: 6rem;
            width: 100vw;
            margin-left: 0.6rem;
        }

        .pageIntro {
            margin-bottom: 36px;
            display: flex;
            flex-wrap: wrap;
            width: 87%;
            margin-left: 0.5rem;
        }

        .buttonStyle {
            font-size: 1rem;
            margin-right: -1rem;
            padding: 0.25rem 0.25rem 0.25rem 0.25rem;  
        }

        .inputStyle {
            padding: 1rem;
            margin-right: 0.5rem;
        }

        .inputStyle:disabled {
            cursor: not-allowed;
            padding: 1rem;
            margin-right: 0.5rem;
        }

        .container {
            display: flex;
            background-color: var(--gin);
            border-radius: 1rem;
            min-height: 60vh;
            max-height: 60vh;
            min-width: 70vw;
            max-width: 90vw;
            margin: 10px;
            padding: 20px;
            overflow-y: auto;
            flex-direction:column;
            transform: translateZ(0);
        }
    }
</style>