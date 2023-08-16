<template>
    <div class="flex flex-col items-center p-4 gap-2 w-full  text-center">
        <a :href="selectedYear.fsr_url[language]"><img :src="selectedYear.fsr_poster_url?.[language]" alt=""
                aria-hidden="true" class="h-32 shadow border border-blue-100" loading="lazy">
        </a>
        <p class="font-semibold leading-snug">
            {{ strings.report_poster_blurb }}
        </p>

        <a :href="selectedYear.fsr_url[language]"
            class="bg-white rounded hover:bg-blue-100 dark:bg-blue-900 font-semibold p-2">{{
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