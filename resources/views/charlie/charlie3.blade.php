<div v-if="accept_name">
    <div class="content">
        <div class="charlie m-b-md">Hi @{{ name }} :) <br/> do you want to play a game?</div>
        <div>
            <button class="btn btn-dark" @click="">Ok</button>
            <button class="btn btn-dark" @click="">Not Really</button>
        </div>
    </div>
</div>
<div v-if="no_name">
    <div class="content">
        <div class="charlie m-b-md">I thought we could be friends, isn't that what friends do? they share names. right?</div>
        <div>
            <button class="btn btn-dark" @click="transitionBackToCharlie2">Ok I Will Give You My Name</button>
            <button class="btn btn-dark" @click="transitionToCharlie4">I Can't Be Friends With An Entity</button>
        </div>
    </div>
</div>
