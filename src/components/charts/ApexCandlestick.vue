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
          text: "Precio de compra y venta articulos",
          align: "left",
        },
        chart: {
          id: "apex-column",
        },
        colors: [
          getCssVar("primary"),
          getCssVar("secondary"),
          getCssVar("negative"),
        ],
        xaxis: {
          categories: [],
           title: {
            text: "Codigo",
          },
        },

        yaxis: {
          title: {
            text: "Precios",
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },

        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return ;
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
      },
      series: [
        {
          name: "Precio de compra",
          data: [],
        },
        { name: "Precio de venta", data: [] },
      ],
    };
  },
  methods: {
    async colum() {
      await api.get("api/Articulos/get").then((response) => {
        this.listado = response.data;
        // console.log("viendo data de prueba : " + JSON.stringify(this.listado));
      });
      var arr2 = [];
       var arr3 = [];

      let i = 0;
      this.listado.forEach((value) => {
        // arr.push(value.id);
        arr2.push(value.preciocompra);
        arr3.push(value.precioventa);
        this.options.xaxis.categories[i] = value.codigo;
        i++;
      });

      this.series[0].data = arr2;
      this.series[1].data = arr3;
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
