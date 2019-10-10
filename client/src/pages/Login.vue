<template>
  <section>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <!-- Form login -->
            <card :class="'margin-top-5'">
              <b-field label="E-mail">
                <b-input v-model="email" type="email" />
              </b-field>
              <b-field label="Senha">
                <b-input
                  v-model="password"
                  @keyup.native.enter="sendLogin"
                  type="password" 
                  password-reveal
                />
              </b-field>
              <b-button type="is-primary" :loading="loading" @click="sendLogin">
                Enviar
              </b-button>
              <b-button type="is-text" @click="showRecoveryModal = true">
                esqueci minha senha
              </b-button>
            </card> 
            <!-- Modal recovery password -->
            <b-modal :active.sync="showRecoveryModal" has-modal-card>
              <div class="modal-card">
                <div class="columns">
                  <div class="column is-8 is-offset-2">
                    <div class="modal-card-head">
                      <p class="modal-card-title">Recuperar senha</p>
                    </div>
                    <div class="modal-card-body" style="text-align: left">
                      <p class="margin-bottom-1">Digite seu e-mail para recuperar sua senha.</p>
                      <b-field label="E-mail">
                        <b-input v-model="email" type="email" />
                      </b-field>
                      <b-button type="is-primary" style="float: right">
                        Recuperar
                      </b-button>
                    </div>
                  </div>
                </div>
              </div>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from  '@/components/Card'

export default {
  name: 'login',
  components: {
    Card,
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      showRecoveryModal: false,
      userData: null,
    }
  },
  methods: {
    sendLogin() {
      this.$store.commit('loading', true)
      let email = this.email 
      let password = this.password

      this.$store.dispatch('login', { email, password })
      .then(resp => {
        this.$store.commit('loading', false)
        this.$router.push('/home')
      })
      .catch(e => {
        this.$store.commit('loading', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  /** OVERWRITE CARD STYLE**/
  .card--container {
    min-height: 300px;
    text-align: left;

    .button.is-primary {
      float: right;
    }
  }
</style>