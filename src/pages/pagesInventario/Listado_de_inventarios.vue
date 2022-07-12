<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-btn
        label="Agregar"
        type="submit"
        color="primary"
        margin-top="10px"
        @click="
          (mostrarModal = true),
            (condition = -1),
            (accion = 'Agregar'),
            (verid = false),
            (fila = {
              fechaultimomovimiento: null,
            })
        "
      />
      <q-table
        class="gutter-md"
        title="Listado inventarios"
        dense
        :rows="listado"
        :columns="columns"
        row-key="name"
      >
      </q-table>
    </div>

    <q-dialog v-model="mostrarModal">
      <q-card>
        <div class="q-pa-md" style="max-width: 600px">
          <h5 style="width: 500px">{{ accion }}</h5>
          <q-form class="q-gutter-md" @submit.prevent="cambio">
            <q-input
              filled
              v-model="fila.idArticulo"
              label="Id articulo"
              type="number"
            />

            <q-input
              filled
              v-model="fila.idBodega"
              label="Id bodega"
              type="number"
            />

            <q-input filled v-model="fila.saldo" label="Saldo" type="number" />

            <q-input
              v-show="false"
              filled
              v-model="fila.fechaultimomovimiento"
              hint="Fecha ultimo movimiento"
              type="date"
            />

            <div>
              <q-btn :label="accion" color="primary" type="submit" />
              <!-- <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
                @click="mostrarModal = false"
              /> -->
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
    <!-- <q-btn label="prueba" @click="mostrarModal = true" /> -->
  </q-page>
</template>

<script>
let lista;
let condition;

const columns = [
  {
    name: "idArticulo",
    required: true,
    label: "Id articulo",
    align: "center",
    field: "idArticulo",
    sortable: true,
  },
  {
    name: "idBodega",
    label: "Id bodega",
    align: "center",
    field: "idBodega",
    sortable: true,
  },
  {
    name: "saldo",
    label: "Saldo",
    align: "center",
    field: "saldo",
    sortable: true,
  },
  {
    name: "fechaultimomovimiento",
    label: "Fecha Ultimo Movimiento",
    align: "center",
    field: "fechaultimomovimiento",
    sortable: true,
  },
];

let rows = [];

import { useQuasar } from "quasar";
import { ref } from "vue";
// import { mapActions } from "vuex";
import { api } from "boot/axios";
let $q = useQuasar();

export default {
  setup() {
    // showEdit.value = false;

    // const $q = useQuasar();
    return {
      columns,
      rows,
      date: "",
      search: "",
    };
  },

  data() {
    return {
      listado: [],

      fila: {
        idArticulo: "",
        idBodega: "",
        saldo: "",
        fechaultimomovimiento: "",
      },
      mostrarModal: false,
      accion: "",
    };
  },

  methods: {
    clickRow(evt, row, index) {
      // showEdit.value = false;
      // console.log(row);
      this.accion = "Actualizar";

      this.mostrarModal = true;
      condition = index;
      this.fila = {
        idArticulo: row.idArticulo,
        idBodega: row.idBodega,
        saldo: row.saldo,
        fechaultimomovimiento: row.fechaultimomovimiento,
      };
      console.log("esto es fila :" + this.fila.idArticulo);
    },

    async submitForm() {
      await api.get("/api/Inventario/Get").then((response) => {
        // console.log(
        //   "0========================prueba============================"
        // );
        // console.log(response.data);
        return (this.listado = response.data);
      });

      // rows=lista
    },

    async cambio() {
      console.log(
        "===================== " + this.condition + " ====================="
      );
      if (this.condition == -1) {
        // return editar='crear'
        this.accion = "Agregar";

        this.mostrarModal = true;

        await api.post("api/Inventario/Crear", this.fila).then((response) => {
          console.log(response);
          this.submitForm();

          if (response.data.codigomensaje == "223") {
            $q.notify({
              type: "negative",
              message: "Error, el registro ya existe",
            });
          } else {
            $q.notify({
              type: "positive",
              message: "Registro creado!",
            });
          }
        });
        this.fila = {
          idArticulo: "",
          idBodega: "",
          saldo: "",
          fechaultimomovimiento: "",
        };
      } else {
        //  return editar='editar'

        await api
          .post("api/Inventario/Actualizar", this.fila)
          .then((response) => {
            // console.log(response);

            this.fila = {
              idArticulo: "",
              idBodega: "",
              saldo: "",
              fechaultimomovimiento: "",
            };
            this.submitForm();
          });
      }
      this.mostrarModal = false;
      this.condition = "";
    },
  },
  mounted() {
    $q = useQuasar();
    this.submitForm();
  },
};
</script>
