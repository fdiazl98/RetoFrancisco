<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="q-gutter-md" style="max-width: 300px"></div>
      <q-btn
        label="Agregar"
        type="submit"
        color="primary"
        margin-top="10px"
        @click="clickAgregar"
      />
    </div>

    <div class="q-pa-md">
      <q-table
        class="gutter-md"
        title="Tipo Movimientos"
        dense
        :rows="listado"
        :columns="columns"
        row-key="name"
        @row-click="clickRow"
      >
      </q-table>
    </div>

    <q-dialog v-model="mostrarModal">
      <q-card>
        <div class="q-pa-md" style="max-width: 600px">
          <h5 style="width: 500px">{{ accion }}</h5>
          <q-form class="q-gutter-md" @submit.prevent="CreateRow">
            <q-input filled v-model="fila.codigo" label="Codigo" />
            <q-input filled v-model="fila.descripcion" label="Descripcion" />
            <q-input
              filled
              v-model="fila.fechacreacion"
              hint="Fecha de creacion"
              type="date"
            />
            <q-input
              filled
              v-model="fila.fechamodificacion"
              type="date"
              hint="Fecha de modificacion"
            />
            <q-input filled v-model="fila.factor" label="Factor" />
            <q-input filled v-model="fila.id" label="Id" />

            <div>
              <q-btn :label="accion" color="primary" type="submit" />
              <q-btn
                label="Salir"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
                @click="mostrarModal = false"
              />
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
const columns = [
  {
    name: "codigo",
    required: true,
    label: "codigo articulo",
    align: "center",
    field: "codigo",
    sortable: true,
  },
  {
    name: "descripcion",
    label: "Descripcion",
    align: "center",
    field: "descripcion",
    sortable: true,
  },
  {
    name: "fechacreacion",
    label: "Fecha de Creacion",
    align: "center",
    field: "fechacreacion",
    sortable: true,
  },
  {
    name: "fechamodificacion",
    label: "Fecha Modificacion",
    align: "center",
    field: "fechamodificacion",
    sortable: true,
  },
  {
    name: "factor",
    label: "Factor",
    align: "center",
    field: "factor",
    sortable: true,
  },
  {
    name: "id",
    label: "Id",
    align: "center",
    field: "id",
    sortable: true,
  },
];

import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";
// import { mapActions } from "vuex";

export default {
  setup() {
    // const lista = ref(null);
    // const $q = useQuasar();
    return {
      columns,
      date: "",
      search: "",
    };
  },
  data() {
    return {
      // token: window.localStorage.getItem("token"),
      listado: [],
      fila: {
        codigo: "",
        descripcion: "",
        fechacreacion: "",
        fechamodificacion: "",
        factor: "",
        id: "",
      },
      accion: "",
      mostrarModal: false,
    };
  },
  methods: {
    // ...mapActions("auth", ["getData"]),
    async submitForm() {
      // this.listado = await this.getData(this.token);

      // const toPath = this.$route.query.to || "/admin";
      // this.$router.push(toPath);
      await api.get("api/TipoMovimiento/Get").then((response) => {
        //   // commit('setMe', response.data)
        return (this.listado = response.data);
      });
    },
    async CreateRow() {
      await api
        .post(`api/TipoMovimiento/${this.accion}`, this.fila)
        .then((response) => {
          console.log(response);
          this.submitForm();
          this.fila = {
            codigo: "",
            descripcion: "",
            fechacreacion: "",
            fechamodificacion: "",
            factor: "",
            id: "",
          };
          this.mostrarModal = false;
        });
    },
    clickAgregar() {
      this.accion = "Crear";
      this.mostrarModal = true;
      this.fila = {
        codigo: "",
        descripcion: "",
        fechacreacion: "",
        fechamodificacion: "",
        factor: "",
        id: "",
      };
    },
    clickRow(evt, row, index) {
      this.accion = "Actualizar";
      this.mostrarModal = true;
      this.fila = {
        codigo: row.codigo,
        descripcion: row.descripcion,
        fechacreacion: row.fechacreacion,
        fechamodificacion: row.fechamodificacion,
        factor: row.factor,
        id: row.id,
      };
    },
  },
  mounted() {
    this.submitForm();
  },
};
</script>
