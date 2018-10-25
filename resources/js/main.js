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
              <div class="modal-body content">
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
       get_name: false,
       accept_name: false,
       no_name: false,
       back_to_name: false,
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

        }
    },
    mounted() {

    }
});
