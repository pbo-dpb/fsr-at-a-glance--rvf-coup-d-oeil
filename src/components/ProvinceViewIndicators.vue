<template>
<figure class="flex flex-col gap-4">
    <div class="flex flex-row justify-end">
    <label class="text-sm font-semibold border rounded border-red-800 text-red-800 px-2 py-1 flex flex-row items-center gap-2">
        <input type="checkbox" v-model="displayComparisonToNationalAverage" @change="setDisplayComparisonToNationalAverage"> {{ $root.strings.indicators_comparison_toggle }}
        </label>
    </div>
    <ProvinceViewIndicatorsGroup :province="province" v-for="(indicators, group) in $root.payload.indicators" :key="group" :group="group" :display-comparison-to-national-average="displayComparisonToNationalAverage"></ProvinceViewIndicatorsGroup>

</figure>
</template>
<script>
import Province from "../Models/Province";
import ProvinceViewIndicatorsGroup from "./ProvinceViewIndicatorsGroup.vue";
const localStorageKey = 'ca.pbo-dpb.pbo-dpb_fsr-at-a-glance--rvf-coup-d-oeil.displayComparisonToNationalAverage';
export default {
    props: {
        province: {
            type: Province,
            required: true
        }
    },
    data() {
        return {
            displayComparisonToNationalAverage: false
        }
    },
    created() {
        const val = window.localStorage.getItem(localStorageKey);
        if (val)
        this.displayComparisonToNationalAverage = true;
    },
    components: { ProvinceViewIndicatorsGroup },
    methods: {
        setDisplayComparisonToNationalAverage(event) {
            if (this.displayComparisonToNationalAverage) {
                window.localStorage.setItem(localStorageKey, 'true');
            } else {
                window.localStorage.removeItem(localStorageKey)
            }
        }
    }
}
</script>