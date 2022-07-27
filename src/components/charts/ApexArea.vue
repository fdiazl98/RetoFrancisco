<template>
  <apexchart
    height="300"
    type="area"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script>
import { defineComponent } from "vue";
import { getCssVar } from "quasar";
import { api } from "boot/axios";

export default defineComponent({
  name: "ApexArea",
  data() {
    return {
      options: {
        title: {
          text: "Ingresos y Gastos mensuales",
          align: "left",
        },
        chart: {
          height: 300,
          type: "area",
        },
         dataLabels: {
              enabled: false
            },
        colors: [
          getCssVar("primary"),
          // getCssVar("secondary"),
          getCssVar("negative"),
        ],
        markers: {
          size: 4,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
        },
      },
      series: [
        {
          name: "Ingresos",
          data: [],
        },
        {
          name: "Gastos",
          data: [],
        },
        // {
        //   name: 'series3',
        //   data: [15, 92, 15, 72, 84, 42, 41]
        // }
      ],
    };
  },
  methods: {
    async colum() {
      await api.get("api/Articulos/get").then((response) => {
        this.listado = response.data;
        // console.log("viendo data de prueba : " + JSON.stringify(this.listado));
      });

      let mesesIngresos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let mesesGastos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      // console.log(meses);

      this.listado.forEach((value) => {
        let monthNameLong = new Intl.DateTimeFormat("en-US", {
          // weekday: "long",
          // year: "numeric",
          month: "numeric",
          // day: "numeric",
        }).format(new Date(value.fechacreacion));
        mesesIngresos[monthNameLong - 1] =
          Math.round(
            (mesesIngresos[monthNameLong - 1] +
              value.precioventa +
              Number.EPSILON) *
              100
          ) / 100;
        mesesGastos[monthNameLong - 1] =
          Math.round(
            (mesesGastos[monthNameLong - 1] +
              value.preciocompra +
              Number.EPSILON) *
              100
          ) / 100;

      });
      this.series[0].data = mesesIngresos;
      this.series[1].data = mesesGastos;
      // console.log(meses);

      console.log("hola");
      // this.series[0].data = gastosMensuales;

      // console.log("xaxis" + JSON.stringify(this.options.xaxis));
    },
  },
  created() {
    this.colum();
  },
});
</script>
