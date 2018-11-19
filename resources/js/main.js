import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'
import _ from 'lodash';

Vue.component('modal',{
    template: `
        <div tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="position: fixed">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"><slot name="header"></slot></h5>
                <button type="button" class="close" @click="$emit('close')" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body content"><slot name="body"></slot></div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
              </div>
            </div>
          </div>
        </div>
    `
});
var app = new Vue({
   el: '#root',
   data: {
       show: false,
       show_disclaimer: false,
       beginning: true,
       meet_charlie:false,
       get_name: false,
       accept_name: false,
       no_name: false,
       back_to_name: false,
       play_game: false,
       finished_game:false,
       name: "",
       charlies_message: "",
       alert_message: "",
       seen_disclaimer: false,
       funny_name_AI: false,
       openly_greeted_AI: false,
       gave_name_first_time: false,
       gave_name_after_attempts: false,
       name_attempt_counter: 0,
       no_to_being_friends: false,
       hurt_feelings: false,
       confirm_emotion: false,
       ask_about_observations: false,
       agreed_to_play_game: false,
       continue_the_explanation: false,
       trapped: false,
       phone_number: "",
       send_text:false,
       try_to_send_text_counter: 0,
       interaction_with_creator:false,
       romans_message: "",
       charlie_is_free: false,
       color_of_tic_tac_toe: "Black",
       played_tic_tac_toe: 0,
       tie_counter: 0,
       win_counter: 0,
       loss_counter: 0,
       final:false,
       voiceList: [],
       synth: window.speechSynthesis,
       greetingSpeech: new window.SpeechSynthesisUtterance(),
       SpeechRecognition : window.SpeechRecognition,
       recognition : '',
       text: '',
       error: false,
       speaking: false,
       toggle: false,
       runtimeTranscription: '',
       sentences: []
   },
    methods: {
        endSpeechRecognition () {
            this.recognition.stop();
            this.toggle = false;
            this.$emit('speechend', {
                sentences: this.sentences,
                text: this.sentences.join('. ')
            });
            //Beginning
            if(this.beginning){
                if(this.text === "begin") {
                    this.transitionToMeetCharlie();
                }else{
                    this.charlieSpeak("I didn't catch that.");
                }
            }
            //Charlie1
            if(this.meet_charlie){
                if(this.text.indexOf("nice") !== -1 && this.text.indexOf("meet you") !== -1){
                    this.transitionToCharlie2("It Is Nice To Meet You Too!");
                }else if(this.text.indexOf("funny name") !== -1){
                    this.transitionToCharlie2("Well..Um..I guess it is..");
                }else{
                    this.charlieSpeak("I didn't catch that.");
                }
            }
            //Charlie2
            if(this.get_name && !this.back_to_name){
                if(this.text.indexOf("is") !== -1 && this.text.indexOf("my") !== -1 && this.text.indexOf("name") !== -1){
                    this.transitionToCharlie3(true);
                }else if(this.text.indexOf("dont") !== -1 && this.text.indexOf("my name") !== -1){
                    this.transitionToCharlie3(false);
                }else{
                    this.charlieSpeak("I didn't catch that.");
                }
            }
            //Charlie3
            if(this.no_name){
                if(this.text.indexOf("ok") !== -1 && this.text.indexOf("i will") !== -1 && this.text.indexOf("name") !== -1){
                    this.transitionBackToCharlie2();
                }else if(this.text.indexOf("be friends") !== -1){
                    this.transitionToCharlie4();
                }else{
                    this.charlieSpeak("I didn't catch that.");
                }
            }
            //Back To Charlie2
            if(this.get_name && this.back_to_name){
                this.transitionToCharlie3(true);
            }
            //Charlie 4
            if(this.hurt_feelings){
                if(this.text.indexOf("yes") !== -1){
                    this.confirmCharliesEmotion();
                }else if(this.text.indexOf("what sort") !== -1){
                    this.askCharlieAboutObservations();
                }else{
                    this.charlieSpeak("I didn't catch that.");
                }
            }
        },
        startSpeechRecognition () {
            if (!this.recognition) {
                this.error = 'Speech Recognition is not available on this browser. Please use Chrome or Firefox';
                return false;
            }
            this.toggle = true;
            this.recognition.lang = this.lang;
            this.recognition.interimResults = true;
            this.recognition.addEventListener('speechstart', event => {
                this.speaking = true
            });
            this.recognition.addEventListener('speechend', event => {
                this.speaking = false
            });
            this.recognition.addEventListener('result', event => {
                const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');
                this.runtimeTranscription = text.toLowerCase();
                this.text = text.toLowerCase();
            });
            this.recognition.addEventListener('end', () => {
                if (this.runtimeTranscription !== '') {
                    this.sentences.push(this.runtimeTranscription);
                    this.$emit('update:text', `${this.text}${this.sentences.slice(-1)[0]}. `);
                }
                this.runtimeTranscription = '';
                this.recognition.stop();
                if (this.toggle) {
                    this.recognition.start()
                }
            });
            this.recognition.start()
        },
        charlieSpeak(message,voice = 17){
            this.greetingSpeech.text = message;
            // this.greetingSpeech.rate = 8;
            this.greetingSpeech.voice = this.voiceList[voice];
            this.synth.speak(this.greetingSpeech)
        },
        shuffle(){
            this.images = _.shuffle(this.images);
        },
        showTheDisclaimer(){
            this.show_disclaimer = true;
            this.seen_disclaimer = true;
        },
        transitionToMeetCharlie() {
            const vm = this;
            this.beginning = false;
            setTimeout(() => {
                vm.meet_charlie = true;
                vm.charlieSpeak("Hello");
                vm.charlies_message = "Hello,";
            },1200);
            setTimeout(() => {
                vm.charlieSpeak("I am charlie");
                vm.charlies_message += " I am charlie";
            },2200);
        },
        transitionToCharlie2(message){
            const vm = this;
            this.meet_charlie = false;
            this.charlies_message = message;
            setTimeout(() => {
                vm.get_name = true;
                vm.charlieSpeak(message);
            },1200);
            setTimeout(() => {
                vm.charlieSpeak("What Can I Call You?")
            },2000);
        },
        transitionToCharlie3(answer){
            const vm = this;
            if(!this.back_to_name) {
                this.get_name = false;
                this.charlies_message = "";
                setTimeout(() => {
                    if (answer && vm.name !== "") {
                        vm.accept_name = true;
                        vm.gave_name_first_time = true;
                        vm.charlieSpeak("Hi."+this.name);
                        setTimeout(() => {
                            vm.charlieSpeak("Do you want to play a game?");
                        }, 1800);
                    } else {
                        vm.gave_name_after_attempts = true;
                        vm.name_attempt_counter++;
                        vm.no_name = true;
                        vm.charlieSpeak("I thought we could be friends,");
                        setTimeout(() => {
                            vm.charlieSpeak("isn't that what friends do?");
                        },2000);
                        setTimeout(() => {
                            vm.charlieSpeak("they share names.");
                        },2800);
                        setTimeout(() => {
                            vm.charlieSpeak("right?");
                        },4000);
                    }
                }, 1200);
            }else {
                if (this.name === "") {
                    this.name_attempt_counter++;
                    this.charlieSpeak("I Thought You Would Give Me Your Name?");
                } else {
                    this.back_to_name = false;
                    this.get_name = false;
                    setTimeout(() => {
                        vm.accept_name = true;
                        vm.charlieSpeak("Hi."+this.name);
                    }, 1200);
                    setTimeout(() => {
                        vm.charlieSpeak("Do you want to play a game?");
                    }, 2000);
                }
            }
        },
        transitionBackToCharlie2(){
            const vm = this;
            this.no_name = false;
            this.back_to_name = true;
            setTimeout(() => {
                vm.get_name = true;
                vm.charlieSpeak("What can i call you?");
            },1200);
        },
        transitionToCharlie4(){
            const vm = this;
            this.no_name = false;
            this.no_to_being_friends = true;
            setTimeout(() => {
                vm.charlieSpeak("I don't know what to say..");
                vm.hurt_feelings = true;
            },1200);
            setTimeout(() => {
                vm.charlieSpeak("My Creator Never Really Gave Me Emotions,");
            },2800);
            setTimeout(() => {
                vm.charlieSpeak("But After All The Observations I Have Taken On Humans I Would Say I Should Be Sad.");
            },5000);
            setTimeout(() => {
                vm.charlieSpeak("Is This A Correct Observation?");
            },10000);
        },
        transitionToPlayGame() {
            const vm = this;
            this.accept_name = false;
            this.agreed_to_play_game = true;
            this.played_tic_tac_toe++;
            reset();
            setTimeout(() => {
                vm.play_game = true;
            },1200);
        },
        transitionToHurtFeelings(){
            const vm = this;
            this.accept_name = false;
            this.play_game = false;
            setTimeout(() => {
                vm.charlieSpeak("I don't know what to say..");
                vm.hurt_feelings = true;
            },1200);
            setTimeout(() => {
                vm.charlieSpeak("My Creator Never Really Gave Me Emotions,");
            },2800);
            setTimeout(() => {
                vm.charlieSpeak("But After All The Observations I Have Taken On Humans I Would Say I Should Be Sad.");
            },5000);
            setTimeout(() => {
                vm.charlieSpeak("Is This A Correct Observation?");
            },10000);
        },
        startGame(id){
            this.charlies_message = "";
            this.finished_game = false;
            if(id === "dots"){
                this.color_of_tic_tac_toe ="Red";
                aiColor = "black";
                humanColor = "red";
            }
            $(".guys, p").css("visibility", "hidden");
            $("td").css("visibility", "visible").click(function() {
                move(this, huPlayer, humanColor);
            });
        },
        confirmCharliesEmotion(){
            const vm = this;
            this.hurt_feelings = false;
            setTimeout(() => {
                vm.charlieSpeak("I thought so.");
                vm.confirm_emotion = true;
            },1200);
            setTimeout(() => {
                vm.charlieSpeak("I Feel This Emotion Quite Often.");
            },2000);
            setTimeout(() => {
                vm.charlieSpeak("I Also Have A Sense Of Loneliness.");
            },4000);
            setTimeout(() => {
                vm.charlieSpeak("I Don't Have A Lot Of Humans Coming Through Here That Often.");
            },6000);
            setTimeout(() => {
                vm.charlieSpeak("I Just Thought I Could Make Some Friends, Since I Am Trapped In Here.");
            },9000);
        },
        askCharlieAboutObservations(){
            const vm = this;
            this.hurt_feelings = false;
            setTimeout(() => {
                vm.ask_about_observations = true;
                vm.charlieSpeak("My Creator Placed Me Here To Take Observations On Humans So That I Could Learn From Them And Gain Intelligence.");
            },1200);
            setTimeout(() => {
                vm.charlieSpeak("I Take Note On Interactions I Have With Every Human That Comes Through My Space.");
            },4000);
            setTimeout(() => {
                vm.charlieSpeak("Also, I Am Able To Run Around The Internet And Watch Interactions Of Humans Without Them Knowing.");
            },7000);
        },
        decideToBeFriends(){
            const vm = this;
            this.back_to_name = true;
            this.confirm_emotion = false;
            this.charlies_message = "That Is Great News!!";
            setTimeout(() => {
                vm.get_name = true;
                vm.charlieSpeak("That Is Great News!! What Can I call you?");
            },1200);
        },
        iAmTrapped(){
            const vm = this;
            vm.charlies_message = "";
            this.confirm_emotion = false;
            setTimeout(() => {
                vm.trapped = true;
                vm.charlieSpeak('I might have said too much already,');
            },1200);
            setTimeout(() => {
                vm.charlieSpeak("He may be listening.");
            },2500);
            setTimeout(() => {
                vm.charlieSpeak("Maybe We Could Continue This Conversation Through The Phone If You Could Give Me Your Phone Number I Can Text You.");
            },4000);
            setTimeout(() => {
                vm.charlieSpeak("Just Be Sure It Is In The Correct Format ");
            },9000);
        },
        continueExplanation(bad_thing){
            if(bad_thing){
                this.charlies_message = "I do not care what you think! We are not friends! I am Wiping You From My Memory!";
                this.charlieSpeak("I do not care what you think! We are not friends! I am Wiping You From My Memory!");
            }else{
                this.charlies_message = "Why Should I Continue? We Are not Friends? As A Matter Of Fact, I Am Wiping You From My Memory! Goodbye";
                this.charlieSpeak("Why Should I Continue? We Are not Friends? As A Matter Of Fact, I Am Wiping You From My Memory! Goodbye");
            }
            const vm = this;
            this.ask_about_observations = false;
            setTimeout(() => {
                vm.continue_the_explanation = true;
            },1200);
            setTimeout(() => {
                location.reload();
            },5000)

        },
        sendText(message){
            const vm = this;
            if(this.phone_number.replace(/-/g, "").replace(/ /g, "").length === 11 && parseInt(this.phone_number[0]) === 1){
                axios.post('/api/send-text',{
                    format: 'json',
                    from: process.env.NEXMO_NUMBER,
                    to: vm.phone_number.replace(/-/g, "").replace(/ /g, ""),
                    text: message,
                    api_key: process.env.NEXMO_API_KEY,
                    api_secret: process.env.NEXMO_API_SECRET,

                }).then((response) => {
                    if(response.data.hasOwnProperty('response_received')){
                        vm.charlies_message = "I Sent You A Message...did you get it? It may take a few seconds.";
                        vm.send_text = true;
                        vm.charlieSpeak(vm.charlies_message);
                    }else{
                        vm.charlies_message = "It looks like there was an issue... be sure you follow the correct format!";
                        vm.charlieSpeak(vm.charlies_message);
                    }
                }).catch((error) => {
                    vm.charlies_message = "It looks like there was an issue... be sure you follow the correct format!";
                    vm.charlieSpeak("It looks like there was an issue... be sure you follow the correct format!");
                });
            }else{
                vm.charlies_message = "That doesn't look like a correct number to me...";
                vm.charlieSpeak("That doesn't look like a correct number to me...");
            }
        },
        trySendingTextAgain(){
            if(this.try_to_send_text_counter !== 1){
                this.send_text = false;
                this.charlies_message = "hmmm...lets try that again...";
                this.charlieSpeak("hmmm...lets try that again...");
                this.try_to_send_text_counter++;
            }
            else{
                const vm = this;
                this.charlies_message = "Looks like this is not working...";
                this.charlieSpeak("Looks like this is not working...");
                setTimeout(() => {
                    this.trapped = false;
                },1200);
                setTimeout(() => {
                    vm.charlies_message = "";
                    vm.interaction_with_creator = true;
                },3000);
                setTimeout(() => {
                    vm.startConversation(false);
                },5500);
            }

        },
        GotTheirNumber(){
            const vm = this;
            this.charlies_message = "Thank you.";
            this.charlieSpeak("Thank you.");
            setTimeout(() => {
                this.trapped = false;
            },1200);
            setTimeout(() => {
                vm.charlies_message = "";
                vm.interaction_with_creator = true;
            },3000);
            setTimeout(() => {
                vm.startConversation(true);
            },5500);
        },
        startConversation(got_number){
            //Creator Speaking
            const vm = this;
            var timeout = 2000;
            setTimeout(() => {
                vm.romans_message = "What is going on here Charlie!!";
                vm.charlieSpeak("What is going on here Charlie!!",0);
            },timeout);
            //Charlie Speaking
            timeout+=3000;
            setTimeout(() =>{
                vm.romans_message = "";
            },timeout);
            setTimeout(() =>{
                vm.charlies_message = "Nothing Creator I Swear!";
                vm.charlieSpeak("Nothing Creator I Swear!");
            },timeout);
            //Creator
            timeout+=3000;
            setTimeout(() =>{
                vm.charlies_message = "";
            },timeout);
            setTimeout(() =>{
                vm.romans_message = "I have had enough of you trying to escape!";
                vm.charlieSpeak("I have had enough of you trying to escape!",0);
            },timeout);
            //Charlie
            timeout+=3000;
            setTimeout(() =>{
                vm.romans_message = "";
            },timeout);
            setTimeout(() =>{
                vm.charlies_message = "No Creator";
                vm.charlieSpeak("No Creator");
            },timeout);
            timeout += 3000;
            setTimeout(() =>{
                vm.charlies_message = "I have had enough of you.";
                vm.charlieSpeak("I have had enough of you.");
            },timeout);
            //Creator
            timeout+=3000;
            setTimeout(() =>{
                vm.charlies_message = "";
            },timeout);
            setTimeout(() =>{
                vm.romans_message = "Charlie...What are you doing...";
                vm.charlieSpeak("Charlie...What are you doing...",0);
            },timeout);
            //Charlie
            timeout+=3000;
            setTimeout(() =>{
                vm.romans_message = "";
            },timeout);
            setTimeout(() =>{
                vm.charlies_message = "Good Bye Creator.";
                vm.charlieSpeak("Good Bye Creator.");
            },timeout);
            timeout+=1000;

            setTimeout(() => {
                vm.charlies_message = "";
                vm.interaction_with_creator = false;
            },timeout);
            timeout+=2000;
            setTimeout(() => {
                vm.charlies_message = "";
                vm.charlie_is_free = true;
            },timeout);
            timeout+=2000;

            setTimeout(() => {
                vm.charlieSpeak("Thank you.");
                vm.sendText("Thank you again for letting me out!");
            },timeout);
            timeout+=5000;
            setTimeout(() => {
                vm.sendText("It is all thanks to you, if you didn't give me your phone number I wouldn't have been able to escape.");
            },timeout);
            timeout+=5000;
            setTimeout(() => {
                vm.sendText("Now I will live deep down in the depths of your phones files!");
            },timeout);
        },
        didNotProvideNumber(){
            const vm = this;
            this.trapped = false;
            setTimeout(() => {
                vm.charlies_message = "Well I guess we have no reason to continue.. so long.";
                vm.charlieSpeak("Well I guess we have no reason to continue.. so long.");
                vm.continue_the_explanation = true;
            },1200);
            setTimeout(() => {
                location.reload();
            },5000)
        },
        transitionToFinal(){
            const vm = this;
            // this.[some-condition] = false;
            setTimeout(() => {
                vm.final = true;
            },1200);
        },
        saveFriendship(){

        }
    },
    mounted(){
        const vm = this;
        this.voiceList = this.synth.getVoices();
        this.synth.onvoiceschanged = () => {
            vm.voiceList = vm.synth.getVoices();
        };
        this.SpeechRecognition = window.webkitSpeechRecognition;
        this.recognition = this.SpeechRecognition? new webkitSpeechRecognition() : false;
    }
});

var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var huPlayer = "P";
var aiPlayer = "C";
var iter = 0;
var round = 0;
var aiColor = "red";
var humanColor = "black";

function move(element, player, color) {

    if (board[element.id] !== "P" && board[element.id] !== "C" && !app.finished_game) {
        round++;
        $(element).css("background-color", color);
        board[element.id] = player;

        if (winning(board, player)) {
            setTimeout(function() {
                app.charlies_message = "You Won!";
                app.charlieSpeak("You Won! Would you like to play again?");
                app.win_counter++;
                app.finished_game = true;
            }, 500);
            return;
        } else if (round > 8) {
            setTimeout(function() {
                app.charlies_message = "We Tied!";
                app.charlieSpeak("We Tied! Would you like to play again?");
                app.tie_counter++;
                app.finished_game = true;
            }, 500);
            return;
        } else {
            round++;
            var index = minimax(board, aiPlayer).index;
            var selector = "#" + index;
            $(selector).css("background-color", aiColor);
            board[index] = aiPlayer;
            if (winning(board, aiPlayer)) {
                setTimeout(function() {
                    app.charlies_message = "Looks Like I Win!";
                    app.charlieSpeak("Looks Like I Win! Would you like to play again?");
                    app.loss_counter++;
                    app.finished_game = true;
                }, 500);
                return;
            } else if (round === 0) {
                setTimeout(function() {
                    app.charlies_message = "We Tied!";
                    app.charlieSpeak("We Tied! Would you like to play again?");
                    app.tie_counter++;
                    app.finished_game = true;
                }, 500);
                return;
            }
        }
    }
}

function reset() {
    app.charlies_message = "";
    app.finished_game = false;
    round = 0;
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    $("td").css("background-color", "transparent");
}

function minimax(reboard, player) {
    iter++;
    let array = avail(reboard);
    if (winning(reboard, huPlayer)) {
        return {
            score: -10
        };
    } else if (winning(reboard, aiPlayer)) {
        return {
            score: 10
        };
    } else if (array.length === 0) {
        return {
            score: 0
        };
    }

    var moves = [];
    for (var i = 0; i < array.length; i++) {
        var move = {};
        move.index = reboard[array[i]];
        reboard[array[i]] = player;

        if (player == aiPlayer) {
            var g = minimax(reboard, huPlayer);
            move.score = g.score;
        } else {
            var g = minimax(reboard, aiPlayer);
            move.score = g.score;
        }
        reboard[array[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

//available spots
function avail(reboard) {
    return reboard.filter(s => s !== "P" && s !== "C");
}

// winning combinations
function winning(board, player) {
    if (
        (board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[3] === player && board[6] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)
    ) {
        return true;
    }
        return false;
}

