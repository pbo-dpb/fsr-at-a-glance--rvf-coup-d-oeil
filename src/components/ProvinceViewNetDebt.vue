<template>
  <BarChart :chartData="chartData" :options="options" />
</template>

<script >
import { defineComponent, ref  } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import Province from '../Models/Province';

Chart.register(...registerables);

export default defineComponent({
  components: { BarChart },
  props: {
      province: {type: Province, required: true},
  },
  
  computed: {
      options() {
return {
      responsive: true,
      plugins: {
        legend: {
          display:false
        },
        tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += this.$root.strings.__('percentage_of_tooltip_label', {percentage: new Intl.NumberFormat(`${this.$root.strings.language}-CA`, { style: 'percent' }).format(context.parsed.y/100)});
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
          text: this.$root.strings.percentage_of_gdp_axis_label,
        }
      }
      }
    }
      },
      backgroundColors() {
          return this.province.net_debt.labels.map(label=>{
              return label <= this.$root.payload.year ? '#0072AF' : '#19AEFF';
          });
      },
      chartData () {
          return {
        labels: this.province.net_debt.labels,
        datasets: [
         {
            data: this.province.net_debt.values,
            backgroundColor: this.backgroundColors,
          },
        ],
      }
    }
  }
});
</script>