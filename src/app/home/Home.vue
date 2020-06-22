<template>
  <section class="section">
    <div class="container">
      <div class="columns">

        <div class="column is-one-third">
          <article class="panel">

            <p class="panel-heading has-text-primary">
              <i class="fas fa-users mr-2"></i>Clientes
            </p>

            <router-link :to="{ path: 'clients?new=1' }" class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-plus" aria-hidden="true"></i>
              </span>
              Novo cliente
            </router-link>

            <router-link :to="{ name: 'clients' }" class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-list" aria-hidden="true"></i>
              </span>
              Visualizar clientes
            </router-link>

          </article>
        </div>

        <div class="column is-one-third">
          <article class="panel">

            <p class="panel-heading has-text-primary">
              <i class="far fa-calendar-alt mr-2"></i>Agendamentos
            </p>

            <router-link :to="{ path: 'appointments?new=1' }" class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-plus" aria-hidden="true"></i>
              </span>
              Novo agendamento
            </router-link>

            <router-link :to="{ name: 'appointments' }" class="panel-block">
              <span class="panel-icon">
                <i class="fas fa-list" aria-hidden="true"></i>
              </span>
              Visualizar agendamentos
            </router-link>

          </article>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style>
a.panel-block {
  padding: 0.8em;
}
</style>