<template>
  <container title="Commande">
    <form class="commande-form">
      <div>
        <label for="firstname">Prénom:</label>
        <input type="text" id="nom" name="nom" v-model="nom">
      </div>
      <div>
        <label for="lastname">Nom:</label>
        <input type="text" id="prenom" name="prenom" v-model="prenom">
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" v-model="email">
      </div>
      <div>
        <label for="dateDebut">Date de début:</label>
        <input type="date" id="date-debut" name="date-debut" v-model="dateDebut">
      </div>
      <div>
        <label for="dateFin">Date de fin:</label>
        <input type="date" id="date-fin" name="date-fin" v-model="dateFin">
      </div>
      <button type="submit" @click.prevent="validerCommande">Valider</button>
    </form>
  </container>
</template>

<script>
import Container from "@/components/AppContainer";
import axios from 'axios';

export default {
  name: "CommandePage",
  components: {
    Container,
  },
  data() {
    return {
      voitureId: this.$route.params.voitureId,
      nom: "",
      prenom: "",
      email: "",
      dateDebut: "",
      dateFin: "",
      userId: "",
    };
  },
  async created() {
    const token = localStorage.getItem("token");
    const voitureId = this.$route.params.voitureId;
    if (voitureId) {
      const response = await this.$http.get(`http://127.0.0.1:8000/api/voitures/${voitureId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.voiture = response.data.voiture;
    } else {
      console.log('voitureId n\'est pas défini ou est nul');
    }
  },
  methods: {
    async getUserId() {
      try {
        const token = localStorage.getItem("token");
        const response = await this.$http.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        this.userId = response.data.id
        console.log("userid"+this.userId)
        
      } catch (error) {
        console.error("Erreur lors de la récupération de l'ID de l'utilisateur :", error);
        return null;
      }
    },

    async validerCommande() {
  await this.getUserId(); // Ajoutez await ici
  if (!this.userId) {
    console.error("Impossible de récupérer l'ID de l'utilisateur");
    return;
  }

  const token = localStorage.getItem("token");

  await axios.post("http://127.0.0.1:8000/api/commandes", {
    firstname: this.nom,
    lastname: this.prenom,
    email: this.email,
    dateDebut: this.dateDebut,
    dateFin: this.dateFin,
    users_id: this.userId, // Utilisez directement this.userId ici
    vehicule_id: this.$route.params.voitureId,
  },
  {headers: {
        Authorization: `Bearer ${token}`,
      }},).then((response)=>{
    console.log(response.data)
    window.location.href="/commandes"
  }).catch((error)=>{
    console.log(error)
  })
},

  },
};
</script>




<style>
.commande-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  background-color: #222428;
}

.commande-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #222428;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.commande-form input[type="text"],
.commande-form input[type="date"] {
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.commande-form button[type="submit"] {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background-color: #222428;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.commande-form button[type="submit"]:hover {
  background-color: #44464a;
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
</style>