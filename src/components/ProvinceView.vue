<template>
<h1 class="leading-none font-thin ">{{ province.name }}</h1>

<div class="grid grid-cols-1  pb-4 ">
<div class="col-span-2 lg:pr-4">
<ProvinceViewBullets :province="province"></ProvinceViewBullets>

</div>

<div class="flex flex-col gap-4">
<figure>
    <h2 class="leading-none font-thin mb-4">{{ $root.strings.program_spending }}</h2>
<ProvinceViewProgramSpendingRevenue :province="province"></ProvinceViewProgramSpendingRevenue>
</figure>
<figure>
    <h2 class="leading-none font-thin mb-4">{{ $root.strings.net_debt }}</h2>
<ProvinceViewNetDebt :province="province"></ProvinceViewNetDebt>
</figure>
</div>
</div>

<ProvinceViewIndicators :province="province"></ProvinceViewIndicators>

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