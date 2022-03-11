<template>
<li v-html="renderedBullet"></li>
</template>
<script>
import { Remarkable } from 'remarkable';

export default {
    props: {
        bullet: {
            type: String,
            required: true
        }
    },
    computed: {
        renderedBullet() {
            var md = new Remarkable();
            return md.render(this.bullet)
        }
    }
}
</script>