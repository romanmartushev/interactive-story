<div v-if="get_name">
    <div class="content">
        <div class="charlie m-b-md">@{{ charlies_message }} What Can I Call You?</div>
        <div>
            <p>My name is @{{ name }}</p>
            <input class="form-control" type="text" placeholder="Enter Name Here" v-model="name"/><br/>
            <button class="btn btn-dark" @click="transitionToCharlie3(true)">That Is My Name</button>
            <button v-if="!back_to_name" class="btn btn-dark" @click="transitionToCharlie3(false)">I Don't Want To Give You My Name</button>
            <div class="alert alert-danger mt-1" role="alert" v-if="alert_message !== ''">@{{ alert_message }}</div>
        </div>
    </div>
</div>
