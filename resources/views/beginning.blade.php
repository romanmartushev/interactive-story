<div v-if="beginning">
    <modal v-show="show" @close="show = false">
        <template slot="header">Background</template>
        <template slot="body">
            You will be interacting with a entity. She will learn from your actions. Your answers and actions will
            determine her behavior and her final personality. Good Luck!<br/>
            <span class="small" @click="showTheDisclaimer">*disclaimer</span>
        </template>
    </modal>
    <modal v-show="show_disclaimer" @close="show_disclaimer = false">
        <template slot="header">Disclaimer</template>
        <template slot="body">
            Charlie Will Ask You For Personal Information (He Wants To Be Your Friend). He Might Choose To Keep It.
            It Will Not Be Anything Serious like your SSN. If At Any Time He Asks You
            A Question You Do Not Wish To Answer, Simply Stop Playing. You Might Make Him
            Sad Though.
        </template>
    </modal>
    <div class="content">
        <div class="title m-b-md">Help Charlie</div>
        <div>
            <button class="btn btn-dark" @click="show = true">Background</button>
            <button class="btn btn-dark" @click="transitionToMeetCharlie">Begin</button>
            <button class="btn btn-dark" @click.stop="toggle ? endSpeechRecognition(transitionToMeetCharlie) : startSpeechRecognition()">Speak</button>
            <a class="btn btn-dark" href="https://github.com/romanmartushev/interactive-story" target="_blank" role="button">GitHub</a>
        </div>
        <div class="mt-3">
            You will have the option to either speak to charlie directly by pushing the speak button on the page to start then
            press it again when you are finished talking. Or you can simply press the buttons to progress. When speaking to her
            make sure you read the whatever is on the button..she is still learning. You can start by clicking Speak saying "Begin" then
            clicking it again to end your speech.
        </div>
    </div>
</div>
