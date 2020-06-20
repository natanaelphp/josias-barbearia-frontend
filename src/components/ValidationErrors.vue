<template>
  <b-message v-if="validationErrors.length" type="is-danger" :closable="false">
    <ul v-for="error in validationErrors" :key="error">
      <li>{{ error }}</li>
    </ul>
  </b-message>
</template>

<script>
export default {
  props: ['errors'],
  computed: {
    validationErrors() {
      return Object.values(this.errors).flat()
    }
  }
}
</script>
