<div v-if="charlie_share_images">
    <transition-group name="cell" tag="div" class="row no-gutters">
        <div v-for="(image, index) in images" :key="image.id+index" class="col-sm-4 cell-image">
            <img class="img-fluid" :src="image.urls.regular" />
        </div>
    </transition-group>
    <div class="text-center">
        <div class="charlie">Here is my Image Collection! What do you think?? I am just trying to find a good way to arrange them...</div>
        <div>
            <button class="btn btn-dark">It is nice!</button>
            <button class="btn btn-dark">These are pretty random..</button>
        </div>
    </div>
</div>
