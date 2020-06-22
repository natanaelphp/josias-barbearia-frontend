<template>
  <section class="section">
    <div class="container">

      <div class="buttons">
        <b-button type="is-success" @click="create()">
          <i class="fas fa-plus mr-2"></i>Novo cliente
        </b-button>
      </div>

      <b-modal
        :active.sync="control.openModal"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal
        @close="loadClients()"
      >
        <client-form :client="selectedClient"></client-form>
      </b-modal>

      <b-table :data="clients" :loading="control.loading" striped narrowed>

        <template slot-scope="props">
          <b-table-column field="name" label="Nome">{{ props.row.name }}</b-table-column>
          <b-table-column field="phone" label="Telefone">{{ props.row.phone }}</b-table-column>
          <b-table-column field="email" label="Email">{{ props.row.email }}</b-table-column>
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
              <p>Nenhum cliente cadastrado</p>
            </div>
          </section>
        </template>

      </b-table>

    </div>
  </section>
</template>

<script>
import { http } from '@/plugins/http'
import ClientForm from './ClientForm'

export default {
  name: "Clients",
  components: {
    ClientForm
  },
  data() {
    return {
      clients: [],
      selectedClient: null,
      control: {
        loading: true,
        openModal: false,
      }
    }
  },
  mounted () {
    if (this.$route.query.new) this.create()
    this.loadClients()
  },
  methods: {
    loadClients () {
      this.control.loading = true

      http.get('clients')
        .then(reponse => this.clients = reponse.data)
        .finally(() => this.control.loading = false)
    },
    create () {
      this.selectedClient = { name: '', phone: '', email: '' }
      this.control.openModal = true
    },
    edit (client) {
      this.selectedClient = client
      this.control.openModal = true
    },
    confirmDelete (client) {
      this.$buefy.dialog.confirm({
        title: 'Excluir cliente',
        message: 'Tem certeza de que deseja <b>excluir</b> este cliente? Esta ação não poderá ser desfeita.',
        confirmText: 'Sim',
        cancelText: 'Não',
        type: 'is-danger',
        onConfirm: () => {
          http.delete('clients/' + client.id)
            .then(() => {
              const index = this.clients.indexOf(client)
              this.clients.splice(index, 1)

              this.$buefy.toast.open('Cliente excluído')
            })
        }
      })
    },
  }
}
</script>
