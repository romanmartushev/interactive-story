<div v-if="meet_charlie">
    <div class="content">
        <div class="charlie m-b-md">Hello I Am Charlie!</div>
        <div>
            <button class="btn btn-dark" @click="transitionToCharlie2('It Is Nice To Meet You Too!'),openly_greeted_AI = true">Nice To Meet You!</button>
            <button class="btn btn-dark" @click="transitionToCharlie2('Well..Um..I guess it is..'),funny_name_AI = true">Charlie, That's A Funny Name!</button>
        </div>
    </div>
</div>
