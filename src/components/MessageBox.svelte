<script>
    import '../app.css'
    import { marked } from 'marked'
    import { formatedMessage } from '../lib/services/formatMessage'

	export let role = '';
	export let message = '';

    // True or false if its the user or the assistant(chatgpt)
	const name = role === 'assistant'

</script>

<div class="container">
    {#if name}
        <div class="chatGPT">
            <div class="message">
                <p class="message">{@html formatedMessage(`${message}`)}</p>
            </div>
        </div>
    {:else}
        <div class="user">
            <p class="message">{@html formatedMessage(`${message}`)}</p>
        </div>
    {/if}
</div>


<style>
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

    .message { 
        display: block;
        overflow:hidden;
        padding: 0.7rem;
        font-size: 1rem;
    }

    @media(max-width: 885px) {
        .message {
            font-size: 0.9rem;
        }
    }
</style>