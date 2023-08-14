<template>
    <div
        class="flex flex-col-reverse lg:flex-col items-center justify-center align-middle gap-4 text-mulberry-800 border-2 border-mulberry-600 p-4 rounded mb-4">

        <p class="prose leading-snug max-w-none">{{ strings.intro }}</p>

        <p class="text-xl font-thin prose">{{ strings.splash_cta }}</p>

        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            class="rotate-90 lg:rotate-0 h-14 w-14 self-end lg:self-auto text-mulberry-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>

    </div>

    <Infographic />
</template>
<script>

import { mapState } from 'pinia'
import store from "../Store.js"
import Infographic from './Infographic/Infographic.vue';

export default {
    computed: {
        ...mapState(store, ['strings']),
    },
    components: { Infographic }
}
</script>