<template>
  <container title="Inscription">
    <form>
      <input type="text" v-model="user.firstname">
      <input type="text" v-model="user.lastname">
      <input type="email" v-model="user.email">
      <input type="password" v-model="user.password">
      <button @click.prevent="register">S'inscrire</button>
    </form>
  </container>
</template>

<script>
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router"
import Container from "@/components/AppContainer";
import axios from "axios"

export default defineComponent({
  name: "RegistrationForm",
  components: {
    Container
  },
  setup() {
    const user = ref({})
    const router = useRouter()

    const register = () => {
      axios.post('http://127.0.0.1:8000/api/inscription', user.value)
          .then(response => {
            localStorage.setItem('token', response.data.token)
            user.value = {}
            router.push('/login')
          })
          .catch(error => {
            // TODO Error message when password is wrong
            console.log(error)
          })
    }

    return {user, register}
  }
})
</script>
