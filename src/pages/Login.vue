<template>
  <img src="~assets/wave.jpg" class="wave" alt="login-wave" />
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <!-- <img src="~assets/login.jpg" class="responsive" alt="login-image" /> -->
      <h2
        style="
          align-content: center;
          color: white;
          font-size: 25px;
          font-weight: bold;
          text-align: justify;
        "
      ></h2>
    </div>
    <div
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
      }"
      class="col-12 col-md-6 flex content-center"
    >
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }"
      >
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="~assets/descarga.jpg" alt="avatar" />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">
                Login
              </h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="submitForm">
            <q-input label="Username" v-model="login.username"> </q-input>
            <!-- <q-input label="Password" v-model="login.password"> </q-input> -->

            <q-input
              v-model="login.password"
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

            <div>
              <q-btn
                class="full-width"
                color="primary"
                label="Login"
                type="submit"
                rounded
              ></q-btn>
              <div class="text-center q-mt-sm q-gutter-lg">
                <router-link class="text-black" to="/"
                  >Olvidaste la contraseña?</router-link
                >
                <router-link class="text-black" to="/login"
                  >Crear cuenta</router-link
                >
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { useCounterStore } from "stores/example-store";
import { api } from "boot/axios";
import { ref } from "vue";

// import { mapActions } from "vuex";
let $q = useQuasar();
const store = useCounterStore();
export default {
  name: "Login",
  data() {
    return {
      isPwd: ref(true),
      login: {
        username: "",
        password: "",
      },
      store,
    };
  },

  methods: {
    async submitForm() {
      if (!this.login.username || !this.login.password) {
        $q.notify({
          type: "negative",
          message: "Los datos ingresados ​​no son válidos",
          timeout: 3000,
        });
      } else if (this.login.password.length < 3) {
        $q.notify({
          type: "negative",
          message: "La contraseña debe tener 6 o más caracteres",
          timeout: 3000,
        });
      } else {
        $q.localStorage.set("username", this.login.username);
        $q.localStorage.set("password", JSON.stringify(this.login.password));
        try {
          await api.post("/api/Login", this.login).then((response) => {
            const prueba = response.data.token;
            console.log(response.data);
            console.log(prueba);
            store.prueba(response.data);

            const toPath = this.$route.query.to || "/index";
            this.$router.push(toPath);
            // api.defaults.headers.common.Authorization = "JWT " + token.id;
            api.defaults.headers.common.Authorization =
              "Bearer " + response.data.token;
          });

          console.log("login correct");
        } catch (err) {
          $q.notify({
            type: "negative",
            message: "Error de ingreso, Verifique los datos",
          });
        }

        // window.location.href = "/#/index";

        // this.$store.state.usarname = $q.localStorage.getItem("username");
        // this.$store.state.password = $q.localStorage.getItem("password");
        // <router-link class="text-white" to="/login" ></router-link>
      }
    },
  },

  mounted() {
    $q = useQuasar();
  },
};
</script>

<style scoped>
.wave {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>
