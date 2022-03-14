<template>
<figure class="flex flex-col gap-4">
    
    <ProvinceViewIndicatorsGroup :province="province" v-for="(indicators, group) in $root.payload.indicators" :key="group" :group="group"></ProvinceViewIndicatorsGroup>

</figure>
</template>
<script>
import Province from "../Models/Province";
import ProvinceViewIndicatorsGroup from "./ProvinceViewIndicatorsGroup.vue";

export default {
    props: {
        province: {
            type: Province,
            required: true
        }
    },
    components: { ProvinceViewIndicatorsGroup }
}
</script>