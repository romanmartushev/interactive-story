<div v-if="hurt_feelings">
    <div class="content">
        <div class="charlie m-b-md">I don't know what to say.. My creator never really gave me emotions, but after
        all the observations I have taken on humans I would say I should be sad. Is this a correct Observation?</div>
        <div>
            <button class="btn btn-dark" @click="confirmCharliesEmotion">Yes It Is</button>
            <button v-if="name === ''" class="btn btn-dark" @click="askCharlieAboutObservations">What Sort Of Observations?</button>
            <button class="btn btn-dark" @click.stop="toggle ? endSpeechRecognition() : startSpeechRecognition()">Speak</button>
        </div>
    </div>
</div>
