import { defineStore } from 'pinia'
import Year from './Models/Year';
import blStrings from "./assets/strings.json?json";
import readXlsxFile from 'read-excel-file'
import Region from './Models/Region';
import Indicators from './Models/Indicators';



export default defineStore('fsr', {
    state: () => ({
        selectedRegion: null,
        selectedFsrYear: null,
        years: [],
        language: document.documentElement.lang
    }),
    actions: {
        async instanciateYearFromFile(xlsxBytes) {

            /**
             * Vars
             */
            let vars = await readXlsxFile(xlsxBytes, { sheet: 'VARS' });
            vars = vars.reduce((accumulator, item) => {
                if (item[2]) {
                    accumulator[item[0]] = { en: item[1], fr: item[2] };
                } else {
                    let accumulatorContent = item[1];
                    // Strings can be casted to bool for FSR vars.
                    if (accumulatorContent === "TRUE") accumulatorContent = true;
                    if (accumulatorContent === "FALSE") accumulatorContent = false;
                    accumulator[item[0]] = accumulatorContent
                }
                return accumulator;
            }, {});


            /**
             * Indicators
             */
            let indicators = await readXlsxFile(xlsxBytes, { sheet: 'INDICATORS' });

            let indicatorsNationalAverage = Indicators.initRegionIndicatorsFromRows('nat_avg', indicators);

            let year = new Year({
                ...vars,
                ...indicatorsNationalAverage
            })

            let sustainability = await readXlsxFile(xlsxBytes, { sheet: 'SUSTAINABILITY' });
            let bullets = await readXlsxFile(xlsxBytes, { sheet: 'BULLETS' });
            let charts = await readXlsxFile(xlsxBytes, { sheet: 'CHARTS' });


            year.regions = Region.buildRegionsFromRows(indicators, sustainability, bullets, charts);

            let years = [
                ...this.years.filter(yr => yr.fsr_year != year.fsr_year),
                year
            ];

            this.years = years;
        },

    },

    getters: {

        latestFsrYear(state) {
            return Math.max(0, ...state.years.map(year => year.fsr_year));
        },

        selectedYear(state) {
            return state.years.find(year => year.fsr_year == state.selectedFsrYear);
        },

        strings(state) {
            let loc = {}
            for (const [key, value] of Object.entries(blStrings)) {
                loc[key] = value[state.language]
            }
            return loc;
        }

    }


})