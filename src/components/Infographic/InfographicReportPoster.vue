<template>
    <div class="flex flex-col items-center p-4 gap-2 w-full text-white bg-mulberry-600 rounded text-center">
        <img :src="selectedYear.fsr_poster_url?.[language]" alt="" aria-hidden="true" class="h-32 shadow" loading="lazy">
        <p class="font-semibold leading-snug">
            {{ strings.report_poster_blurb }}
        </p>

        <a :href="selectedYear.fsr_url" class="bg-white rounded hover:bg-blue-100 font-semibold p-2">{{
            strings.report_poster_cta }}</a>

    </div>
</template>
<script>
import { mapState } from 'pinia'
import store from "../../Store.js"

export default {
    computed: {
        ...mapState(store, ['language', 'strings', 'selectedYear'])

    }
}

</script>