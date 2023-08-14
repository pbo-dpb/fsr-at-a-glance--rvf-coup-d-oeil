<template>
    <figure class="lg:w-2/3 mx-auto relative @container/map">
        <div class="" ref="infographic">
        </div>
        <div v-for="region in regions" style="
            width: 42px; 
            position: absolute;
            background: linear-gradient(0, rgba(219, 234, 254,0.7) 0%, rgba(239, 246, 255,0.9) 66%);
        " :style="{
            top: coordsForRegion(region).y,
            left: coordsForRegion(region).x
        }"
            class="shadow-xl ring-offset-2 hover:ring-2 ring-blue-800 cursor-pointer flex flex-col gap-1 items-center p-1 scale-75 @xl/map:scale-100"
            @mouseover="highlightRegion(region)" @mouseleave="highlightRegion(null)" @click="selectedRegion = region">

            <div class="overflow-hidden whitespace-nowrap text-lg font-semibold text-center text-blue-800">{{ region.id
                ===
                'territories'
                ? 'Terr.' :
                region.id.toUpperCase() }}</div>
            <img v-if="region.is_sustainable" :src="sustainabilityGlyphTrue" class="w-6 h-6">
            <img v-if="region.is_sustainable === false" :src="sustainabilityGlyphFalse" class="w-6 h-6">
            <img v-if="region.is_sustainable === null" :src="sustainabilityGlyphNull" class="w-6 h-6">
        </div>
    </figure>
</template>
<script>
import sustainabilityGlyphFalse from "../../assets/glyphs/sustainability-glyph-false.svg?url"
import sustainabilityGlyphNull from "../../assets/glyphs/sustainability-glyph-null.svg?url"
import sustainabilityGlyphTrue from "../../assets/glyphs/sustainability-glyph-true.svg?url"
import baseLayer from "../../assets/canada-base-map.svg?raw"
import { mapWritableState, mapState } from 'pinia'
import store from "../../Store.js"

export default {
    data() {
        return {
            highlightedRegion: null,
            sustainabilityGlyphFalse,
            sustainabilityGlyphNull,
            sustainabilityGlyphTrue
        }
    },
    computed: {
        ...mapWritableState(store, ['selectedRegion']),
        ...mapState(store, ['language', 'strings', 'selectedYear']),
        regions() {
            if (!this.selectedYear) return []
            return this.selectedYear.regions;
        }
    },
    methods: {
        applyHighlightToSvgDomEl(domEl) {
            if (!domEl) return;
            domEl.querySelectorAll("path, polygon").forEach(s => this.applyHighlightToSvgDomEl(s))
            domEl.style.fill = "#dbeafe";
            domEl.setAttribute("stroke", "#93c5fd")
        },
        drawRegionHighlight() {
            const infoBase = this.$refs.infographic;
            let highlightedGs = [];
            if (this.highlightedRegion && this.highlightedRegion === 'territories') {
                highlightedGs = [
                    `#CA_YT`,
                    `#CA_NT`,
                    `#CA_NU`
                ];
            } else if (this.highlightedRegion) {
                highlightedGs = [`#CA_${this.highlightedRegion.toUpperCase()}`]
            }

            highlightedGs.forEach(highlightedG => {
                let regionG = infoBase.querySelector(highlightedG);

                if (regionG)
                    this.applyHighlightToSvgDomEl(regionG)

            })
        },
        redraw() {
            const infoBase = this.$refs.infographic;

            infoBase.innerHTML = baseLayer;
            if (this.highlightedRegion) {
                this.drawRegionHighlight();
            }
        },
        highlightRegion(region) {
            this.highlightedRegion = region?.id
        },
        coordsForRegion(region) {
            if (!this.$refs.infographic) return { x: 0, y: 0 }
            let iWidth = this.$refs.infographic.offsetWidth;
            let iHeight = this.$refs.infographic.offsetHeight;
            let x;
            let y;
            switch (region.id) {
                case "ab":
                    x = iWidth * 0.175
                    y = iHeight * 0.6

                    break;
                case "bc":
                    x = iWidth * 0.065
                    y = iHeight * 0.55
                    break;
                case "mb":
                    x = iWidth * 0.35
                    y = iHeight * 0.70

                    break;
                case "nb":
                    x = iWidth * 0.77
                    y = iHeight * 0.87
                    break;
                case "nl":
                    x = iWidth * 0.90
                    y = iHeight * 0.57
                    break;
                case "ns":
                    x = iWidth * 0.90
                    y = iHeight * 0.87
                    break;
                case "on":
                    x = iWidth * 0.535
                    y = iHeight * 0.77
                    break;
                case "pe":
                    x = iWidth * 0.90
                    y = iHeight * (iHeight < 600 ? 0.715 : 0.75)
                    break;
                case "qc":
                    x = iWidth * 0.69
                    y = iHeight * 0.70
                    break;
                case "sk":
                    x = iWidth * 0.27
                    y = iHeight * 0.65
                    break;
                case "territories":
                    x = iWidth * 0.30
                    y = iHeight * 0.35
                    break;
                default:
                    throw "Invalid province"
            }
            return {
                x: `${x}px`,
                y: `${y}px`
            }
        }
    },
    mounted() {
        this.redraw();
    },

    watch: {
        highlightedRegion: function () {
            this.redraw();
        },
        regions() {
            this.redraw();
        }
    }


}
</script>