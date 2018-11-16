<div v-if="get_name">
    <div class="content">
        <div class="charlie m-b-md">@{{ charlies_message }} What Can I Call You?</div>
        <div>
            <p>My name is @{{ name }}</p>
            <input class="form-control" type="text" placeholder="Enter Name Here" v-model="name"/><br/>
            <button class="btn btn-dark" @click="transitionToCharlie3(true)">That Is My Name</button>
            <button v-if="!back_to_name" class="btn btn-dark" @click="transitionToCharlie3(false)">I Don't Want To Give You My Name</button>
            <button class="btn btn-dark" @click.stop="toggle ? endSpeechRecognition() : startSpeechRecognition()">Speak</button>
        </div>
    </div>
</div>
