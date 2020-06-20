<template>
  <div id="app">

    <b-navbar v-if="shouldShowNavigation" type="is-primary" spaced>

      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <i class="fas fa-home mr-2"></i>Josias Barbearia
        </b-navbar-item>
      </template>

      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/clients' }">
          <i class="fas fa-users mr-2"></i>Clientes
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/schedules' }">
          <i class="far fa-calendar-alt mr-2"></i>Agendamentos
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-dropdown :label="currentUser.name">
          <b-navbar-item @click="logout">Logout</b-navbar-item>
        </b-navbar-dropdown>
      </template>

    </b-navbar>

    <router-view />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['shouldShowNavigation', 'currentUser']),
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
    },
  }
}
</script>

<style>
.mr-2 {
  margin-right: 0.5rem;
}
</style>
