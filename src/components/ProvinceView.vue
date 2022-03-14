<template>

<div class="grid grid-cols-3 divide-x divide-gray-300">
<div class="col-span-2 pr-4">
<h1 class="leading-none font-thin mb-4 ">{{ province.name }}</h1>
<ProvinceViewBullets :province="province"></ProvinceViewBullets>
<ProvinceViewIndicators :province="province"></ProvinceViewIndicators>


</div>
<div class="pl-4 flex flex-col divide-y divide-gray-300">
<figure class="pb-4 ">
    <h2 class="leading-none font-thin mb-4">{{ $root.strings.program_spending }}</h2>
<ProvinceViewProgramSpendingRevenue :province="province"></ProvinceViewProgramSpendingRevenue>
</figure>
<figure class="pt-4">
    <h2 class="leading-none font-thin mb-4">{{ $root.strings.net_debt }}</h2>
<ProvinceViewNetDebt :province="province"></ProvinceViewNetDebt>
</figure>
</div>
</div>
</template>
<script>
import Province from "../Models/Province";
import ProvinceViewBullets from "./ProvinceViewBullets.vue";
import ProvinceViewNetDebt from "./ProvinceViewNetDebt.vue";
import ProvinceViewIndicators from "./ProvinceViewIndicators.vue"
import ProvinceViewProgramSpendingRevenue from "./ProvinceViewProgramSpendingRevenue.vue";

export default {
    props: {
        province: {
            type: Province,
            required: true
        }
    },
    components: { ProvinceViewBullets, ProvinceViewNetDebt, ProvinceViewProgramSpendingRevenue, ProvinceViewIndicators }
}
</script>