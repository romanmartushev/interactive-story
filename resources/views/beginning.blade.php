<div v-if="beginning">
    <modal v-show="show" @close="show = false">
        <template slot="header">Background</template>
        <template slot="body">
            You will be interacting with a entity. He will learn from your actions. Your answers and actions will
            determine his behavior and his final personality. Good Luck!<br/>
            <span class="small" @click="show_disclaimer = true">*disclaimer</span>
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
            <a class="btn btn-dark" href="https://github.com/romanmartushev/interactive-story" target="_blank" role="button">GitHub</a>
        </div>
    </div>
</div>
