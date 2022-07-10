<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table title="Treats" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body="props">
          <q-tr>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-show="col.name != 'Edicion'">
                {{ col.value }}
              </div>
              <div v-show="col.name == 'Edicion'">
                <q-btn label="Editar" color="primary" @click="alert"></q-btn>
              </div>
            </q-td>
            <q-td auto-width></q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
const columns = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "center",
    field: "id",
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
    name: "Edicion",
    label: "Edicion",
    align: "center",
    field: "Edicion",
    sortable: true,
  },
];

const rows = [
  {
    id: 1000,
    nombre: "prueba",
    Edicion: "",
  },
  {
    id: 1001,
    nombre: "prueba 2",
    Edicion: "",
  },
  {
    id: 1002,
    nombre: "prueba 3",
    Edicion: "",
  },
  {
    id: 1003,
    nombre: "prueba 4",
    Edicion: "",
  },
  {
    id: 1000,
    nombre: "prueba",
    Edicion: "",
  },
  {
    id: 1001,
    nombre: "prueba 2",
    Edicion: "",
  },
  {
    id: 1002,
    nombre: "prueba 3",
    Edicion: "",
  },
  {
    id: 1003,
    nombre: "prueba 4",
    Edicion: "",
  },
];

export default {
  setup() {
    const $q = useQuasar();

    function alert() {
      $q.dialog({
        title: "Alert",
        message: "Prueba de boton",
      })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    return {
      rows,
      columns,
      alert,
    };
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
