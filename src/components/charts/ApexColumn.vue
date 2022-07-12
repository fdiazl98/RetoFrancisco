<template>
  <apexchart
    height="300"
    type="bar"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script>
import { defineComponent } from "vue";
import { getCssVar } from "quasar";
import { useCounterStore } from "stores/example-store";
import { api } from "boot/axios";

const store = useCounterStore();

export default defineComponent({
  name: "ApexColumn",
  data() {
    return {
      listado: [],
      options: {
        title: {
          text: "Cantidad x id (Movimientos)",
          align: "left",
        },
        chart: {
          id: "apex-column",
        },
        colors: [
          getCssVar("accent"),
          getCssVar("secondary"),
          getCssVar("negative"),
        ],
        xaxis: {
          categories: [],
        },
        yaxis: {
          title: {
            text: "Cantidad",
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
      },
      series: [
        {
          name: "series-1",
          data: [],
        },
      ],
    };
  },
  methods: {
    async colum() {
      await api.get("api/Movimiento/get").then((response) => {
        this.listado = response.data;
        // console.log("viendo data de prueba : " + JSON.stringify(this.listado));
      });
      var arr2 = [];

      let i = 0;
      this.listado.forEach((value) => {
        // arr.push(value.id);
        arr2.push(value.cantidad);
        this.options.xaxis.categories[i] = value.id;
        i++;
      });

      this.series[0].data = arr2;
      // console.log(this.options.xaxis.categories);
      // console.log(this.series[0].data);
      // // console.log(JSON.stringify(this.series));
      // console.log("xaxis" + JSON.stringify(this.options.xaxis));
    },
  },
  mounted() {
    this.colum();
  },
});
</script>
