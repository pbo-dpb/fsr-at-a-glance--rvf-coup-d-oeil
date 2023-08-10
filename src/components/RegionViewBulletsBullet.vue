<template>
    <li v-html="renderedBullet"></li>
</template>
<script>
import { Remarkable } from 'remarkable';
import store from "../Store.js"
import { mapState } from 'pinia'

export default {
    props: {
        bullet: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState(store, ['language']),

        renderedBullet() {
            var md = new Remarkable();
            return md.render(this.bullet[this.language])
        }
    }
}
</script>