import Vue from 'vue'
Vue.component('modal',{
    template: `
        <div tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="position: fixed">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Background</h5>
                <button type="button" class="close" @click="$emit('close')" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                You will be interacting with a entity. He will learn from your actions. Your answers and actions will
                determine his behavior and his final personality. Good Luck!
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
              </div>
            </div>
          </div>
        </div>
    `
});
new Vue({
   el: '#root',
   data: {
       show: false,
       beginning: true,
       meet_charlie:false,
       getName: false,
       name: "",
       charlies_message: ""
   },
    methods: {
        transitionToMeetCharlie() {
            const vm = this;
            this.beginning = false;
            setTimeout(() => {
                vm.meet_charlie = true;
            },1200);
        },
        transitionToNiceToMeetYou(){
            const vm = this;
            this.meet_charlie = false;
            this.charlies_message = "It Is Nice To Meet You Too!";
            setTimeout(() => {
                vm.getName = true;
            },1200);
        },
        transitionToThatsAFunnyName(){
            const vm = this;
            this.meet_charlie = false;
            this.charlies_message = "Well..Um..I guess it is..";
            setTimeout(() => {
                vm.getName = true;
            },1200);
        }
    },
    mounted() {

    }
});
