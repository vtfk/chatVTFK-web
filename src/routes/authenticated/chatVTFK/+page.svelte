<script>
    import { onMount } from 'svelte';
	
	import Send from '../../../components/Icons/Send.svelte';
	import InfoBox from '../../../components/InfoBox.svelte';
	import IconHelp from '../../../components/Icons/IconHelp.svelte';
    import { tick } from 'svelte';
    import axios from 'axios'
	import { token } from '../../../lib/services/tiktoken.js'
	import MessageBox from '../../../components/MessageBox.svelte';
    import { api } from '../../../../config';
	import IconSpinner from '../../../components/Icons/IconSpinner.svelte';
	import { accesstokenStore } from '$lib/services/store';
	import { get } from 'svelte/store';

	let messages = [] 
	let inputMessage = '';
	let isEnterPressed = false
    let showInfoBox = false
    let element
    let firstRun = false
    let response
    let accessToken
    
    const initialMessage = {
		role: 'system',
		content: 'Skriv en kort introduksjon og kort om hva du kan brukes til. Du heter ChatVTFK'
    }

    onMount (async () => {
        accessToken = get(accesstokenStore)
        response = await axios.post(`${api.local.url}/Response`, initialMessage, {headers: {'Content-Type': 'application/json', Authorization: `${accessToken.secret}`, 'Access-Control-Allow-Origin': '*'}})
        firstRun = true
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

        const test = await token(inputMessage)

        // let response = await axios.post('/api/chat', body, {headers: {'Content-Type': 'application/json'}})
        if(firstRun !== true) {
            response = await axios.post(`${api.local.url}/Response`, body, {headers: {'Content-Type': 'application/json', Authorization: `${accessToken.secret}`, 'Access-Control-Allow-Origin': '*'}})
        } else {
            
        }
		
        if (inputMessage) {
			messages = messages.concat([userMessage])
		}

		messages = messages.concat(response.data)

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
    <div class="inputWrapper">
        <input
            bind:value={inputMessage}
            on:keypress={onKeyPress}
            type="text"
            name="search"
            id="search"
            class={firstRun === true ? "displayNone" : "inputStyle"}
        />
        <button
            on:click={handleChatCompletion}
            type="submit"
            id="searchButton"
            class={firstRun === true ? "displayNone" : "buttonStyle"}
        >
            <Send></Send>
        </button>
    </div>
    
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
    /* Dette gjør vondt :(, men er ikke permanent (håper jeg) */
    .displayNone {
        display: none;
    }

    .buttonStyle {
        background-color: var(--himmel-1);
        border: none; 
        border-radius: 10rem;
        margin-left: -10px;
        padding: 6px 7px 0px 3px;
        text-align: center; 
        text-decoration: none; 
        display: inline-block; 
        font-size: 16px;  
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
</style>