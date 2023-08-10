<template>
    <h1 class="leading-none font-thin ">{{ region.name[language] }}</h1>

    <div class="grid grid-cols-1  pb-4 ">
        <div class="col-span-2 lg:pr-4">
            <RegionViewBullets :region="region"></RegionViewBullets>

        </div>

        <div class="flex flex-col gap-4">
            <figure>
                <h2 class="leading-none font-thin mb-4">{{ strings.program_spending }}</h2>
                <!--<ProvinceViewProgramSpendingRevenue :province="province"></ProvinceViewProgramSpendingRevenue>-->
            </figure>
            <figure>
                <h2 class="leading-none font-thin mb-4">{{ strings.net_debt }}</h2>
                <RegionViewNetDebt :region="region"></RegionViewNetDebt>
            </figure>
        </div>
    </div>

    <RegionViewIndicators :region="region"></RegionViewIndicators>
</template>
<script>
import { mapState } from 'pinia'
import store from "../Store.js"
import Region from "../Models/Region";
import RegionViewBullets from "./RegionViewBullets.vue";
import RegionViewIndicators from "./RegionViewIndicators.vue"

import RegionViewNetDebt from "./RegionViewNetDebt.vue";
/*
import ProvinceViewProgramSpendingRevenue from "./ProvinceViewProgramSpendingRevenue.vue";*/

export default {
    props: {

        region: {
            type: Region,
            required: true
        }
    },
    computed: {
        ...mapState(store, ['language', 'strings']),
    },
    components: {
        RegionViewBullets,
        RegionViewIndicators,
        RegionViewNetDebt,
        /*ProvinceViewProgramSpendingRevenue, 
        */
    }
}
</script>