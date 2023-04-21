<template>
  <div class="course">
    <div>
      <h2>Nom : {{ agence.label }}</h2>
    </div>
    <div class="actions">
      <button class="update" @click="VoituresAgence(props.agence.id)">Continuer</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "AgenceItem",
  props: {
    agence: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const VoituresAgence = (id) => {
      emit('VoituresAgence', id)
    }
    return { VoituresAgence }
  }
})
</script>
