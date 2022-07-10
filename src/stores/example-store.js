import { defineStore } from "pinia";
import { useQuasar } from "quasar";
import { api } from "boot/axios";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    counter: 0,
    nada: "Prueba de state",
    token: "",
    isAuthenticated: false,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    prueba(data) {
      localStorage.setItem("prueba", JSON.stringify(this.nada));
      this.token = data.token;
      localStorage.setItem("token", JSON.stringify(this.token));
      this.isAuthenticated = true;
      this.counter++;
    },

    borrar() {
      localStorage.removeItem("prueba");
      this.token = "";
      localStorage.removeItem("token");
      this.isAuthenticated = false;
      localStorage.removeItem("username");
    },

    init() {
      const token = window.localStorage.getItem("token");
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        window.localStorage.setItem("token", (token));

        api.defaults.headers.common.Authorization =
          "Bearer " + JSON.parse(token);


        // dispatch("getMe", JSON.parse(token));
      } else {
        this.borrar();
      }
      console.log("init");
    },
  },


});
