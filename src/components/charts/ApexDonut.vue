<template>
  <apexchart
    height="300"
    type="pie"
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
let estadoV = [];

export default defineComponent({
  name: "Apexline",
  data() {
    return {
      listado: [],
      options: {
        labels: [ "Activos","Inactivos",],
        title: {
          text: "Estado Movimientos",
          align: "left",
        },
        chart: {
          id: "apex-donut",
        },
        colors: [
          // getCssVar("primary"),
          getCssVar("secondary"),
          getCssVar("negative"),
          // getCssVar("accent"),
        ],
        markers: {
          size: 4,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: [],
        },
      },
      series: [],
    };
  },

  methods: {
    async dona() {
      const store = useCounterStore();
      await api.get("api/Movimiento/get").then((response) => {
        // console.log(
        //   "0========================prueba============================"
        // );

        this.listado = response.data;
        // console.log("viendo data de prueba : " + JSON.stringify(this.listado));
      });

      var arr = [];
      var arr2 = [];
      let neg = 0;
      let pos = 0;
      // var estadoV = [];

      this.listado.forEach((value, index) => {
        arr.push(value.id);
        arr2.push(value.cantidad);

        if (value.estado == 1) {
          pos++;
        } else {
          neg++;
        }

        // console.log(value);
      });
      estadoV=[pos, neg];
      console.log(estadoV);
      // console.log(this.series);
      this.series = estadoV;

      // rows=lista
    },
  },
  created() {
    this.dona();
  },
});
</script>
