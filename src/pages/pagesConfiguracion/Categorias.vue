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
        title="Articulos"
        :rows="listado"
        :columns="columns"
        :row-key="name"
      >
        <template v-slot:body="props">
          <q-tr @click="clickRow(props.row)">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-show="col.name != 'foto'">
                {{ col.value }}
              </div>
              <div v-show="col.name == 'foto'">
                <img :src="col.value" alt="" />
              </div>
            </q-td>
            <q-td auto-width></q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="mostrarModal">
      <q-card>
        <div class="q-pa-md" style="max-width: 600px">
          <h5 style="width: 500px">{{ accion }}</h5>
          <q-form class="q-gutter-md" @submit.prevent="CreateRow">
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
            <q-input filled v-model="fila.foto" label="Foto" />
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
    name: "id",
    label: "Id de articulo",
    align: "center",
    field: "id",
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
    name: "foto",
    label: "Foto",
    align: "center",
    field: "foto",
    sortable: true,
  },
];

import { useQuasar } from "quasar";
// import { ref } from "@vue/reactivity";
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
        id: 5,
        descripcion: "",
        foto: "",
        fechacreacion: "",
        fechamodificacion: "",
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
      await api.get("api/Categorias/Get").then((response) => {
        //   // commit('setMe', response.data)
        return (this.listado = response.data);
      });
    },
    async CreateRow() {
      await api
        .post(`api/Categorias/${this.accion}`, this.fila)
        .then((response) => {
          console.log(response);
          this.submitForm();
          this.fila = {
            id: 5,
            descripcion: "",
            foto: "",
            fechacreacion: "",
            fechamodificacion: "",
          };
          this.mostrarModal = false;
        });
    },
    clickAgregar() {
      this.accion = "Crear";
      this.mostrarModal = true;
      this.fila = {
        id: 5,
        descripcion: "",
        foto: "",
        fechacreacion: "",
        fechamodificacion: "",
      };
    },
    clickRow(row) {
      console.log(row);
      this.accion = "Actualizar";
      this.mostrarModal = true;
      this.fila = {
        id: row.id,
        descripcion: row.descripcion,
        fechacreacion: row.fechacreacion,
        fechamodificacion: row.fechamodificacion,
        foto: row.foto,
      };
    },
  },
  mounted() {
    this.submitForm();
  },
};
</script>
<style>
img {
  border-radius: 4px;
  padding: 5px;
  width: 150px;
}
</style>
