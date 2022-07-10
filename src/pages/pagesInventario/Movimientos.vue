<template>
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
          (ver = false)
      "
    />
    <q-table
      title="Movimientos"
      :rows="listado"
      :columns="columns"
      row-key="name"
      :visible-columns="visibleColumns"

    >
      <template v-slot:top="props">

        <div class="col-2 q-table__title">Movimientos</div>

        <q-space />

        <div v-if="$q.screen.gt.xs" class="col">
          <q-toggle
            v-model="visibleColumns"
            val="fechahora"
            label="Fecha y Hora"
          />
          <q-toggle
            v-model="visibleColumns"
            val="idTipomovimiento"
            label="Id Tipo Movimiento"
          />
          <q-toggle
            v-model="visibleColumns"
            val="observaciones"
            label="Observaciones"
          />
          <q-toggle
            v-model="visibleColumns"
            val="idArticulo"
            label="Id Articulo"
          />
          <q-toggle v-model="visibleColumns" val="cantidad" label="Cantidad" />
          <q-toggle v-model="visibleColumns" val="idBodega" label="Id Bodega" />
          <!-- <q-toggle v-model="visibleColumns" val="estado" label="Estado" /> -->

          <!-- <q-toggle v-model="visibleColumns" val="iron" label="Iron" /> -->
        </div>

        <q-select
          v-else
          v-model="visibleColumns"
          multiple
          borderless
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          style="min-width: 150px"
        />

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>

      <template v-slot:body="props">
            <q-tr @click="clickRow(props.row)">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <div v-show="col.name != 'estado'">
                  {{ col.value }}
                </div>
                <div v-show="col.name == 'estado' && col.value == '1'">
                  <p>Activo</p>
                </div>
                <div v-show="col.name == 'estado' && col.value == '2'">
                  <p>Inactivo</p>
                </div>
              </q-td>
              <q-td auto-width></q-td>
            </q-tr>
          </template>
    </q-table>

    <q-dialog v-model="mostrarModal">
      <q-card>
        <div class="q-pa-md" style="max-width: 600px">
          <h5 style="width: 500px">{{ accion }}</h5>
          <q-form class="q-gutter-md" @submit.prevent="cambio">
            <q-input filled v-model="fila.id" label="Id" :disable="ver" />

            <q-input
              filled
              v-model="fila.fechahora"
              hint="Fecha y hora"
              type="date"
            />

            <q-input
              filled
              v-model="fila.idTipomovimiento"
              label="Id tipo movimiento"
              type="number"
            />

            <q-input
              filled
              v-model="fila.observaciones"
              label="Observaciones"
              type="textarea"
            />

            <q-input
              filled
              v-model="fila.cantidad"
              label="cantidad"
              type="number"
            />

            <q-input
              filled
              v-model="fila.idArticulo"
              label="Id Articulo"
              type="number"
            />
            <q-input
              filled
              v-model="fila.idBodega"
              label="Id Bodega"
              type="number"
            />
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
  </div>
</template>

<script>
import { api } from "boot/axios";
import { ref } from "vue";

const columns = [
  {
    name: "id",
    required: true,
    label: "Id",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "fechahora",
    align: "center",
    label: "Fecha y hora",
    field: "fechahora",
    sortable: true,
  },
  {
    name: "idTipomovimiento",
    label: "Id tipo movimiento",
    field: "idTipomovimiento",
    sortable: true,
    align: "center",
  },
  {
    name: "observaciones",
    label: "Observaciones",
    field: "observaciones",
    sortable: true,
    align: "center",
  },
  {
    name: "idArticulo",
    label: "Id Articulo",
    field: "idArticulo",
    sortable: true,
    align: "center",
  },
  {
    name: "idBodega",
    label: "Id bodega",
    field: "idBodega",
    align: "center",
  },
  {
    name: "cantidad",
    label: "Cantidad",
    field: "cantidad",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    align: "center",
  },
  {
    name: "estado",
    label: "Estado",
    align: "center",
    field: "estado",
    sortable: true,
  },
];

const rows = [];
let condition;

export default {
  setup() {
    return {
      visibleColumns: ref([
        "fechahora",
        "idTipomovimiento",
        "cantidad",
        "idArticulo",
        "observaciones",
        "cantidad",
        "idBodega",
        "estado",
      ]),
      columns,
      rows,
      alert,
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
        id: "",
        idTipomovimiento: "",
        fechahora: "",
        cantidad: "",
        idArticulo: "",
        observaciones: "",
        cantidad: "",
        idBodega: "",
        estado: "",
      },
      mostrarModal: false,
      accion: "",
      ver: false,
    };
  },

  methods: {
    clickRow(row) {
      // showEdit.value = false;
      // console.log(row);
      this.accion = "Actualizar";
      this.ver = true;
      this.mostrarModal = true;
      condition = 1;
      this.fila = {
        id: row.id,
        idTipomovimiento: row.idTipomovimiento,
        fechahora: row.fechahora,
        cantidad: row.cantidad,
        idArticulo: row.idArticulo,
        observaciones: row.observaciones,
        idBodega: row.idBodega,
        estado: row.estado,
      };

      console.log("esto es fila :" + this.fila);
    },

    async submitForm() {
      await api.get("api/Movimiento/get").then((response) => {
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
        this.accion = "Crear";

        this.mostrarModal = true;
        await api.post("api/Movimiento/Crear", this.fila).then((response) => {
          console.log(response);
          this.submitForm();
        });
      } else {
        //  return editar='editar'

        await api
          .post("api/Movimiento/Actualizar", this.fila)
          .then((response) => {
            console.log(response);

            this.fila = {
              idTipomovimiento: "",
              fechahora: "",
              cantidad: "",
              id: "",
              idArticulo: "",
              observaciones: "",
              cantidad: "",
              idBodega: "",
              estado: "",
            };
            this.submitForm();
          });
      }
      this.mostrarModal = false;
      this.condition = "";
    },
  },
  mounted() {
    this.submitForm();
  },
};
</script>
