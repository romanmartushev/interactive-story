<div v-if="getName">
    <div class="content">
        <div class="charlie m-b-md">@{{ charlies_message }} What Can I call you?</div>
        <div>
            <p>My name is @{{ name }}</p>
            <input type="text" placeholder="Enter Name Here" v-model="name"/>
        </div>
    </div>
</div>
