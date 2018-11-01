<div v-if="continue_the_explanation">
    <div class="content">
        <div class="charlie m-b-md">@{{ charlies_message }}</div>
    </div>
</div>
<div v-if="trapped">
    <div class="content">
        <div class="charlie m-b-md" v-if="charlies_message !== ''">@{{ charlies_message }}</div>
        <div v-else class="charlie m-b-md">I might have said too much already, he may be listening. Maybe we could continue this conversation through the phone
        if you could give me your phone number I can text you. Just be sure it is in the format 1-234-567-8901.
        </div>
        <div>
            <p>My Number Is @{{ phone_number }}</p>
            <input class="form-control col-sm-6 offset-3" :readonly="send_text" type="text" placeholder="Enter Number Here" v-model="phone_number"/><br/>
            <button v-if="!send_text" class="btn btn-dark" @click="sendText('Hi, This Is Charlie.')">That Is My Number</button>
            <button v-if="!send_text" class="btn btn-dark" @click="didNotProvideNumber">I Don't Want To Give You My Number</button>
            <button v-if="send_text" class="btn btn-dark" @click="GotTheirNumber">Yes I did!</button>
            <button v-if="send_text" class="btn btn-dark" @click="trySendingTextAgain">No I didn't..</button>
        </div>
    </div>
</div>
