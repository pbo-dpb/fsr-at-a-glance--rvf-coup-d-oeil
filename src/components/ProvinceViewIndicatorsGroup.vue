<template>
<figure class="grid  gap-4" :class="`grid-cols-${columnCount}`">
    
    
    <div class="col-span-2 font-semibold">
        {{ $root.strings[`indicators_group_${group}`] }}
    </div>

    <div class="font-semibold text-center" v-for="column in dataColumnLabels">
        {{ column }}
    </div>

    <ProvinceViewIndicatorsGroupIndicator v-for="(indVals, indKey) in $root.payload.indicators[this.group]" :indicator-values="indVals" :indicator-key="indKey" :province="province"></ProvinceViewIndicatorsGroupIndicator>

</figure>
</template>
<script>
import Province from "../Models/Province";
import ProvinceViewIndicatorsGroupIndicator from "./ProvinceViewIndicatorsGroupIndicator.vue";

export default {
    props: {
        province: {
            type: Province,
            required: true
        },
        group: {
            type: String,
            required: true
        }
    },
    computed: {
        dataColumnLabels() {
            return Object.keys(Object.values(this.$root.payload.indicators[this.group])[0]);
        },
        dataColumnCount() {
            return this.dataColumnLabels.length;
        },
        columnCount() {
            return 2 + this.dataColumnCount;
        }
    },
    components: { ProvinceViewIndicatorsGroupIndicator }
}
</script>