<template>
  <Bar :data="chartData" :options="options" class="dark:bg-white dark:p-4 dark:rounded-sm h-96" />
  <Details :label="strings.alt_version_handle" class="mt-2">
    <RegionChartAltTable :datatable="datatable" />
  </Details>
</template>

<script>
import { mapState } from 'pinia'
import store from "../Store.js"
import { defineComponent, ref } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)
import { Chart, registerables } from "chart.js";
import Region from '../Models/Region';
import Localizer from "../Localizer"
import Details from '../components/Details'
import RegionChartAltTable from '../components/RegionChartAltTable'

Chart.register(...registerables);

export default defineComponent({
  components: { Bar, Details, RegionChartAltTable },
  props: {
    region: { type: Region, required: true },
  },

  computed: {
    ...mapState(store, ['language', 'strings', 'selectedYear']),
    options() {
      return {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {

                let localizer = new Localizer(this.strings);
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += localizer.__('percentage_of_tooltip_label', { percentage: new Intl.NumberFormat(`${this.language}-CA`, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(context.parsed.y / 100) });
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: this.strings.percentage_of_gdp_axis_label,
            }
          }
        }
      }
    },
    backgroundColors() {
      return this.region.datasets['net_debt'].range.map(label => {
        return label <= this.selectedYear.fsr_year ? '#002140' : '#a2b8e1';
      });
    },
    chartData() {
      return {
        labels: this.region.datasets['net_debt'].range,
        datasets: [
          {
            data: this.region.datasets['net_debt'].values,
            backgroundColor: this.backgroundColors,
          },
        ],
      }
    },
    datatable() {
      let table = {};
      table[this.strings.year_label] = this.chartData.labels;
      table[this.strings.percentage_of_gdp_axis_label] = this.chartData.datasets[0].data.map(num => num.toLocaleString(this.language, { minimumFractionDigits: 1, maximumFractionDigits: 1 }));

      return table;
    }
  }
});
</script>