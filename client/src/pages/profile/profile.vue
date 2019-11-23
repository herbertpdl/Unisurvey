<template>
  <section class="section">
    <div class="container">
      <div v-if="userdata" class="columns">
        <div class="column is-12">
          <!-- Sucess Message -->
          <b-message
            auto-close 
            has-icon
            title="Sucesso" 
            type="is-success"
            :active.sync="isSuccessActive"
            :duration="5000"
            aria-close-label="Fechar mensagem"
          >
            Usuário alterado com sucesso!
          </b-message>

          <!-- Error Message -->
          <b-message 
            auto-close 
            has-icon
            title="Sucesso" 
            type="is-danger"
            :active.sync="isErrorActive"
            :duration="5000"
            aria-close-label="Fechar mensagem"
          >
            Houve um erro ao tentar salvar os dados do usuário, verifique os dados digitados e tente novamente.
          </b-message>
        <h1 class="title">{{ userName }}</h1>
          <card>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Nome">
                  <b-input :disabled="!edit" v-model="userdata.name" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <b-field label="CPF">
                  <b-input :disabled="!edit" v-model="userdata.cpf" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <b-field label="E-mail">
                  <b-input :disabled="!edit" v-model="userdata.email" />
                </b-field>
              </div>
            </div>           
            <div class="align-buttons--right">
              <div class="buttons">
                <b-button
                  v-if="!edit"
                  type="is-primary"
                  @click="enableEdit"
                >
                  Editar
                </b-button>
                <b-button v-else type="is-primary" @click="save">
                  Enviar
                </b-button>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getUser, getCourses, updateUser } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'profile',
  components: {
    Card
  },
  data() {
    return {
      userName: null,
      userdata: null,
      edit: false,
      courses: null,
      isSuccessActive: false,
      isErrorActive: false,
    }
  },
  mounted() {
    this.$store.commit('loading', true)

    getUser(localStorage.getItem('userId'))
      .then(resp => {
        this.userName = resp.name
        this.userdata = resp
        this.$store.commit('loading', false)  
      })

    getCourses()
      .then(resp => {
        this.courses = resp
      })

    if (this.$route.params.viewtype === 'edit') {
      this.enableEdit()
    }
  },
  methods: {
    enableEdit() {
      this.$store.commit('loading', true)
      this.edit = true
      this.$store.commit('loading', false)
    },
    save() {
      this.$store.commit('loading', true)
      updateUser  (
        this.userdata.id,
        {
          name: this.userdata.name,
          cpf: this.userdata.cpf,
          email: this.userdata.email,
          type: this.userdata.type,
          course: this.userdata.course
        }).then(resp => {
            this.$store.commit('loading', false)
            this.isSuccessActive = true
          })
          .catch(err => {
            this.isErrorActive = true
            this.$store.commit('loading', false)
          })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>