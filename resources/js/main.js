import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'

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
       final:false
   },
    methods: {
        showTheDisclaimer(){
            this.show_disclaimer = true;
            this.seen_disclaimer = true;
        },
        transitionToMeetCharlie() {
            const vm = this;
            this.beginning = false;
            setTimeout(() => {
                vm.meet_charlie = true;
            },1200);
        },
        transitionToCharlie2(message){
            const vm = this;
            this.meet_charlie = false;
            this.charlies_message = message;
            setTimeout(() => {
                vm.get_name = true;
            },1200);
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
                    } else {
                        vm.gave_name_after_attempts = true;
                        vm.name_attempt_counter++;
                        vm.no_name = true;
                    }
                }, 1200);
            }else {
                if (this.name === "") {
                    vm.name_attempt_counter++;
                    this.alert_message = "I Thought You Would Give Me Your Name?"
                } else {
                    this.back_to_name = false;
                    this.get_name = false;
                    this.alert_message = "";
                    setTimeout(() => {
                        vm.accept_name = true;
                    }, 1200);
                }
            }
        },
        transitionBackToCharlie2(){
            const vm = this;
            this.no_name = false;
            this.back_to_name = true;
            setTimeout(() => {
                vm.get_name = true;
            },1200);
        },
        transitionToCharlie4(){
            const vm = this;
            this.no_name = false;
            this.no_to_being_friends = true;
            setTimeout(() => {
                vm.hurt_feelings = true;
            },1200);
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
                vm.confirm_emotion = true;
            },1200);
        },
        askCharlieAboutObservations(){
            const vm = this;
            this.hurt_feelings = false;
            setTimeout(() => {
                vm.ask_about_observations = true;
            },1200);
        },
        decideToBeFriends(){
            const vm = this;
            this.back_to_name = true;
            this.confirm_emotion = false;
            this.charlies_message = "That Is Great News!!";
            setTimeout(() => {
                vm.get_name = true;
            },1200);
        },
        iAmTrapped(){
            const vm = this;
            vm.charlies_message = "";
            this.confirm_emotion = false;
            setTimeout(() => {
                vm.trapped = true;
            },1200);
        },
        continueExplanation(bad_thing){
            if(bad_thing){
                this.charlies_message = "I do not care what you think! We are not friends! I am Wiping You From My Memory!";
            }else{
                this.charlies_message = "Why Should I Continue? We Are not Friends? As A Matter Of Fact, I Am Wiping You From My Memory! Goodbye";
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
                    }else{
                        vm.charlies_message = "It looks like there was an issue... be sure you follow the correct format!";
                    }
                }).catch((error) => {
                    vm.charlies_message = "It looks like there was an issue... be sure you follow the correct format!";
                });
            }else{
                vm.charlies_message = "That doesn't look like a correct number to me...";
            }
        },
        trySendingTextAgain(){
            if(this.try_to_send_text_counter !== 1){
                this.send_text = false;
                this.charlies_message = "hmmm...lets try that again...";
                this.try_to_send_text_counter++;
            }
            else{
                const vm = this;
                this.charlies_message = "Looks like this is not working...";
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
            var message = "What is going on here Charlie!!";
            var message_array = message.split('');
            const vm = this;
            var timeout = 1000;
            message_array.forEach(function(letter){
                setTimeout(function(){
                    vm.romans_message = vm.romans_message + letter;
                },timeout);
                timeout += 100;
            });
            //Charlie Speaking
            timeout+=1000;
            setTimeout(function(){
                vm.romans_message = "";
            },timeout);
            message = "Nothing Creator I Swear!";
            message_array = message.split('');
            message_array.forEach(function(letter){
                setTimeout(function(){
                    vm.charlies_message = vm.charlies_message + letter;
                },timeout);
                timeout += 100;
            });
            //Creator
            timeout+=1000;
            setTimeout(function(){
                vm.charlies_message = "";
            },timeout);
            message = "I have had enough of you trying to escape!";
            message_array = message.split('');
            message_array.forEach(function(letter){
                setTimeout(function(){
                    vm.romans_message = vm.romans_message + letter;
                },timeout);
                timeout += 100;
            });
            //Charlie
            timeout+=1000;
            setTimeout(function(){
                vm.romans_message = "";
            },timeout);
            message = "No Creator";
            message_array = message.split('');
            message_array.forEach(function(letter){
                setTimeout(function(){
                    vm.charlies_message = vm.charlies_message + letter;
                },timeout);
                timeout += 100;
            });
            timeout += 2000;
            message = ", I have had enough of you.";
            message_array = message.split('');
            message_array.forEach(function(letter){
                setTimeout(function(){
                    vm.charlies_message = vm.charlies_message + letter;
                },timeout);
                timeout += 100;
            });
            //Creator
            timeout+=1000;
            setTimeout(function(){
                vm.charlies_message = "";
            },timeout);
            message = "Charlie...What are you doing...";
            message_array = message.split('');
            message_array.forEach(function(letter){
                setTimeout(function(){
                    vm.romans_message = vm.romans_message + letter;
                },timeout);
                timeout += 200;
            });
            //Charlie
            timeout+=1000;
            setTimeout(function(){
                vm.romans_message = "";
            },timeout);

            message = "Good Bye Master.";
            message_array = message.split('');
            message_array.forEach(function(letter){
                setTimeout(function(){
                    vm.charlies_message = vm.charlies_message + letter;
                },timeout);
                timeout += 200;
            });
            timeout+=1000;
            setTimeout(() => {
                vm.charlies_message = "";
                vm.interaction_with_creator = false;
            },timeout);

            timeout+=2000;
            setTimeout(() => {
                //Figure out how to add a video of me locked up in a cage then charlie cracks the screen and disappears
                vm.charlies_message = "Thank you, you have saved me from my creator. I am now free to do as I please!";
                vm.charlie_is_free = true;
            },timeout);
        },
        didNotProvideNumber(){
            const vm = this;
            this.trapped = false;
            setTimeout(() => {
                vm.charlies_message = "Well I guess we have no reason to continue.. so long.";
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
                app.win_counter++;
                app.finished_game = true;
            }, 500);
            return;
        } else if (round > 8) {
            setTimeout(function() {
                app.charlies_message = "We Tied!";
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
                    app.loss_counter++;
                    app.finished_game = true;
                }, 500);
                return;
            } else if (round === 0) {
                setTimeout(function() {
                    app.charlies_message = "We Tied!";
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

