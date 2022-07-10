<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useCounterStore } from "stores/example-store";

export default defineComponent({
  name: "App",

  beforeCreate() {
    const store = useCounterStore();

    store.init();
    const token = localStorage.getItem("token");
    console.log(token)
    // if (token) {
    //   api.defaults.headers.common.Authorization = "Bearer " + token;
    // } else {
    //   api.defaults.headers.common.Authorization = "";
    // }
  },
});
</script>
