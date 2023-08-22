<script>
    import Quill from "quill";
    // import '../textAreaDisabled.css';
    // import '../textArea.css';

    export let basic = false
    export let full = false
    export let disabled = false
    export let placeholder = 'Spør meg om noe... (Trykk "ctrl/cmd(mac) + enter" for å sende en melding eller trykk på "Send")'
    export let advInput

    const disabledPlaceholder = 'Venter på svar...'

    let toolbar

    $: {
        disabled
    }

    // qulljs options
    if (full) { 
        toolbar = [
            [{ 'font': [] }, { 'size': [] }],
            [ 'bold', 'italic', 'underline', 'strike' ],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'super' }, { 'script': 'sub' }],
            [{ 'header': '1' }, { 'header': '2' }], 
            ['blockquote'], 
            ['code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
            [ 'direction', { 'align': [] }],
            ['link', 'image', 'video', 'formula'], 
            [ 'clean' ]
        ]
    }

    if(basic) {
        toolbar = [
            [{ 'font': [] }, { 'size': [] }],
            [ 'bold', 'italic', 'underline', 'strike' ],
            [{ 'script': 'super' }, { 'script': 'sub' }],
            [{ 'header': '1' }, { 'header': '2' }], 
            ['blockquote'], 
            ['code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
            [ 'clean' ]
        ]
    }

    if(disabled) {
        toolbar = []
    }

    // Custom keybindings for qilljs textarea, only active when the textarea is active. 
    const bindings = {
        custom: {
            key: 'Enter',
            shortKey : true,
            handler: function(range, context) {
                const advInputObj = {
                    inputType: 'advInput',
                    msg: document.getElementsByClassName('ql-editor')[0].innerHTML,
                }
                advInput = advInputObj
                document.getElementsByClassName('ql-editor')[0].innerHTML = "\n"
                document.getElementsByClassName('ql-editor')[0].innerText = "\n"
            }
        },
        list: {
            key: 'backspace',
            format: ['list'],
            handler: function(range, context) {
            if (context.offset === 0) {
                // When backspace on the first character of a list,
                // remove the list instead
                this.quill.format('list', false, Quill.sources.USER);
            } else {
                // Otherwise propogate to Quill's default
                return true;
            }
            }
        }
    }

    // Initiate quill
	const quill = (node) => {
		new Quill(node, {
            modules: {
                toolbar: toolbar,
                keyboard: {
                    bindings: bindings
                }
            },
            placeholder: disabled ? disabledPlaceholder : placeholder,
            theme: "snow",
            readOnly: disabled ? true : false
        })
    }

    // const disabledStyle = {
    //     toolbar: `
    //         border-top-right-radius: 1rem;
    //         border-top-left-radius: 1rem;
    //         background-color: red;
    //         cursor: not-allowed;
    //     `,
    //     textArea: `
    //         border-bottom-left-radius: 1rem;
    //         border-bottom-right-radius: 1rem;
    //         background-color: red;
    //         cursor: not-allowed;
    //     `
    // }

    // if(disabled === false) {
    //     console.log('jeg er her')
    //     // document?.getElementById('advStyleSheet')?.setAttribute("href", "../src/textArea.css")
    // } else {
    //     console.log('nå er jeg er her')
    //     // document?.getElementById('advStyleSheet')?.setAttribute("href", "../src/textDisabledArea.css")
    // }

</script>

<svelte:head>
    <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <link href="../src/textArea.css" rel="stylesheet" type="text/css" id="advStyleSheet"/>
    <!-- <link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet"> -->
</svelte:head>

<main>
    <div class="content" use:quill />
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        width: 65vw;
        max-width: 100%;
        min-width: 80%;
        margin: 0 auto;
    }

    .content {
        height: 15vh;
    }

    @media(max-width: 885px) {
        main {
            width: 85vw;
        }
    }
</style>