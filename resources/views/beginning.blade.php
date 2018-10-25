<div v-if="beginning">
    <modal v-show="show" @close="show = false"></modal>
    <div class="content">
        <div class="title m-b-md">Help Charlie</div>
        <div>
            <button class="btn btn-dark" @click="show = true">Background</button>
            <button class="btn btn-dark" @click="transitionToMeetCharlie">Begin</button>
            <a class="btn btn-dark" href="https://github.com/romanmartushev/interactive-story" target="_blank" role="button">GitHub</a>
        </div>
    </div>
</div>
