<template>
  <apexchart
    height="300"
    type="line"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script>
import { defineComponent } from "vue";
import { getCssVar } from "quasar";
import { api } from "boot/axios";
export default defineComponent({
  name: "Apexline",
  data() {
    return {
      options: {
        title: {
          text: "Ingresos y gastos por mes (Articulos)",
          align: "left",
        },
        chart: {
          id: "apex-line",
        },
        colors: [
          // getCssVar("primary"),
          getCssVar("secondary"),
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
        //if (!meses.includes(monthNameLong)) meses.push(monthNameLong);

        // this.series[0].data.push(value.precioventa);
      });
      this.series[0].data = mesesIngresos;
      this.series[1].data = mesesGastos;
      // console.log(meses);

      console.log("hola");
      // this.series[0].data = gastosMensuales;

      // console.log("xaxis" + JSON.stringify(this.options.xaxis));
    },
  },
  mounted() {
    this.colum();
  },
});
</script>
