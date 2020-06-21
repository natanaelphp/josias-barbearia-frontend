<template>
  <div class="login">

    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered is-size-2">
            Barbearia do Josias
          </h1>
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-4-widescreen">
              <form class="box">

                <b-message v-if="errorMsg" type="is-danger">
                  {{ errorMsg }}
                </b-message>

                <b-field label="Email">
                  <b-input
                    v-model="form.email"
                    type="email"
                    placeholder="seuemail@etus.com.br"
                    icon="envelope"
                    @keypress.enter.native="login()"
                  ></b-input>
                </b-field>

                <b-field label="Senha">
                  <b-input
                    v-model="form.password"
                    type="password"
                    placeholder="*******"
                    icon="lock"
                    @keypress.enter.native="login()"
                  ></b-input>
                </b-field>

                <b-button
                  @click="login()"
                  type="is-primary"
                  :loading="loading"
                  class="submit-button"
                  expanded
                >
                  Login
                </b-button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>Para maior facilidade ao testar o sistema, clique no usuário que deseja logar.</p>
        <div class="has-text-centered">
          <b-button
            v-for="user in users"
            :title="user.type"
            @click="fillForm(user)"
            :key="user.name"
            class="mr-2"
          >
            {{ user.name }}
          </b-button>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      errorMsg: '',
      loading: false,
      users: [
        { name: 'Josias',	email: 'josias@josiasbarbearia.com.br', type: 'Administrador' },
        { name: 'Carlos',	email: 'carlos@josiasbarbearia.com.br', type: 'Profissional' },
        { name:  'Vitor',	email: 'vitor@josiasbarbearia.com.br', type: 'Profissional' }
      ]
    }
  },
  methods: {
    ...mapActions(['attemptLogin']),
    login () {
      this.loading = true

      this.attemptLogin(this.form)
        .then(() => this.$router.push('/'))
        .catch(() => this.errorMsg = 'Usuário ou senha inválidos')
        .finally(() => this.loading = false)
    },
    fillForm (user) {
      this.form.email = user.email
      this.form.password = 'teste'
    },
  }
}
</script>

<style scoped>
  .submit-button {
    margin-top: 1.5em;
  }
</style>