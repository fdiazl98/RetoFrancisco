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
            (accion = 'Crear'),
            (ver = false),
            (fila = {
              fechacreacion: null,
              fechamodificacion: null,
              ultimologin: null,
            })
        "
      />
      <q-table
        class="gutter-md"
        title="Usuarios"
        dense
        :rows="listado"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr @click="clickRow(props.row)">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-show="col.name != 'estado'">
                {{ col.value }}
              </div>
              <div v-show="col.name == 'estado' && col.value == '1'">
                <q-badge color="green"> Activo </q-badge>
              </div>
              <div v-show="col.name == 'estado' && col.value == '2'">
                <q-badge color="red"> Inactivo </q-badge>
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
          <q-form class="q-gutter-md" @submit.prevent="cambio">
            <q-input
              filled
              v-model="fila.username"
              label="Username"
              :disable="ver"
            />
            <!-- <q-input
              filled
              v-model="fila.password"
              label="Password"
              type="password"
            /> -->

            <q-input
              v-model="fila.password"
              filled
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <q-input
              filled
              v-model="fila.nombre"
              label="Nombre"
              type="string"
            />
            <q-input
              filled
              v-model="fila.ultimologin"
              hint="Ultimo Login"
              type="date"
              v-show="false"
            />
            <q-select
              filled
              v-model="fila.estado"
              :options="options"
              label="Estado"
              map-options
              emit-value
            />
            <q-input
              filled
              v-model="fila.fechacreacion"
              hint="Fecha Creacion"
              type="date"
              v-show="false"
            />
            <q-input
              filled
              v-model="fila.fechamodificacion"
              hint="Fecha Modificacion"
              type="date"
              v-show="false"
            />

            <div>
              <q-btn :label="accion" color="primary" type="submit" />
              <!-- <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"

                /> -->
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { ref } from "vue";
let $q = useQuasar();
let condition;
const columns = [
  {
    name: "username",
    required: true,
    label: "Usarname",
    align: "center",
    field: "username",
    sortable: true,
  },
  {
    name: "password",
    label: "Password",
    align: "center",
    field: "password",
    sortable: true,
  },
  {
    name: "nombre",
    label: "Nombre",
    align: "center",
    field: "nombre",
    sortable: true,
  },
  {
    name: "ultimologin",
    label: "Ultimo Login",
    align: "center",
    field: "ultimologin",
    sortable: true,
  },
  {
    name: "estado",
    label: "Estado",
    align: "center",
    field: "estado",
    sortable: true,
  },
  {
    name: "fechacreacion",
    label: "Fecha Creacion",
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
];

const rows = [
  {
    username: "luis 43t",
    password: "prueba 2",
    ultimoLogin: "01-04-2022",
    estado: "Activo",
    fechaCreacion: "09-01-2021",
    fechaModificacion: "12-12-2021",
  },
  {
    username: "luis 3r",
    password: "prueba 2",
    ultimoLogin: "06-04-2022",
    estado: "Inactivo",
    fechaCreacion: "09-01-2021",
    fechaModificacion: "12-12-2021",
  },
  {
    username: "luis t4",
    password: "prueba 2",
    ultimoLogin: "07-04-2022",
    estado: "Activo",
    fechaCreacion: "09-01-2021",
    fechaModificacion: "12-12-2021",
  },
  {
    username: "luis 34",
    password: "prueba 2",
    ultimoLogin: "08-04-2022",
    estado: "Activo",
    fechaCreacion: "09-01-2021",
    fechaModificacion: "12-12-2021",
  },
  {
    username: "luis 43",
    password: "prueba 2",
    ultimoLogin: "09-04-2022",
    estado: "Inactivo",
    fechaCreacion: "09-01-2021",
    fechaModificacion: "12-12-2021",
  },
  {
    username: "luis 4",
    password: "prueba 2",
    ultimoLogin: "10-04-2022",
    estado: "Inactivo",
    fechaCreacion: "09-01-2021",
    fechaModificacion: "12-12-2021",
  },
];

export default {
  setup() {
    return {
      isPwd: ref(true),

      columns,
      rows,
      date: "",
      search: "",
      model: ref(null),
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
    };
  },

  data() {
    return {
      listado: [],

      fila: {
        username: "",
        password: "",
        nombre: "",
        ultimologin: "",
        estado: "",
        fechacreacion: "",
        fechamodificacion: "",
      },
      mostrarModal: false,
      accion: "",
      condition,
      ver: false,
    };
  },

  methods: {
    clickRow(row) {
      this.accion = "Actualizar";
      this.ver = true;
      this.mostrarModal = true;
      condition = 1;
      this.fila = {
        username: row.username,
        password: row.password,
        nombre: row.nombre,
        ultimologin: null,
        estado: row.estado,
        fechacreacion: row.fechacreacion,
        fechamodificacion: null,
      };
    },

    async submitForm() {
      await api.get("api/Usuarios/Get").then((response) => {
        return (this.listado = response.data);
      });
    },

    async cambio() {
      console.log(
        "===================== " + condition + " ====================="
      );
      if (this.condition == -1) {
        // return editar='crear'
        this.accion = "Crear";

        this.mostrarModal = true;
        await api.post("api/Usuarios/Crear", this.fila).then((response) => {
          console.log(response);
          this.submitForm();
        });
        this.fila = {
          username: "",
          password: "",
          nombre: "",
          ultimologin: "",
          estado: "",
          fechacreacion: "",
          fechamodificacion: "",
        };
      } else {
        //  return editar='editar'

        await api
          .post("api/Usuarios/Actualizar", this.fila)
          .then((response) => {
            console.log(response);

            this.fila = {
              username: "",
              password: "",
              nombre: "",
              ultimologin: "",
              estado: "",
              fechacreacion: "",
              fechamodificacion: "",
            };
            this.submitForm();
                  this.submitForm();
           if (response.data.codigomensaje == "223") {
            $q.notify({
              type: "negative",
              message: "Error",
            });
          } else {
            $q.notify({
              type: "positive",
              message: "Registro actualizado correctamente!",
            });
          }
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
