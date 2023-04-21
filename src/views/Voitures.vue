<template>
  <container title="Voitures" @search="onSearch">
    <div class="Voitures">
        <a v-for="(voiture, index) in voitures" :key="index" @click="goToCommande(voiture.id)">
          <button>{{ voiture.marque }} {{ voiture.model }}</button>
        </a>
        <p v-if="!isLoading && voitures && voitures.length === 0">Aucune voiture trouvée.</p>
        <div v-if="isLoading" class="loader"></div>
    </div>
  </container>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Container from "@/components/AppContainer";

export default defineComponent({
  name: "VoituresPage",
  components: {
    Container,
  },
  setup() {
    const isLoading = ref(true);
    const route = useRoute();
    const router = useRouter();
    const agenceId = ref(route.params.agenceId);
    const agence = ref({});
    const voitures = ref([]);
    const error = ref(null);
    const fetchAgence = () => {
    // Mettre isLoading à true avant l'appel API
    isLoading.value = true;
    axios
      .get(`http://127.0.0.1:8000/api/agence/${agenceId.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        agence.value = response.data.agence;
        error.value = null;
        return Promise.resolve();
      })
      .catch((error) => {
        console.log(error);
        error.value = error.response ? error.response.data.message : error.message;
        return Promise.reject(error);
      })
      // Mettre isLoading à false après la résolution ou le rejet de la promesse
      .finally(() => {
        isLoading.value = false;
      });
  };

  const fetchVoitures = () => {
    isLoading.value = true;
    axios
      .get(`http://127.0.0.1:8000/api/agences/${agenceId.value}/voitures`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        voitures.value = response.data.voitures;
        error.value = null;
        return Promise.resolve();
      })
      .catch((error) => {
        console.log(error);
        error.value = error.response ? error.response.data.message : error.message;
        return Promise.reject(error);
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

    watch(
      () => route.params.agenceId,
      (newAgenceId) => {
        agenceId.value = newAgenceId;
        fetchAgence();
        fetchVoitures();
      }
    );

    const checkAuth = () => {
      if (!localStorage.getItem("token")) {
        window.location.href = "/login";
      }
    };

    const goToCommande = (voitureId) => {
  console.log('voitureId:', voitureId);
  const voiture = voitures.value.find(v => v.id === voitureId);
  console.log('voiture:', voiture);
  if (voiture) {
    const commande = {
      voiture: `${voiture.marque} ${voiture.model}`,
      prix: voiture.prix,
      // Autres propriétés de la commande ici
    };
    
   // router.replace({ path: `/commande/${voitureId}`, query: commande });
    router.replace({ name: "CommandesPage",params: {voitureId} , query: commande});

  } else {
    console.log('Impossible de trouver la voiture correspondante');
  }
};


    checkAuth();
    fetchAgence();
    fetchVoitures();

    return { agence, voitures, error, goToCommande, isLoading };
  },
});
</script>

<style scoped>
.Voitures {
  flex-wrap: wrap;
}

.Voitures button {
  width: 100%;
  margin-top: 15px;
  padding: 15px;
  background-color:#222428;
  border: none;
  text-align: center
}

.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: 50px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>