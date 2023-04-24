<script>
	import { palceholder3, placeholder1, placeholder2 } from "$lib/infoboxText";
	import InfoBox from "../../components/InfoBox.svelte";

    let showInfoBox1 = false
    let showInfoBox2 = false
    let showInfoBox3 = false
</script>

<main>
    <div class="infoboxWrapper">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="infobox" title={showInfoBox1 ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox1 = !showInfoBox1}}>
            <div class="infoboxHeader">
                <div class="header">
                    <h2>Placeholder 1</h2>
                </div>
                <div class="arrowIcon">
                    <div class={showInfoBox1 ? 'rotateClose' : 'rotateOpen'}>^</div>
                </div>
            </div>
        </div>
        <InfoBox content={placeholder1} html={true} open={showInfoBox1} showCloseIcon={false} onClose={() => {showInfoBox1 = !showInfoBox1}} />
        <br>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="infobox" title={showInfoBox2 ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox2 = !showInfoBox2}}>
            <div class="infoboxHeader">
                <div class="header">
                    <h2>Placeholder 2</h2>
                </div>
                <div class="arrowIcon">
                    <div class={showInfoBox2 ? 'rotateClose' : 'rotateOpen'}>^</div>
                </div>
            </div>
        </div>
        <InfoBox content={placeholder2} html={true} open={showInfoBox2} showCloseIcon={false} onClose={() => {showInfoBox2 = !showInfoBox2}} />
        <br>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="infobox" title={showInfoBox3 ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox3 = !showInfoBox3}}>
            <div class="infoboxHeader">
                <div class="header">
                    <h2>Placeholder3</h2>
                </div>
                <div class="arrowIcon">
                    <div class={showInfoBox3 ? 'rotateClose' : 'rotateOpen'}>^</div>
                </div>
            </div>
        </div>
        <InfoBox content={palceholder3} html={true} open={showInfoBox3} showCloseIcon={false} onClose={() => {showInfoBox3 = !showInfoBox3}} />
    </div>
</main>

<style>
    .infoboxWrapper {
        margin-top: 3rem;
    }

   .infobox {
        background-color: var(--siv-2);
        height: 5rem;
        width: 100%;
        padding: 1.5rem;
        margin-bottom: -1px;
        cursor: pointer;
    }

    .infoboxHeader {
       height: 100%;
    }

    .header {
        float: left;
    }

    .arrowIcon {
        float: right;
        font-size: 1.5rem;
        font-weight: bold;
    }
    .rotateOpen {
        transform : rotate(180deg);
        -ms-transform:rotate(180deg);
        -webkit-transform:rotate(180deg);
        -webkit-transition: -webkit-transform .3s ease-in-out;
        -ms-transition: -ms-transform .3s ease-in-out;
        transition: transform .3s ease-in-out;  
    }

    .rotateClose {
        -webkit-transition: -webkit-transform .3s ease-in-out;
        -ms-transition: -ms-transform .3s ease-in-out;
        transition: transform .3s ease-in-out; 
    }
</style>