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
  name: "ApexBar",
  data() {
    return {
      options: {
        title: {
          text: "Gastos por mes",
          align: "left",
        },
        chart: {
          id: "apex-bar",
        },
        colors: [
          getCssVar("primary"),
          getCssVar("secondary"),
          getCssVar("negative"),
        ],
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
        yaxis: {
          title: {
            text: "",
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
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
      await api.get("api/Articulos/get").then((response) => {
        this.listado = response.data;
        // console.log("viendo data de prueba : " + JSON.stringify(this.listado));
      });
      var arr2 = [];
      var gastosMensuales = [];

      let i = 0;
      let gastosAbril = 0;
      let gastosMayo = 0;
      let gastosJunio = 0;
      let gastosJulio = 0;
      let gastosAgosto = 0;
      let gastosEnero = 0;
      let gastosFebrero = 0;
      let gastosMarzo = 0;
      let gastosSeptiembre = 0;
      let gastosOctubre = 0;
      let gastosNoviembre = 0;
      let gastosDiciembre = 0;
      this.listado.forEach((value) => {
        // arr.push(value.id);
        arr2.push(value.codigo);
        // this.options.xaxis.categories[i] = value.id;
        i++;

        let monthNameLong = new Intl.DateTimeFormat("en-US", {
          // weekday: "long",
          // year: "numeric",
          month: "short",
          // day: "numeric",
        }).format(new Date(value.fechacreacion));
        monthNameLong = monthNameLong.toString();
        console.log(monthNameLong);

        if (monthNameLong == "Apr") {
          gastosAbril = gastosAbril + value.preciocompra;
        } else if (monthNameLong == "May") {
          gastosMayo = gastosMayo + value.preciocompra;
        } else if (monthNameLong == "Jun") {
          gastosJunio = gastosJunio + value.preciocompra;
        } else if (monthNameLong == "Jul") {
          gastosJulio = gastosJulio + value.preciocompra;
        } else {
          gastosAgosto = gastosAgosto + value.preciocompra;
        }

        // console.log(arr2);
      });

      gastosMensuales = [
        gastosEnero,
        gastosFebrero,
        gastosMarzo,
        gastosAbril,
        gastosMayo,
        gastosJunio,
        gastosJulio,
        gastosAgosto,
        gastosSeptiembre,
        gastosOctubre,
        gastosNoviembre,
        gastosDiciembre,
      ];

      this.series[0].data = gastosMensuales;

      // console.log("xaxis" + JSON.stringify(this.options.xaxis));
    },
  },
  mounted() {
    this.colum();
  },
});
</script>
