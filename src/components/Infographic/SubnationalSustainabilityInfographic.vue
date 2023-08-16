<template>
    <figure class="lg:w-2/3 mx-auto relative @container/map">

        <div class="w-full h-fit" ref="infographic">
        </div>
        <div v-for="region in regions" style="
            width: 42px; 
            position: absolute;
            background: linear-gradient(0, rgba(219, 234, 254,0.7) 0%, rgba(239, 246, 255,0.9) 66%);
        " :style="{
            top: regionCoords[region.id].y,
            left: regionCoords[region.id].x
        }"
            class="shadow-xl ring-offset-2 hover:ring-2 ring-blue-800 cursor-pointer flex flex-col gap-1 items-center p-1 scale-75 @xl/map:scale-100"
            @mouseover="highlightRegion(region)" @mouseleave="highlightRegion(null)" @click="selectedRegion = region">

            <div class="overflow-hidden whitespace-nowrap text-lg font-semibold text-center text-blue-800">
                {{ region.id
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
            sustainabilityGlyphTrue,
            resizeObserver: null,
            mapWidth: 0,
            mapHeight: 0
        }
    },
    computed: {
        ...mapWritableState(store, ['selectedRegion']),
        ...mapState(store, ['language', 'strings', 'selectedYear']),
        regions() {
            if (!this.selectedYear) return []
            return this.selectedYear.regions;
        },
        regionCoords() {
            return {
                ab: this.coordsForRegionId('ab'),
                bc: this.coordsForRegionId('bc'),
                mb: this.coordsForRegionId('mb'),
                nb: this.coordsForRegionId('nb'),
                nl: this.coordsForRegionId('nl'),
                ns: this.coordsForRegionId('ns'),
                on: this.coordsForRegionId('on'),
                pe: this.coordsForRegionId('pe'),
                qc: this.coordsForRegionId('qc'),
                sk: this.coordsForRegionId('sk'),
                territories: this.coordsForRegionId('territories'),
            }
        }
    },
    beforeDestroy() {
        this.resizeObserver.unobserve(this.$refs.infographic)
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
            if (!this.$refs.infographic) return null
            this.mapWidth = this.$refs.infographic.offsetWidth;
            this.mapHeight = this.$refs.infographic.offsetHeight;
            const infoBase = this.$refs.infographic;

            infoBase.innerHTML = baseLayer;
            if (this.highlightedRegion) {
                this.drawRegionHighlight();
            }
        },
        highlightRegion(region) {
            this.highlightedRegion = region?.id
        },
        coordsForRegionId(regionId) {
            if (!this.$refs.infographic) return { x: 0, y: 0 }
            let iWidth = this.mapWidth;
            let iHeight = this.mapHeight;
            let x;
            let y;
            switch (regionId) {
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
        this.resizeObserver = new ResizeObserver(this.redraw)
        this.resizeObserver.observe(this.$refs.infographic)
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