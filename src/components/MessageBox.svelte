<script> 
    import '../messageBox.css'
    import { formatedMessage } from '../lib/services/formatMessage'
	import IconSpinner from './Icons/IconSpinner.svelte'
	import { typingStore } from '$lib/services/store';
    // import { HighlightAuto } from 'svelte-highlight'
	// import { atomOneDarkReasonable } from 'svelte-highlight/styles';
	// import hljs from 'highlight.js';

	export let role = ''
	export let message
    export let lastMessage
    export let isMsgLoading
    export let isTyping = false


    let messageToBeTyped = ''
    let index = 0
    let typewriter
    let oldLastMessage

    const typeMessage = () => {
        oldLastMessage = lastMessage
        if(lastMessage !== '...') {
            if (index < lastMessage?.length) {
                typingStore.set(`${index}`)
                messageToBeTyped +=lastMessage[index]
                index += 1
            } else {
                typingStore.set('done')
                stopTyping()
                return
            }
        }
    }
    const typing = () => {
        typewriter = setInterval(typeMessage, 25)
    }
	
	const stopTyping = () => {
		clearInterval(typewriter)
		isTyping = false
	}

    if(lastMessage !== '...') {
        typing()
    }
    // True or false if its the user or the assistant(chatgpt)
	const name = role === 'assistant'   
    
    // document.querySelectorAll('pre code').forEach((el) => {
    //     console.log(el)
    //     hljs.highlightElement(el)
    // })

    // $: {
    //     hljs.highlightAll();
    // }
   
    // $: {
    //     console.log(document.getElementById('#assistantMsg'))
    //     if(document.getElementById('#assistantMsg') !== null) {
    //         const offsetHeight = document.getElementById('#assistantMsg').offsetHeight
    //         console.log(offsetHeight)
    //     }
    // }
    
</script>

<!-- <svelte:head>
    {@html atomOneDarkReasonable}
</svelte:head> -->

<div class="container">
    {#if name}
        <div class={lastMessage !== message ? 'chatGPT' : 'none'}>
            {#if message !== '...' }
                <p class="message">{@html formatedMessage(`${message}`)}</p>
            {:else}
                <!-- <div class="message"><IconSpinner width={'2.5rem'} /></div> -->
                <div class="typing">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            {/if}
        </div>
        <div id="assistantMsg" class={lastMessage === message ? 'chatGPT' : 'none'}>
            {#if message !== '...' }
                {#if isMsgLoading === false}
                    <p id="msgToBeTyped" class="message">{@html formatedMessage(`${messageToBeTyped}`)}</p>
                {:else}
                    <p class="message">{@html formatedMessage(`${message}`)}</p>
                {/if}
            {:else}
                <!-- <div class="message"><IconSpinner width={'2.5rem'} /></div> -->
                <div class="typing">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            {/if}
        </div>
    {:else}
        <div class="user">
            <p class="message">{@html formatedMessage(`${message}`)}</p>
        </div>
    {/if}
</div>

<!-- <HighlightAuto {code} /> -->

<style>

    #msgToBeTyped {
        resize: none;
        overflow: auto;
    }

    .container {
        display: flex;
        flex-direction: column;
        height: 80%;
        width: 99%;
        margin: 5px;
    }

    .chatGPT {
        align-self: flex-start;
        background-color:  var(--himmel-3);
        border-radius: 1rem;
        max-width: 75%;
    }

    .user { 
        align-self: flex-end;
        background-color: var(--lavendel-3); 
        border-radius: 1rem;
        max-width: 75%;
    }

    .none {
        display: none;
    }

    .message { 
        display: block;
        overflow:hidden;
        padding: 0.7rem;
        font-size: 1rem;
    }



    .typing {
        display: block;
        overflow:hidden;
        padding: 0.7rem;
        font-size: 1rem;
        align-items: center;
    }
    .typing .dot {
        animation: mercuryTypingAnimation 1.8s infinite ease-in-out;
        /* background-color: #6CAD96;  */
        background-color: rgb(83, 80, 80);
        border-radius: 50%;
        height: 7px;
        margin-right: 4px;
        vertical-align: middle;
        width: 7px;
        display: inline-block;
    }
    .typing .dot:nth-child(1) {
        animation-delay: 200ms;
    }
    .typing .dot:nth-child(2) {
        animation-delay: 300ms;
    }
    .typing .dot:nth-child(3) {
        animation-delay: 400ms;
    }
    .typing .dot:last-child {
        margin-right: 0;
    }

    @keyframes mercuryTypingAnimation {
    0% {
        transform: translateY(0px);
        /* background-color:#6CAD96;  */
        background-color: grey;
    }
    28% {
        transform: translateY(-7px);
        /* background-color:#9ECAB9; */
        background-color: azure;
    }
    44% {
        transform: translateY(0px);
        /* background-color: #B5D9CB; */
        background-color: rgb(44, 43, 43);
    }
    }




    @media(max-width: 885px) {
        .message {
            font-size: 0.9rem;
        }
    }
</style>