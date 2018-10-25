import Vue from 'vue'
import $ from 'jquery'

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
       alert_message: ""
   },
    methods: {
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
                    } else {
                        vm.no_name = true;
                    }
                }, 1200);
            }else {
                if (this.name === "") {
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

        },
        transitionToPlayGame() {
            const vm = this;
            this.accept_name = false;
            reset();
            setTimeout(() => {
                vm.play_game = true;
            },1200);
        },
        startGame(id){
            this.charlies_message = "";
            this.finished_game = false;
            if(id === "dots"){
                aiColor = "black";
                humanColor = "red";
            }
            $(".guys, p").css("visibility", "hidden");
            $("td").css("visibility", "visible").click(function() {
                move(this, huPlayer, humanColor);
            });
        }
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
                app.finished_game = true;
            }, 500);
            return;
        } else if (round > 8) {
            setTimeout(function() {
                app.charlies_message = "We Tied!";
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
                    app.finished_game = true;
                }, 500);
                return;
            } else if (round === 0) {
                setTimeout(function() {
                    app.charlies_message = "We Tied!";
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

