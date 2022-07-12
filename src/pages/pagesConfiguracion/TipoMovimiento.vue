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
        title="Tipo Movimientos"
        :rows="listado"
        :columns="columns"
        :row-key="name"
      >
        <template v-slot:body="props">
          <q-tr @click="clickRow(props.row)">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div
                v-show="col.name != 'foto'"
                v-if="col.name == 'estado' && col.value == '1'"
              >
                 <q-badge color="green"> Activo </q-badge>
              </div>
              <div
                v-show="col.name != 'foto'"
                v-if="col.name == 'estado' && col.value == '2'"
              >
                 <q-badge color="red"> Inactivo </q-badge>
              </div>
              <div v-show="col.name != 'foto'" v-if="col.name != 'estado'">
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
            <q-input
              v-show="showId"
              :disable="disable"
              filled
              v-model="fila.id"
              label="Id"
            />
            <q-input filled v-model="fila.codigo" label="Codigo" />
            <q-input filled v-model="fila.descripcion" label="Descripcion" />
            <q-input
              v-show="false"
              filled
              v-model="fila.fechacreacion"
              hint="Fecha de creacion"
              type="date"
            />
            <q-input
              v-show="false"
              filled
              v-model="fila.fechamodificacion"
              type="date"
              hint="Fecha de modificacion"
            />
            <q-input filled v-model="fila.factor" label="Factor" />
            <q-select
              filled
              v-model="fila.estado"
              :options="options"
              label="Estado"
              map-options
              emit-value
            />

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
  {
    name: "estado",
    label: "Estado",
    align: "center",
    field: "estado",
    sortable: true,
  },
];
import { useQuasar } from "quasar";
// import { ref } from "@vue/reactivity";
import { api } from "boot/axios";
// import { mapActions } from "vuex";
let $q;
export default {
  setup() {
    // const lista = ref(null);
    // const $q = useQuasar();
    return {
      columns,
      date: "",
      search: "",
      options: [
        {
          label: "Activo",
          value: 1,
        },
        {
          label: "Inactivo",
          value: 2,
        },
      ],
      showId: true,
      disable: true,
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
        estado: "",
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
          if (response.data.codigomensaje == "230") {
            $q.notify({
              type: "negative",
              message:
                "El código para el tipo de movimiento ingresado, ya existe.",
            });
          } else {
            $q.notify({
              type: "positive",
              message: `Éxito en ${this.accion} registro`,
            });
          }
          this.submitForm();
          this.fila = {
            codigo: "",
            descripcion: "",
            fechacreacion: "",
            fechamodificacion: "",
            factor: "",
            id: "",
            estado: "",
          };
          this.mostrarModal = false;
        });
    },
    clickAgregar() {
      this.showId = false;
      this.disable = true;
      this.accion = "Crear";
      this.mostrarModal = true;
      this.fila = {
        id: 0,
        codigo: "",
        descripcion: "",
        fechacreacion: null,
        fechamodificacion: null,
        factor: "",
        estado: "",
      };
    },
    clickRow(row) {
      this.showId = true;
      this.disable = true;
      this.accion = "Actualizar";
      this.mostrarModal = true;
      this.fila = {
        codigo: row.codigo,
        descripcion: row.descripcion,
        fechacreacion: row.fechacreacion,
        fechamodificacion: null,
        factor: row.factor,
        id: row.id,
        estado: row.estado,
      };
    },
  },
  mounted() {
    $q = useQuasar();
    this.submitForm();
  },
};
</script>
