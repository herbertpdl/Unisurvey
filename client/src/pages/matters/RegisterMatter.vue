<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <!-- Success Message -->
          <b-message
            auto-close
            has-icon
            title="Sucesso"
            type="is-success"
            :active.sync="isSuccessActive"
            :duration="5000"
            aria-close-label="Fechar mensagem"
          >
            Disiplina cadastrada com sucesso!
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
            Houve um erro ao cadastrar a disciplina, verifique os dados digitados e tente novamente.
          </b-message>

          <!-- Form -->
          <h1 class="title">Cadastro de Disciplina</h1>
          <b-message
            v-if="!hasTeachers"
            :closable="false"
            title="Você não tem nenhum professor cadastrado"
            type="is-warning"
            aria-close-label="Close message"
          >
            <p class="margin-bottom-1">Antes de cadastrar uma disciplina, você precisa ter um professor cadastrado.</p>
            <p class="margin-bottom-2">Deseja cadastrar um professor?</p>
              <b-button
                tag="router-link"
                to="/register-user"
                type="is-primary">
                Cadastrar
              </b-button>
          </b-message>
          <card v-else>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Nome da disciplina">
                    <b-input v-model="name" placeholder="Ex: Matemática" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-2">
                <b-field label="Código da disciplina">
                    <b-input v-model="code" placeholder="Ex: 5751" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Professor responsável">
                  <b-select v-model="teacher" placeholder="Selecione" expanded>
                      <option
                        v-for="(teacher, index) in teachers"
                        v-bind:key="index"
                        v-bind:value="teacher.id
                        "
                      >
                        {{ teacher.name }}
                      </option>
                  </b-select>
                </b-field>
              </div>
            </div>
            <div class="align-buttons--right">
              <div class="buttons">
                <!-- <b-button type="is-danger">
                  Cancelar
                </b-button> -->
                <b-button type="is-primary" @click="save">
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
import { getTeachers, getUser, saveMatter } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'register-matter',
  components: {
    Card,
  },
  data() {
    return {
      name: null,
      code: null,
      teachers: [],
      teacher: null,
      hasTeachers: true,
      isSuccessActive: false,
      isErrorActive: false,
    }
  },
  mounted() {
    getTeachers()
      .then((response) => {
        this.teachers = response
        if(response.length > 0) {
          this.hasTeachers = true;
        } else {
          this.hasTeachers = false;
        }
      })
  },
  methods: {
    save() {
      this.$store.commit('loading', true);

      getUser(this.teacher)
        .then(resp => {
          saveMatter({
            name: this.name,
            code: this.code,
            teacher_id: this.teacher,
            teacher_name: resp.name,
          })
            .then(resp => {
              this.$store.commit('loading', false)
              this.isSuccessActive = true
            })
            .catch(err => {
              this.isErrorActive = true
            })
        })

    },
  }
}
</script>

<style lang="scss">

</style>