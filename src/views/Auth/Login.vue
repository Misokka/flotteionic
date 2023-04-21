<template>
  <container title="Connexion">
    <ion-grid class="ion-no-padding centered-grid">
        <ion-row>
          <ion-col size="12">
            <form>
              <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input type="email" v-model="user.email"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Mot de passe</ion-label>
                <ion-input type="password" v-model="user.password"></ion-input>
              </ion-item>
              <ion-button expand="block" color="primary" @click.prevent="login">Se connecter</ion-button>
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
  </container>
</template>

<style>
.centered-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Container from "@/components/AppContainer";
import {
  IonButton,
  IonLabel,
  IonInput,
  IonItem,
  IonCol,
  IonRow,
  IonGrid,
} from "@ionic/vue";

import axios from "axios";

export default defineComponent({
  name: "AuthLogin",
  components: {
    Container,
    IonButton,
    IonLabel,
    IonInput,
    IonItem,
    IonCol,
    IonRow,
    IonGrid,
  },
  setup() {
    const user = ref({});
    const router = useRouter();
    const msg = ref([]);

    const login = () => {
      axios
        .post("http://127.0.0.1:8000/api/login", user.value)
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);
          console.log(response.data)
          user.value = {};
          msg.value = {};
          router.push("/agences");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return { user, login };
  },
});
</script>
