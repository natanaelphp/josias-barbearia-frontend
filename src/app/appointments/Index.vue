<template>
  <section class="section">
    <div class="container">

      <div class="columns">

        <div class="column">
          <div class="buttons">
            <b-button type="is-success" @click="create()">
              <i class="fas fa-plus mr-2"></i>Novo agendamento
            </b-button>
          </div>
        </div>

        <div class="column">
          <b-field grouped position="is-right">

            <b-field v-if="currentUser.admin">
              <b-select
                v-model="filters.user_id"
                placeholder="Filtrar por profissional"
                @input="loadAppointments()"
              >
                <option :value="null"></option>
                <option v-for="user in users" :value="user.id" :key="user.id">
                  {{ user.name }}
                </option>
              </b-select>
            </b-field>

            <b-field>
              <b-datepicker
                v-model="filters.date"
                @input="loadAppointments()"
                range
                icon="calendar-alt"
                placeholder="Filtrar por período"
              ></b-datepicker>
              <a class="control" @click="clearFilterDates()">
                <span class="button is-static">
                  <i class="fas fa-times"></i>
                </span>
              </a>
            </b-field>

          </b-field>
        </div>

      </div>

      <b-modal
        :active.sync="control.openModal"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal
        @close="loadAppointments()"
      >
        <appointments-form :appointment="selectedAppointment"></appointments-form>
      </b-modal>

      <b-table :data="appointments" :loading="control.loading" striped narrowed>

        <template slot-scope="props">

          <b-table-column field="client" label="Client">
            {{ props.row.client.name }}
          </b-table-column>

          <b-table-column field="service" label="Serviço">
            {{ props.row.service.name }}
          </b-table-column>

          <b-table-column v-if="currentUser.admin" field="user" label="Profissional">
            {{ props.row.user.name }}
          </b-table-column>

          <b-table-column field="datetime" label="Data e hora">
            {{ formatDate(props.row.datetime) }}
          </b-table-column>

          <b-table-column field="actions" label="Ações" width="120">
            <div class="buttons">
              <b-button type="is-warning" title="Alterar" @click="edit(props.row)">
                <i class="fas fa-pen has-text-white"></i>
              </b-button>
              <b-button type="is-danger" title="Excluir" @click="confirmDelete(props.row)">
                <i class="fas fa-times"></i>
              </b-button>
            </div>
          </b-table-column>

        </template>

        <template slot="empty">
          <section v-show="!control.loading" class="section">
            <div class="content has-text-grey has-text-centered">
              <p><i class="fas fa-frown fa-3x"></i></p>
              <p>Nenhum agendamento</p>
            </div>
          </section>
        </template>

      </b-table>

    </div>
  </section>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { http } from '@/plugins/http'
import AppointmentsForm from './AppointmentsForm'

export default {
  name: 'Appointments',
  components: {
    AppointmentsForm
  },
  data() {
    return {
      appointments: [],
      selectedAppointment: null,
      users: [],
      control: {
        loading: true,
        openModal: false,
      },
      filters: {
        date: null,
        user_id: null,
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  mounted () {
    if (this.$route.query.new) this.create()
    this.loadAppointments()
    this.loadUsers()
  },
  methods: {
    loadAppointments () {
      this.control.loading = true

      const params = this.makeParamsToRequest()

      http.get('appointments', { params })
        .then(reponse => this.appointments = reponse.data)
        .finally(() => this.control.loading = false)
    },
    makeParamsToRequest () {
      let date = []

      if (this.filters.date) {
        date[0] = moment(this.filters.date[0]).format('YYYY-MM-DD HH:mm:ss')
        date[1] = moment(this.filters.date[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      }

      const user_id = this.filters.user_id

      return { date, user_id }
    },
    loadUsers () {
      if (!this.currentUser.admin) return
      http.get('users').then(reponse => this.users = reponse.data)
    },
    create () {
      this.selectedAppointment = {
        client_id: null,
        service_id: null,
        datetime: moment().startOf('hour')
      }

      this.control.openModal = true
    },
    edit (appointment) {
      this.selectedAppointment = appointment
      this.control.openModal = true
    },
    confirmDelete (appointment) {
      this.$buefy.dialog.confirm({
        title: 'Excluir agendamento',
        message: 'Tem certeza de que deseja <b>excluir</b> este agendamento? Esta ação não poderá ser desfeita.',
        confirmText: 'Sim',
        cancelText: 'Não',
        type: 'is-danger',
        onConfirm: () => {
          http.delete('appointments/' + appointment.id)
            .then(() => {
              const index = this.appointments.indexOf(appointment)
              this.appointments.splice(index, 1)

              this.$buefy.toast.open('Agendamento excluído')
            })
        }
      })
    },
    clearFilterDates () {
      this.filters.date = null
      this.loadAppointments()
    },
    formatDate (value) {
      return moment(value).format('DD/MM/YYYY HH:mm:ss')
    }
  }
}
</script>
