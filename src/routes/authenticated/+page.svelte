<script>
	import { palceholder3, placeholder1, placeholder2 } from "$lib/infoboxText";
	import InfoBox from "../../components/InfoBox.svelte";

    let showInfoBox1 = false
    let showInfoBox2 = false
    let showInfoBox3 = false
</script>

<main>
    <div class="infoboxWrapper">
        <div class="infobox" title={showInfoBox1 ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox1 = !showInfoBox1}}><h2>Placeholder 1</h2></div>
        <InfoBox content={placeholder1} html={true} open={showInfoBox1} showCloseIcon={false} onClose={() => {showInfoBox1 = !showInfoBox1}} />
            <br>
        <div class="infobox" title={showInfoBox2 ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox2 = !showInfoBox2}}><h2>Placeholder 2</h2></div>
        <InfoBox content={placeholder2} html={true} open={showInfoBox2} showCloseIcon={false} onClose={() => {showInfoBox2 = !showInfoBox2}} />
            <br>
        <div class="infobox" title={showInfoBox3 ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox3 = !showInfoBox3}}><h2>Placeholder3</h2></div>
        <InfoBox content={palceholder3} html={true} open={showInfoBox3} showCloseIcon={false} onClose={() => {showInfoBox3 = !showInfoBox3}} />
    </div>
</main>

<style>
    .infoboxWrapper {
        margin-top: 3rem;
    }

   .infobox {
        background-color: var(--siv-2);
        width: 100%;
        padding: 1.5rem;
        margin-bottom: -1px;
    }
</style>