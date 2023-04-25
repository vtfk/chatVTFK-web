<script>
    import '../../infoPage.css'
	import { howItWorks, howToUseIt, gdpr, students, teachers, reflections } from "$lib/infoboxText";
	import InfoBox from "../../components/InfoBox.svelte";

    // States
    let showInfoBox1 = false
    let showInfoBox2 = false
    let showInfoBox3 = false
    let showInfoBox4 = false
    let showInfoBox5 = false
    let showInfoBox6 = false
</script>

<main>
    <div class="infoboxWrapper">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="infobox" title={showInfoBox1 ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox1 = !showInfoBox1}}>
            <div class="header">
                <h3>Hvordan virker det?</h3>
            </div>
            <div class="arrowIcon">
                <div class={showInfoBox1 ? 'rotateClose' : 'rotateOpen'}>^</div>
            </div>
        </div>
        <InfoBox content={howItWorks} html={true} open={showInfoBox1} showCloseIcon={false} onClose={() => {showInfoBox1 = !showInfoBox1}} />

        <br>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="infobox" title={showInfoBox2 ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox2 = !showInfoBox2}}>
            <div class="header">
                <h3>Hvordan bruke ChatVTFK på en hensiktsmessig måte</h3>
            </div>
            <div class="arrowIcon">
                <div class={showInfoBox2 ? 'rotateClose' : 'rotateOpen'}>^</div>
            </div>
        </div>
        <InfoBox content={howToUseIt} html={true} open={showInfoBox2} showCloseIcon={false} onClose={() => {showInfoBox2 = !showInfoBox2}} />

        <br>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="infobox" title={showInfoBox3 ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox3 = !showInfoBox3}}>
            <div class="header">
                <h3>GDPR og personvern</h3>
            </div>
            <div class="arrowIcon">
                <div class={showInfoBox3 ? 'rotateClose' : 'rotateOpen'}>^</div>
            </div>
        </div>
        <InfoBox content={gdpr} html={true} open={showInfoBox3} showCloseIcon={false} onClose={() => {showInfoBox3 = !showInfoBox3}} />

        <br>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="infobox" title={showInfoBox4 ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox4 = !showInfoBox4}}>
            <div class="header">
                <h3>Tips til elever</h3>
            </div>
            <div class="arrowIcon">
                <div class={showInfoBox4 ? 'rotateClose' : 'rotateOpen'}>^</div>
            </div>
        </div>
        <InfoBox content={students} html={true} open={showInfoBox4} showCloseIcon={false} onClose={() => {showInfoBox4 = !showInfoBox4}} />

        <br>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="infobox" title={showInfoBox5 ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox5 = !showInfoBox5}}>
            <div class="header">
                <h3>Tips til lærere</h3>
            </div>
            <div class="arrowIcon">
                <div class={showInfoBox5 ? 'rotateClose' : 'rotateOpen'}>^</div>
            </div>
        </div>
        <InfoBox content={teachers} html={true} open={showInfoBox5} showCloseIcon={false} onClose={() => {showInfoBox5 = !showInfoBox5}} />
        
        <br>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="infobox" title={showInfoBox6 ? 'Lukk infoboks' : 'Åpne infoboks'} on:click={() => {showInfoBox6 = !showInfoBox6}}>
            <div class="header">
                <h3>Refleksjonsspørsmål</h3>
            </div>
            <div class="arrowIcon">
                <div class={showInfoBox6 ? 'rotateClose' : 'rotateOpen'}>^</div>
            </div>
        </div>
        <InfoBox content={reflections} html={true} open={showInfoBox6} showCloseIcon={false} onClose={() => {showInfoBox6 = !showInfoBox6}} />
    </div>
</main>

<style>
    .infoboxWrapper {
        margin-top: 3rem;
    }

   .infobox {
        display: flex;
        justify-content: space-between;
        background-color: var(--siv-2);
        width: 100%;
        margin-bottom: 1rem;
        padding-left: 2rem;
        padding-right: 2rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        margin-bottom: -1px;
        cursor: pointer;
    }

    .infobox:hover {
        background: var(--siv-1);
    }

    .infoboxHeader {
       display: flex;
    }

    .header {
        display: flex;
        height: fit-content;
    }

    .arrowIcon {
        display: flex;
        height: fit-content;
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