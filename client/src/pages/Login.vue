<template>
  <section>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <!-- Form login -->
            <card>
              <b-field label="E-mail">
                <b-input v-model="login" type="email" />
              </b-field>
              <b-field label="Senha">
                <b-input v-model="password" type="password" password-reveal />
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
                        <b-input v-model="login" type="email" />
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
      login: '',
      password: '',
      loading: false,
      showRecoveryModal: false,
      userData: null,
    }
  },
  methods: {
    sendLogin() {
      this.loading = true;
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