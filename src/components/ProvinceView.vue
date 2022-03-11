<template>
<div class="prose max-w-none">
<h1 class="leading-none font-thin mb-4">{{ province.name }}</h1>
</div>
<ProvinceViewBullets :province="province"></ProvinceViewBullets>
</template>
<script>
import Province from "../Models/Province";
import ProvinceViewBullets from "./ProvinceViewBullets.vue";

export default {
    props: {
        province: {
            type: Province,
            required: true
        }
    },
    components: { ProvinceViewBullets }
}
</script>