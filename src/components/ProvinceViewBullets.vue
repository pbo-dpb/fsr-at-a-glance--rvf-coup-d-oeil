<template>
<div class="prose max-w-none">
    <ul><ProvinceViewBulletsBullet :bullet="bullet" v-for="bullet in province.bullets"></ProvinceViewBulletsBullet></ul>
</div>
</template>
<script>
import Province from "../Models/Province";
import ProvinceViewBulletsBullet from "./ProvinceViewBulletsBullet.vue";

export default {
    props: {
        province: {
            type: Province,
            required: true
        }
    },
    components: { ProvinceViewBulletsBullet }
}
</script>