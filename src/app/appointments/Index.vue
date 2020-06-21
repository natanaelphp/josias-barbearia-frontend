<template>
  <section class="section">
    <div class="container">

      <div class="buttons">
        <b-button type="is-success" @click="create()">
          <i class="fas fa-plus"></i> Novo agendamento
        </b-button>
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
              <p>Nenhum agendamento cadastrado</p>
            </div>
          </section>
        </template>

      </b-table>

    </div>
  </section>
</template>

<script>
import moment from 'moment'
import { http } from '@/plugins/http'
import AppointmentsForm from './AppointmentsForm'

export default {
  name: "Appointments",
  components: {
    AppointmentsForm
  },
  data() {
    return {
      appointments: [],
      selectedAppointment: null,
      control: {
        loading: true,
        openModal: false,
      }
    }
  },
  mounted () {
    if (this.$route.query.new) this.create()
    this.loadAppointments()
  },
  methods: {
    loadAppointments () {
      this.control.loading = true

      http.get('appointments')
        .then(reponse => this.appointments = reponse.data)
        .finally(() => this.control.loading = false)
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
    formatDate (value) {
      return moment(value).format('DD/MM/YYYY HH:mm:ss')
    }
  }
}
</script>
