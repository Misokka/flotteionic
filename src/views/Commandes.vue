<template>
    <container title="Commandes" @search="onSearch"> 
      <div v-if="loading" class="loader"></div>
      <div v-else>
        <ul class="commandes-list">
          <li v-for="commande in filteredCommandes" :key="commande.id" @click="toggleDetails(commande.id)">
            Commande {{ commande.id }}
            <transition name="slide-fade">
              <div v-show="commande.showDetails" class="commande-details">
                <p>Prénom: {{ commande.firstname }}</p>
                <p>Nom: {{ commande.lastname }}</p>
                <p>Email: {{ commande.email }}</p>
                <p>Date de début: {{ commande.dateDebut }}</p>
                <p>Date de fin: {{ commande.dateFin }}</p>
                <p>Véhicule: {{ commande.vehicule.marque }} {{ commande.vehicule.model }}</p>
              </div>
            </transition>
          </li>
        </ul>
        <p v-if="!loading && filteredCommandes.length === 0">Aucune commande trouvée.</p>
      </div>
    </container>
  </template>
  
  <script>
  import Container from "@/components/AppContainer";
  import axios from 'axios';
  
  export default {
    name: "HistoriqueCommandes",
    components: {
      Container,
    },
    data() {
      return {
        commandes: [],
        filteredCommandes: [],
        loading: true,
        userId: null
      };
    },
    async created() {
        await this.getUserId()
        this.getUserOrders()
    },
    methods: {
        onSearch(event) {
            const searchQuery = event.target.value;
            if (searchQuery.trim() === "") {
                this.filteredCommandes = this.commandes;
            } else {
                this.filteredCommandes = this.commandes.filter(commande => {
                return commande.id.toString().includes(searchQuery.trim());
                });
            }
        },
      async getUserOrders() {
        const userId = this.userId;
        if (!userId) {
            console.error("Impossible de récupérer l'ID de l'utilisateur");
            return;
        }
    
        const token = localStorage.getItem("token");

        axios.get(`http://127.0.0.1:8000/api/commandes/user/${userId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response)=>{
            this.commandes = response.data;
            this.filteredCommandes = response.data;
            this.loading = false;
            console.log(response)
            console.log(this.commandes);
            console.log(userId)
        })
        .catch((error)=>{
            console.error("Erreur lors de la récupération des commandes :", error);
        })
      },
      async getUserId() {
        try {
          const token = localStorage.getItem("token");
          const response = await this.$http.get("http://127.0.0.1:8000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          this.userId = response.data.id;
        } catch (error) {
          console.error("Erreur lors de la récupération de l'ID de l'utilisateur :", error);
          return null;
        }
      },
      toggleDetails(commandeId) {
        const index = this.commandes.findIndex(commande => commande.id === commandeId);
        this.commandes[index].showDetails = !this.commandes[index].showDetails;
      },
    },
  };
  </script>
  
  <style>
  .commandes-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .commandes-table th,
  .commandes-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .commandes-table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #222428;
    color: white;
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
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .commandes-list {
  list-style-type: none;
  padding: 0;
}

.commandes-list li {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #222428;
  background-color: #222428;
  margin-bottom: 10px;
}

.commandes-list li:hover {
  background-color: #222428;
}

.commande-details {
  margin-left: 20px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
  </style>