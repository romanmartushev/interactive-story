<div v-if="meet_charlie">
    <div class="content">
        <div class="charlie m-b-md">@{{ charlies_message }}</div>
        <div>
            <button class="btn btn-dark" @click="transitionToCharlie2('It Is Nice To Meet You Too!')">Nice To Meet You!</button>
            <button class="btn btn-dark" @click="transitionToCharlie2('Well..Um..I guess it is..')">Charlie, That's A Funny Name!</button>
            <button class="btn btn-dark" @click.stop="toggle ? endSpeechRecognition(transitionToCharlie2) : startSpeechRecognition()">Speak</button>
        </div>
    </div>
</div>
