<div v-if="play_game">
    <div class="content">
        <transition name="fade">
            <div>
                <p class="charlie m-b-md">choose</p>
                <div class = "guys">
                    <div class= "dots" @click="startGame('dots')">
                    </div>
                    <div class= "dots2" @click="startGame('dots2')">
                    </div>
                </div>
            </div>
        </transition>
        <table class="table-tic-tac">
            <tr>
                    <td class = "cell td-tic-tac" id = "0"></td>
                    <td class = "cell td-tic-tac" id = "1"></td>
                    <td class = "cell td-tic-tac" id = "2"></td>
            </tr>
            <tr>
                <td class = "cell td-tic-tac" id = "3"></td>
                <td class = "cell td-tic-tac" id = "4"></td>
                <td class = "cell td-tic-tac" id = "5"></td>
            </tr>
            <tr>
                <td class = "cell td-tic-tac" id = "6"></td>
                <td class = "cell td-tic-tac" id = "7"></td>
                <td class = "cell td-tic-tac" id = "8"></td>
            </tr>
        </table>
        <transition name="fade">
            <div v-if="finished_game">
                <div class="charlie">@{{ charlies_message }} Would you like to play again? </div>
                <div>
                    <button class="btn btn-dark" @click="transitionToPlayGame">Yes!</button>
                    <button class="btn btn-dark" @click="transitionToHurtFeelings">No I Think I Am Done</button>
                </div>
            </div>
        </transition>
    </div>
</div>
