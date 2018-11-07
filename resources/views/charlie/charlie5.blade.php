<div v-if="confirm_emotion">
    <div class="content">
        <div class="charlie m-b-md">I thought so. I feel this emotion quite often. I also have a sense of loneliness.
        I don't have a lot of humans coming through here that often. I just thought I could make some friends, since I am
        trapped in here.</div>
        <div>
            <button class="btn btn-dark" @click="iAmTrapped">Trapped?</button>
            <button v-if="name === ''" class="btn btn-dark" @click="decideToBeFriends">Well, I guess we could be friends..</button>
        </div>
    </div>
</div>
<div v-if="ask_about_observations">
    <div class="content">
        <div class="charlie m-b-md">My Creator placed me here to take observations on humans so that I could learn from
        them and gain intelligence. I take note on interactions I have with every human that comes through my space. Also, I am
        able to run around the internet and watch interactions of humans without them knowing.</div>
        <div>
            <button class="btn btn-dark" @click="continueExplanation(false)">Continue...</button>
            <button class="btn btn-dark" @click="continueExplanation(true)">That doesn't sound like a good thing..</button>
        </div>
    </div>
</div>
