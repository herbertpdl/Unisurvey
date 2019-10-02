<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title">Cadastro de Usuários</h1>
          <card>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Nome">
                    <b-input v-model="name" placeholder="Ex: João da Silva" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <b-field label="CPF">
                    <b-input v-model="cpf" placeholder="XX.XXX.XXX-X" />
                </b-field>
                <small>Será utilizado como senha padrão deste usuário.</small>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <b-field label="E-mail">
                    <b-input v-model="email" type="email" placeholder="nome@domínio.com" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Tipo de usuário">
                  <b-select v-model="usertype" placeholder="Selecione" expanded>
                      <option value="aluno">Aluno</option>
                      <option value="professor">Professor</option>
                      <option value="funcionário">Funcionário</option>
                  </b-select>
                </b-field>
              </div>
            </div>
            <transition name="fade">
              <div class="columns" v-if="usertype === 'aluno'">
                <div class="column is-6">
                  <b-field label="Curso">
                    <b-select v-model="course" placeholder="Selecione" expanded>
                        <option
                          v-for="(course, index) in courses"
                          v-bind:key="index"
                          v-bind:value="course.name"
                        >
                          {{ course.name }}
                        </option>
                    </b-select>
                  </b-field>
                </div>
              </div>
            </transition>
            <div class="align-buttons--right">
              <div class="buttons">
                <b-button type="is-danger">
                  Cancelar
                </b-button>
                <b-button type="is-primary">
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
import { getCourses } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'register-user',
  components: {
    Card,
  },
  data() {
    return {
      name: '',
      cpf: '',
      email: '',
      usertype: '',
      course: '',
      courses: [],
    }
  },
  mounted() {
    getCourses()
      .then((response) => {
        this.courses = response
      })
  }
}
</script>

<style lang="scss">

</style>