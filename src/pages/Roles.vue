<!--
<template>
  <div>
    <p>{{store.nada}}</p>
    <p>{{store.counter}}</p>

  </div>

  <q-btn @click="store.prueba">prueba</q-btn>
</template> -->

<!-- <script>
import { computed } from 'vue'


export default {
  setup () {
    const store = useCounterStore()

    return {
      // you can return the whole store instance to use it in the template
      store
    }
  }
}
</script> -->
<template>
  <q-page> <chartExample /> </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

const chartExample = defineAsyncComponent(() =>
  import("src/components/charts/mychart_example.vue")
);

export default defineComponent({
  name: "Roles",
  components: { chartExample },
});
</script>
