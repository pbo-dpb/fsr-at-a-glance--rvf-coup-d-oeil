<template>
    <li v-html="renderedBullet" ref="bullet"></li>
</template>
<script>
import store from "../Store.js"
import { mapState } from 'pinia'
import { marked } from 'marked';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { h } from "vue";

export default {
    data() {
        return {
            tooltips: []
        }
    },

    props: {
        bullet: {
            type: Object,
            required: true
        }
    },

    computed: {
        ...mapState(store, ['language']),

        renderedBullet() {
            return marked.parse(this.bullet[this.language] ? this.bullet[this.language] : '')
        }
    },
    watch: {
        "renderedBullet": function () {
            this.parseTooltips();
        }
    },
    methods: {
        parseTooltips() {
            this.$nextTick(() => {
                this.$refs.bullet.querySelectorAll('.__tooltip').forEach((tooltipEl) => {

                    let describedByEl = this.$refs.bullet.querySelector(`#${tooltipEl.getAttribute("aria-describedby")}`);
                    if (!describedByEl) return;
                    tippy(tooltipEl, {
                        content: describedByEl.innerText,
                    });

                })
            })
        }
    },
    created() {
        /**
         * Tooltips are supported with the following syntax:
         * [text anchor for tooltip](## "Content of the tooltip")
         */
        marked.use({
            renderer: {
                link(href, title, text) {
                    if (href === null) {
                        return text;
                    }

                    if (href == "##" && title) {

                        let tooltipId = `tip_${(Math.random() + 1).toString(36).substring(2)}`;
                        let out = `<span tabindex="0" class='__tooltip underline decoration-dashed decoration-blush underline-offset-2 decoration-2 cursor-pointer' id="${tooltipId}"
                        aria-describedby="${tooltipId}-tippy"
                        >${text}</span><span id="${tooltipId}-tippy" class="sr-only" data-tippy-root>${title}</span>`;



                        return out;

                    }

                    let out = '<a href="' + href + '"';
                    if (title) {
                        out += ' title="' + title + '"';
                    }
                    out += '>' + text + '</a>';
                    return out;
                }
            }
        });

    },
    mounted() {
        this.parseTooltips();

    }
}
</script>