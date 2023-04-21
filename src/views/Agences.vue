<template>
  <container title="Agences" @search="onSearch">
    <div v-if="!isLoading">
      <div class="agences">
        <a v-for="(agence, index) in filteredAgences" :key="index" @click.prevent="goToVoitures(agence.id)">
          <button>{{ agence.label }}</button>
        </a>
      </div>
      <p v-if="filteredAgences.length === 0">Aucune agence trouvée.</p>
    </div>
    <div v-if="isLoading" class="loader"></div>
  </container>
</template>
<script>
import Container from "@/components/AppContainer";
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AgencesPage",
  components: {
    Container,
  },
  setup() {
    const agences = ref([]);
    const filteredAgences = ref([]);
    const token = localStorage.getItem("token");
    const router = useRouter();
    const isLoading = ref(true);

    const fetchAgences = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/agences", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        agences.value = response.data.agences;
        filteredAgences.value = agences.value;
        isLoading.value = false;
      } catch (error) {
        console.log(error); 
      }
    };

    const goToVoitures = (agenceId) => {
      router.replace({ name: 'VoituresPage', params: { agenceId } });
    };

    const onSearch = (event) => {
      const searchQuery = event.target.value;
      filterAgences(searchQuery);
    };

    const filterAgences = (query) => {
      filteredAgences.value = agences.value.filter((agence) =>
        agence.label.toLowerCase().includes(query.toLowerCase())
      );
    };

    fetchAgences(); // Appeler la méthode fetchAgences pour charger les données

    return { agences, goToVoitures, isLoading, filteredAgences, onSearch };
  },
});
</script>

<style scoped>
.agences {
  flex-wrap: wrap;
}

.agences button {
  width: 100%;
  margin-top: 15px;
  padding: 15px;
  background-color:#222428;
  border: none;
  text-align: center;
}

.agences button:hover {
  background-color: #ccc;
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
