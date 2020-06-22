<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Cliente</p>
    </header>

    <section class="modal-card-body">

      <validation-errors :errors="errors"></validation-errors>

      <b-field label="Nome">
        <b-input v-model="client.name" required maxlength="100"></b-input>
      </b-field>

      <b-field label="Telefone">
        <b-input v-model="client.phone" maxlength="20"></b-input>
      </b-field>

      <b-field label="Email">
        <b-input type="email" v-model="client.email" maxlength="100"></b-input>
      </b-field>
    </section>

    <footer class="modal-card-foot">
      <b-button @click="close()">Fechar</b-button>
      <b-button type="is-primary" @click="save()">Salvar</b-button>
    </footer>
  </div>
</template>

<script>
import { http } from '@/plugins/http'
import ValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'ClientForm',
  components: {
    ValidationErrors
  },
  props: {
    client: Object
  },
  data () {
    return {
      errors: {},
    }
  },
  methods: {
    close () {
      this.errors = {}
      this.$parent.close()
    },
    save () {
      let method = 'post'
      let url = 'clients'
      let data = this.client

      if (this.client.id) {
        method = 'put'
        url = 'clients/' + this.client.id
      }

      http({ method, url, data })
          .then(() => this.close())
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
