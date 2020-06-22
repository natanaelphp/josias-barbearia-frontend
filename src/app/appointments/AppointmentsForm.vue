<template>
  <div class="modal-card is-auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Agendamento</p>
    </header>

    <section class="modal-card-body">

      <validation-errors :errors="errors"></validation-errors>

      <b-field label="Cliente">
        <b-select v-model="appointment.client_id" placeholder="Selecione o cliente" expanded required>
          <option v-for="client in clients" :value="client.id" :key="client.id">
            {{ client.name }}
          </option>
        </b-select>
      </b-field>

      <b-field label="Serviços">
        <b-select v-model="appointment.service_id" placeholder="Selecione o serviço" expanded required>
          <option v-for="service in services" :value="service.id" :key="service.id">
            {{ service.name }}
          </option>
        </b-select>
      </b-field>

      <b-field label="Data e hora">
        <b-datetimepicker
          v-model="datetime"
          :timepicker="{ incrementMinutes: 30 }"
          icon="calendar-alt"
          inline
          required
        ></b-datetimepicker>
      </b-field>
    </section>

    <footer class="modal-card-foot">
      <b-button @click="close()">Fechar</b-button>
      <b-button type="is-primary" @click="save()">Salvar</b-button>
    </footer>
  </div>
</template>

<script>
import moment from 'moment'
import { http } from '@/plugins/http'
import ValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'AppointmentsForm',
  components: {
    ValidationErrors
  },
  props: {
    appointment: Object
  },
  data () {
    return {
      errors: {},
      clients: [],
      services: [],
    }
  },
  computed: {
    datetime: {
      get () {
        return new Date(this.appointment.datetime)
      },
      set (value) {
        this.appointment.datetime = value
      }
    }
  },
  mounted () {
    http.get('clients').then(reponse => this.clients = reponse.data)
    http.get('services').then(reponse => this.services = reponse.data)
  },
  methods: {
    close () {
      this.errors = {}
      this.$parent.close()
    },
    save () {
      let method = 'post'
      let url = 'appointments'
      let data = this.getDataToRequest()

      if (this.appointment.id) {
        method = 'put'
        url = 'appointments/' + this.appointment.id
      }

      http({ method, url, data })
          .then(() => this.close())
          .catch(error => this.errors = error.response.data.errors)
    },
    getDataToRequest () {
      let data = this.appointment
      data.datetime = moment(this.appointment.datetime).format('YYYY-MM-DD HH:mm:ss')

      return data
    }
  }
}
</script>

<style scoped>
  .is-auto {
    width: auto;
  }
</style>