<template>
  <ion-page>
    <ion-menu side="start" content-id="main-content">
      <ion-header>
        <ion-toolbar color="light">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item href="agences">Agences</ion-item> 
          <ion-item href="commandes">Mes commandes</ion-item>
          <ion-item @click="logout">Déconnexion</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-header>
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          <ion-menu-button :auto-hide="false"></ion-menu-button>
        </ion-buttons>
        <template v-if="showTitle">
          <ion-title>{{ title }}</ion-title>
        </template>
        <ion-buttons slot="end">
          <ion-button @click="showSearch = true; showTitle = false">
            <ion-icon slot="icon-only" :icon="searchOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-searchbar
          v-if="!showTitle"
          v-model="searchQuery"
          placeholder="Rechercher"
          show-cancel-button="focus"
          @ionCancel="showSearch = false; showTitle = true"
          @ionClear="searchQuery = ''; showTitle = true"
          @ionInput="onSearch && onSearch($event)"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :id="'main-content'">
      <main>
        <slot></slot>
      </main>
    </ion-content>
  </ion-page>
</template>
<script>
import {
  IonContent,
  IonTitle,
  IonToolbar,
  IonPage,
  IonHeader,
  IonButton,
  IonIcon,
  IonMenu,
  IonList,
  IonItem,
  IonButtons,
  IonMenuButton,
  IonSearchbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { heartOutline, bookmarkOutline, searchOutline } from "ionicons/icons";
import axios from "axios";

export default defineComponent({
  name: "app-container",
  components: {
    IonContent,
    IonTitle,
    IonToolbar,
    IonPage,
    IonHeader,
    IonButton,
    IonIcon,
    IonMenu,
    IonList,
    IonItem,
    IonButtons,
    IonMenuButton,
    IonSearchbar
  },
  props: {
  title: {
    type: String,
    required: true
  },
},
  data() {
    return {
      heartOutline,
      bookmarkOutline,
      showSearch: false,
      showTitle: true,
      searchOutline,
      searchQuery: ""
    };
  },
  methods: {
    handleSearch() {
    this.$emit("search", this.searchQuery);
  },
    logout() {
      axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      })
        .then(() => {
          // Déconnexion réussie, rediriger l'utilisateur vers la page de connexion
          window.location.href = '/login';
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
});
</script>
