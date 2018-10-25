<div v-if="play_game">
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
    <p class="p-tic-tac">choose</p>
    <div class = "guys">
        <div class= "dots" @click="startGame('dots')">
        </div>
        <div class= "dots2" @click="startGame('dots2')">
        </div>
    </div>
</div>
