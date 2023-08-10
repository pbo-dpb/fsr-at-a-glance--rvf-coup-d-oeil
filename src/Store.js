import { defineStore } from 'pinia'
import Year from './Models/Year';
let loc = {}
import readXlsxFile from 'read-excel-file'
import Region from './Models/Region';
import Indicators from './Models/Indicators';

const language = document.documentElement.lang;


export default defineStore('fsr', {
    state: () => ({
        strings: loc,
        years: []
    }),
    actions: {
        async instanciateYearFromFile(xlsxBytes) {

            /**
             * Vars
             */
            let vars = await readXlsxFile(xlsxBytes, { sheet: 'VARS' });
            vars = vars.reduce((accumulator, item) => {
                accumulator[item[0]] = item[1];
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

        },
    },

    getters: {



    }


})