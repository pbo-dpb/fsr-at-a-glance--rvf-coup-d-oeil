<template>
  <LineChart :chartData="chartData" :options="options" />
</template>

<script >
import { defineComponent, ref  } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import Province from '../Models/Province';

Chart.register(...registerables);

export default defineComponent({
  components: { LineChart },
  props: {
      province: {type: Province, required: true},
  },
  
  computed: {
   
      options() {
return {
      responsive: true,
      radius: 0,
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
      
      chartData () {
          return {
        labels: this.$root.payload.labels,
        datasets: [
         {
            data: this.province.revenue.values,
            borderColor: "#0072AF",
            cubicInterpolationMode: 'monotone',
            segment: {
            borderDash: ctx => {
              if (ctx.p0.parsed.x > this.$root.payload.labels.indexOf(this.$root.payload.year)) return [6,6];
              return undefined; 
            },
        },
          },
          {
            data: this.province.program_spending.values,
            borderColor: "#AD3D00",
            cubicInterpolationMode: 'monotone',
            segment: {
            borderDash: ctx => {
              if (ctx.p0.parsed.x > this.$root.payload.labels.indexOf(this.$root.payload.year)) return [6,6];
              return undefined; 
            },
        },
          },
        ],
      }
    }
  }
});
</script>