<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
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
              <div class="column is-6">
                <b-field label="Professor responsável">
                  <b-select v-model="teacher" placeholder="Selecione" expanded>
                      <option
                        v-for="(teacher, index) in teachers"
                        v-bind:key="index"
                        v-bind:value="teacher.name"
                      >
                        {{ teacher.name }}
                      </option>
                  </b-select>
                </b-field>
              </div>
            </div>
            <div class="align-buttons--right">
              <div class="buttons">
                <b-button type="is-danger">
                  Cancelar
                </b-button>
                <b-button type="is-primary" @click="saveMatter">
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
import { getTeachers } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'register-matter',
  components: {
    Card,
  },
  data() {
    return {
      name: '',
      teachers: [],
      teacher: '',
      hasTeachers: true,
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
    saveMatter() {
      this.$store.commit('loading', true);
    }
  }
}
</script>

<style lang="scss">

</style>