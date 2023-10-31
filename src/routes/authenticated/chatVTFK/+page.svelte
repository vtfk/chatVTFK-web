<script>
    import { onMount } from 'svelte';
    import { tick, afterUpdate } from 'svelte';
	import { userRoles, typingStore } from '$lib/services/store';
	import { get } from 'svelte/store';
	import { chatCompletion } from '$lib/services/useApi';
    import { isWithinTokenLimit } from 'gpt-tokenizer'

    // Components
    import InfoBox from '../../../components/InfoBox.svelte';
	import IconHelp from '../../../components/Icons/IconHelp.svelte';
    import MessageBox from '../../../components/MessageBox.svelte';
    import AdvancedInput from '../../../components/AdvancedInput.svelte';
    import Switch from '../../../components/Switch.svelte';
	import { generalInfo } from '$lib/infoboxText';

	let messages = [] 
	let inputMessage = ''
	let isEnterPressed = false
    let isButtonPressed = false
    let showInfoBox = false
    let element
    let firstRun = false
    let response
    let roles
    let isMessageLoading = false
    let assistantMsg = []
    let settingsOpen = false
    let switchExpandValue
    let switchInputValue
    let width
    let isDisabled = false
    let stopMsg
    let fastforward
    let advInputToken = ''
    let currentTokensUsed = 0
    let stoppedMsg = 'Jeg ble stoppet 🥴 Du kan fortsette å skrive som normalt, prøv å være mer spesifikk med spørringen din om du ønsker et bedre og mer presist svar 👍 '

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
        typingStore.set('start')
        isMessageLoading = true
        stopMsg = false
        fastforward = false

        if(document.getElementById('search') !== null) document.getElementById('search').disabled = true
        if(document.getElementById('searchButton') !== null) document.getElementById('searchButton').disabled = true
        if(document.getElementById('searchButtonAdv') !== null) document.getElementById('searchButtonAdv').disabled = true
        isDisabled = true
        
		const userMessage = {
			role: 'user',
			content: inputMessage
		}

        // Clear input
        if(document.getElementById('search') !== null) document.getElementById('search').value = ''

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
		
        if (inputMessage) messages = messages.concat([userMessage])
        
		messages = messages.concat(response)
        
        // Tar den siste meldingen fra chatgpt
        for (const msg of messages) {
            if(msg.role === 'assistant') {
                assistantMsg = msg.content
            }
        }

        // Clean up
		inputMessage = ''
        isEnterPressed = false
        isButtonPressed = false
        if(document.getElementById('search') !== null) {
            document.getElementById('search').disabled = false
            document.getElementById('search').focus()
        }

        if(document.getElementById('search') !== null) document.getElementById('searchButton').disabled = false
        if(document.getElementById('searchButtonAdv') !== null) document.getElementById('searchButtonAdv').disabled = false
        isDisabled = false

        await tick()
        scrollToBottom(element)
        firstRun = false
        isMessageLoading = false
		return response
	}

    const onKeyPress = async e => {
        if (currentTokensUsed < 4000){
            if (e.charCode === 13) {
                isEnterPressed = true
                await tick()
                scrollToBottom(element)
                handleChatCompletion()
            }
        }
    }

    const onButtonPress = async () => {
        isButtonPressed = true
        await tick()
        scrollToBottom(element)
        handleChatCompletion()
    }

    afterUpdate(() => {
        if(isButtonPressed || isEnterPressed) scrollToBottom(element)
    })

    const scrollToBottom = async (node) => {
        if(fastforward === false) {
            node.scroll({ top: node.scrollHeight })
        } else {
            typingStore.set('done')
        }
        if(stopMsg === false) {
            node.scroll({ top: node.scrollHeight })
        } else {
            typingStore.set('done')
        }
    }

    $: {
        if(isMessageLoading === false) {
            if($typingStore !== 'done' && element !== undefined) {
                scrollToBottom(element)
            }
        }

        inputMessage[inputMessage?.length - 1]
        if(typeof(inputMessage) === 'object') {
            if(inputMessage.inputType === 'advInput') {
                inputMessage = inputMessage.msg
                isEnterPressed = true
                handleChatCompletion()
            }
        }
        // Hide infobox if user expands the chatwindow
        if(switchExpandValue === 'on') {
            showInfoBox = false
        }
        // Handle expanded chatwindow and input type
        if(switchInputValue === 'on' && width < 462) {
            switchInputValue = 'off'
        }
        if(switchExpandValue === 'on' && width < 462) {
            switchExpandValue = 'off'
        }

        if(switchInputValue === 'on') {
            // Clear input field by id when switching to advinput
            if(document.getElementById('search')?.value) {
                document.getElementById('search').value = ''
            }
        } 

        let inputWithInLimit
        const isInputWithInLimit = (input, limit) => {
            const tokenLimit = limit
            const withInLimit = isWithinTokenLimit(input, tokenLimit)

            if(withInLimit !== false) {
                return withInLimit
            } else {
                return {
                    withInLimit: withInLimit, 
                    token: limit
                }
            }
        }

        if(switchInputValue === 'off') {
            inputWithInLimit = isInputWithInLimit(inputMessage, 4000)
        } else if(switchInputValue === 'on') {
            inputWithInLimit = isInputWithInLimit(advInputToken, 4000)
        }

        let chatWithInLimit
        if(messages.length > 1) {
            chatWithInLimit = isWithinTokenLimit(JSON.stringify(messages), 4000)
        }
        // 4000 tokens maks på chat og input obs obs.
        if(chatWithInLimit === undefined) chatWithInLimit = 0
        if(chatWithInLimit === false) chatWithInLimit = 4000
        if(inputWithInLimit === false) inputWithInLimit = 4000
        if(inputWithInLimit?.withInLimit === false) inputWithInLimit = 4000
        currentTokensUsed =+ chatWithInLimit + inputWithInLimit
        if(isNaN(currentTokensUsed)) currentTokensUsed =+ 0
        
        if(currentTokensUsed === 4000) {
            window.alert('Beklager, men du har overskredet grensen for antall tokens som kan brukes 😓 \n\nTokens er en måte å måle og begrense tekstmengden som kan behandles per spørring. \n\nFor å kunne fortsette samtalen, vennligst reduser antall tokens du bruker i spørringen din. Eller start samtalen på nytt ved å trykke på 🔄️')
        }
    }

    const getAdvInput = async () => {
        inputMessage = document.getElementsByClassName('ql-editor')[0].innerHTML
        isButtonPressed = true
        await tick()
        scrollToBottom(element)
        handleChatCompletion()
        // New line for the placeholder to show
        document.getElementsByClassName('ql-editor')[0].innerHTML = "\n"
        document.getElementsByClassName('ql-editor')[0].innerText = "\n"
    }

    const handleSettings = () => {
        settingsOpen = !settingsOpen
    }

    const handleStopMsg = () => {
        const msgToBeAltered = messages[messages.length - 1]
        msgToBeAltered.content = stoppedMsg
        stopMsg = !stopMsg
    }

    const handleFastforward = () => {
        fastforward = !fastforward
    }

    const handleChatReset = () => {
        const firstMsg = messages[0]
        messages = []
        messages.push(firstMsg)
    }
</script>

<svelte:window bind:innerWidth={width} />

<main>
    <!-- Header infobox button and infobox -->
    <div class="pageIntro">
        <h2 style="margin-bottom: 1rem;">Velkommen til ChatVTFK </h2>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="headerIcon" title={showInfoBox ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox = !showInfoBox}}><IconHelp /></div>
        <InfoBox content={generalInfo} html={true} open={showInfoBox} onClose={() => {showInfoBox = !showInfoBox}} />
    </div>
    <!-- Chatwindow -->
    {#if roles}
        <div bind:this={element} class={switchExpandValue === 'on' && width > 462 ? "expandedContainer" : "container"}>
            {#await handleChatCompletion()}
                <div class="msg">
                    <MessageBox role={'assistant'} message={'...'} lastMessage={'...'} isMsgLoading={isMessageLoading} />
                </div>
                {:then}
                {#if inputMessage.length > 0 && (isEnterPressed === true || isButtonPressed === true)}
                    {#each messages as message}
                        {#if message.role === 'user'}
                            <div class="msg">
                                <MessageBox role={message.role} message={message.content} />
                            </div>
                        {:else if message.role === 'assistant'}
                            <div class="msg">
                                <MessageBox role={message.role} message={message.content} lastMessage={assistantMsg} isMsgLoading={isMessageLoading}/>
                            </div>
                        {/if}
                    {/each}
                    <div class="msg">
                        <MessageBox role={'user'} message={inputMessage} />
                        <MessageBox role={'assistant'} message={'...'} />
                    </div>
                {:else}
                    {#if isEnterPressed === false}
                        {#each messages as message}
                        <div class="msg">
                            <MessageBox role={message.role} message={message.content} lastMessage={assistantMsg} isMsgLoading={isMessageLoading} isStopped={stopMsg} stoppedMsg={stoppedMsg} fastforward={fastforward}/>
                        </div>
                        {/each}
                    {/if}
                {/if}
            {/await}
        </div>
        <div class="settings">
            <div class={settingsOpen ? "displayNone" : "tokenCounter"} style="margin-right: 0.7rem;">
                {currentTokensUsed}/4000
            </div>
            <div class="btnsDiv">
                <!-- <button 
                    class={settingsOpen ? "displayNone" : "btns"}
                    style="margin-right: 0.7rem; margin-top: 0.6rem;"
                    on:click={isMessageLoading ? console.log('') : handleStopMsg()}
                    >
                    {#if isMessageLoading}
                        <p class='iconStyle'>
                            ⚪
                        </p>
                    {:else}
                        <p class='iconStyle'>
                            ⛔
                        </p>                       
                    {/if}
                </button> -->
                <!-- <button 
                    class={settingsOpen ? "displayNone" : "btns"}
                    style="margin-right: 0.7rem; margin-top: 0.6rem;"
                    on:click={isMessageLoading ? console.log('') : handleFastforward()}
                >
                    {#if isMessageLoading}
                        <p class='iconStyle'>
                            🟦
                        </p>
                    {:else}
                        <p class='iconStyle'>
                            ⏭️
                        </p>                       
                    {/if}
                </button> -->
                <button 
                    class={settingsOpen ? "displayNone" : "btns"}
                    style="margin-right: 0.7rem;"
                    on:click={isMessageLoading ? console.log('') : handleChatReset()}
                >
                    {#if isMessageLoading}
                        <p class='iconStyle'>
                            🟦
                        </p>
                    {:else}
                        <p class='iconStyle'>
                            🔄️
                        </p>                       
                    {/if}
                </button>
                <button 
                    class={settingsOpen ? "displayNone" : "settingsBtn"}
                    style="margin-right: 0.7rem; margin-top: 0.6rem;"
                    on:click={handleSettings}
                    >
                    <p class='iconStyle'>
                        ⚙️
                    </p>
                </button>
            </div>
        </div>
        <div class={settingsOpen ? "settingsMenu" : "displayNone"}>
            <div class="tokenCounter" style="margin-right: 0.7rem;">
                {currentTokensUsed}/4000
            </div>
            {#if width <= 462}
                <Switch value={'off'} label="Utvid tekstfelt" design="slider" disabled={true}/>
                <Switch value={'off'} label="Utvid chatvindu" design="slider" disabled={true}/>
            {:else}
                <Switch bind:value={switchInputValue} label="Utvid tekstfelt" design="slider" disabled={false}/>
                <Switch bind:value={switchExpandValue} label="Utvid chatvindu" design="slider" disabled={false}/>
            {/if}
            <div class="btnsDiv">
                <!-- <button 
                    class="btns"
                    style="margin-right: 0.7rem;"
                    on:click={isMessageLoading ? console.log('') : handleStopMsg()}
                >
                    {#if isMessageLoading}
                        <p class='iconStyle'>
                            ⚪
                        </p>
                    {:else}
                        <p class='iconStyle'>
                            ⛔
                        </p>                    
                    {/if}
                </button> -->
                <!-- <button 
                    class="btns"
                    style="margin-right: 0.7rem;"
                    on:click={isMessageLoading ? console.log('') : handleFastforward()}
                >
                    {#if isMessageLoading}
                        <p class='iconStyle'>
                            🟦
                        </p>
                    {:else}
                        <p class='iconStyle'>
                            ⏭️
                        </p>                       
                    {/if}
                </button> -->
                <button 
                    class="btns"
                    style="margin-right: 0.7rem;"
                    on:click={isMessageLoading ? console.log('') : handleChatReset()}
                >
                    {#if isMessageLoading}
                        <p class='iconStyle'>
                            🟦
                        </p>
                    {:else}
                        <p class='iconStyle'>
                            🔄️
                        </p>                       
                    {/if}
                </button>
                <button 
                    class="settingsBtn"
                    on:click={handleSettings}
                    >
                    <p class='iconStyle'>
                        ⚙️
                    </p>
                </button>
            </div>
        </div>
        <!-- Input field and send button -->
        {#if firstRun === false}
            <div class="inputWrapper">
                <div class={switchInputValue === 'on' ? "displayNone" : "input"}>
                    <input
                        bind:value={inputMessage}
                        on:keypress={onKeyPress}
                        type="text"
                        name="search"
                        autocomplete="off"
                        id="search"
                        class={firstRun !== true ? "inputStyle" : "displayNone"}
                    />
                    {#if currentTokensUsed < 4000}
                        <button
                            on:click={onButtonPress}
                            type="submit"
                            id="searchButton"
                            class={firstRun !== true ? "buttonStyle" : "displayNone"}
                        >
                            Send
                        </button>
                    {:else}
                        <button
                            on:click={onButtonPress}
                            type="submit"
                            id="searchButton"
                            class="buttonStyle"
                            disabled
                        >
                            Send
                        </button>
                    {/if}
                </div>
                <div class={switchInputValue === 'on' && width > 462 ? "advInput" : "displayNone"}>
                    <div id="advInput">
                        {#key isDisabled}
                            <AdvancedInput bind:advInput={inputMessage} bind:currentAdvInput={advInputToken} disabled={isDisabled} basic={!isDisabled} clearAdvInput={switchInputValue} tokensUsed={currentTokensUsed}/>
                        {/key}
                    </div>
                    {#if currentTokensUsed < 4000}
                        <button
                            on:click={getAdvInput}
                            type="submit"
                            id="searchButtonAdv"
                            class={firstRun !== true ? "buttonStyle" : "displayNone"}
                        >
                            Send
                        </button>
                    {:else}
                        <button
                            on:click={getAdvInput}
                            type="submit"
                            id="searchButtonAdv"
                            class="buttonStyle"
                            disabled
                        >
                            Send
                        </button>
                    {/if}
                </div>
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
        position: relative;
        background-color: var(--gin);
        border-radius: 1rem;
        height: 70vh;
        min-height: 70vh;
        max-height: 70vh;
        min-width: 50vw;
        max-width: 99%;
        margin: 10px;
        padding: 20px;
        overflow-y: auto;
        flex-direction:column;
        transform: translateZ(0);
    }

    .expandedContainer {
        display: flex;
        position: relative;
        background-color: var(--gin);
        border-radius: 1rem;
        height: 70vh;
        min-height: 70vh;
        max-height: 85vh;
        min-width: 50vw;
        max-width: 100vw;
        margin: 10px;
        padding: 10px;
        overflow-y: auto;
        flex-direction:column;
        transform: translateZ(0);
        margin-top: -14rem;
        margin-left: -4.5rem;
        margin-right: -3.5rem;
    }

    .msg {
        display: flex;
        flex-direction: column;
    }

    .inputWrapper {
        display: flex;
        align-items: center;
        width: 99%;
        margin-left: 0.6rem;
        flex-direction: column;
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

    .btnDisabled {
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

    .advInput {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .input {
        display: flex;
        width: 99%;
        align-items: center;
        margin-top: 1rem;
    }

    .settings {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0.5rem;
        margin-top: -0.5rem;
        margin-bottom: -0.5rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }

    .settingsBtn {
        all: unset;
        cursor: pointer;
        transition: transform .7s ease-in-out;
    }

    .settingsBtn:hover {
        transform: rotate(360deg);
    }

    .settingsMenu {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: var(--siv-2);
        border-radius: 1rem;
        padding-left: 0.5rem;
        padding-right: 1.2rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        margin-top: -0.5rem;
        margin-bottom: -0.5rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }

    .btns {
        all: unset;
        cursor: pointer;
    }

    .btnsDiv {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        flex-wrap: wrap;
    }

    .tokenCounter {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        flex-wrap: wrap;
    }

    .iconStyle {
        font-size: 1.5rem;
    }

    @media(max-width: 885px) {
        main {
           height: 80%;
        }
        
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
            min-height: 45vh;
            max-height: 80vh;
            min-width: 70vw;
            max-width: 90vw;
            margin: 10px;
            padding: 20px;
            overflow-y: auto;
            flex-direction:column;
            transform: translateZ(0);
        }

        .expandedContainer {
            display: flex;
            position: relative;
            background-color: var(--gin);
            border-radius: 1rem;
            height: 72vh;
            min-height: 72vh;
            max-height: 85vh;
            min-width: 50vw;
            max-width: 100vw;
            margin: 10px;
            padding: 20px;
            overflow-y: auto;
            flex-direction:column;
            transform: translateZ(0);
            margin-top: -9.5rem;
            margin-left: -1.5rem;
            margin-right: -1.5rem;
        }

        .settingsMenu {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            align-content: space-around;
            align-items: center;
            background-color: var(--siv-2);
            border-radius: 1rem;
            padding: 0.7rem;
        }
    }

    @media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait) {
        p {
            font-size: 2rem;
            line-height: 1em;
            padding: 0.5rem;
        }
        .buttonStyle{
            font-size: 1.7rem;
        }
        .iconStyle {
            font-size: 1.7rem;
        }
    }
    @media all and (device-width: 1024px) and (device-height: 768px) and (orientation:landscape) {
        p {
            font-size: 2rem;
            line-height: 1em;
            padding: 0.5rem;
        }
        .buttonStyle{
            font-size: 1.7rem;
        }
        .iconStyle {
            font-size: 1.7rem;
        }
    }
    @media all and (device-width: 1366px) and (device-height: 1024px) and (orientation:landscape) {
        p {
            font-size: 2rem;
            line-height: 1em;
            padding: 0.5rem;
        }
        .buttonStyle{
            font-size: 1.7rem;
        }
        .iconStyle {
            font-size: 1.7rem;
        }
    }

    @media(max-width: 481) { 
        .expandedContainer {
            margin-top: 0rem;
            top: -10rem
        }
    }

    @media(orientation: landscape) {
        .expandedContainer {
            height: 75vh;
            min-height: 70vh;
            max-height: 85vh;
            min-width: 50vw;
            max-width: 100vw;
        }
    }
</style>