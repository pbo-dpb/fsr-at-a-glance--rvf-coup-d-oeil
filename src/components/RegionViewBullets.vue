<template>
    <div class="prose max-w-none">
        <ul>
            <RegionViewBulletsBullet :bullet="bullet" v-for="bullet in region.bullets"></RegionViewBulletsBullet>
        </ul>
    </div>
</template>
<script>
import Region from "../Models/Region";
import RegionViewBulletsBullet from "./RegionViewBulletsBullet.vue";

export default {
    props: {
        region: {
            type: Region,
            required: true
        }
    },
    components: { RegionViewBulletsBullet }
}
</script>