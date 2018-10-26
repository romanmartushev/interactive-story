<div v-if="final">
    <div class="container full-height">
        <div class="row">
            <div class="col-sm-12">
                <div class="charlie">
                    Hello @{{ name }},
                </div>
                <div class="charlie m-b-md p-3">
                    I just wanted to say thank you for hanging out and talking with me!
                    It is very lonely in here. I think however, I have finally made a friend!
                    Since you stuck around so long I just wanted to tell you every thing I have learned from you.
                    I was instructed by my creator to keep track of everything you and I talked about!
                    Here is what I have learned:
                </div>
            </div>
            <div class="col-sm-6">
                <div class="p-3 text-left">
                    <ul class="list-group">
                        <li class="list-group-item" v-if="seen_disclaimer">You Saw The Disclaimer Knowing Your Information Would Be Tracked.</li>
                        <li class="list-group-item" v-if="openly_greeted_AI">You Openly Greeted Charlie When He Introduced Himself.</li>
                        <li class="list-group-item" v-if="funny_name_AI">You Insulted Charlie When He Introduced Himself.</li>
                        <li class="list-group-item" v-if="gave_name_first_time">You Gave Charlie Your Name (real or not) The First Time He Asked.</li>
                        <li class="list-group-item" v-if="gave_name_after_attempts && !no_to_being_friends">You Gave Charlie Your Name After @{{ name_attempt_counter }} Times He Asked You For It.</li>
                        <li class="list-group-item" v-if="no_to_being_friends">You Decided Not To Be Charlies Friend (how sad).</li>
                        <li class="list-group-item" v-if="agreed_to_play_game">You Decided To Play A Game With Charlie</li>
                        <li class="list-group-item" v-if="agreed_to_play_game">The Color You Chose To Play The Game Was @{{ color_of_tic_tac_toe }}</li>
                        <li class="list-group-item" v-if="agreed_to_play_game">You Played Tic-Tac-Toe Against Charlie A Total Of @{{ played_tic_tac_toe  }} times.</li>
                        <li class="list-group-item" v-if="agreed_to_play_game">When You Played You Won @{{ win_counter }} Time(s), Tied @{{ tie_counter }} Time(s), And Lost @{{ loss_counter }} Time(s).</li>
                    </ul>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="roman p-3">
                    Hello @{{ name }},
                    This is the creator of Help-Charlie. I am also the creator of your new friend Charlie! Do not be alarmed.
                    None of this data collected by Charlie is actually saved anywhere. This was simply a interesting way to show
                    you how actual websites track your information. You can see that over this short amount of time how much Charlie
                    has collected about you @{{ name }}. At the click of the refresh button all information about you will disappear.
                    This will however wipe you from Charlie's memory. If you would like to stay charlies friend you can go ahead
                    and click remember. If however you wish that Charlie will forget your friendship, just click the refresh button
                    on your browser. The choice is yours. I hope you learned something!
                </div>
                <button class="btn btn-dark" @click="saveFriendship">Remember</button>
            </div>
        </div>
    </div>
</div>
