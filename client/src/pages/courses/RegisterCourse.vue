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
            Curso cadastrado com sucesso!
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
            Houve um erro ao cadastrar o curso, verifique os dados digitados e tente novamente.
          </b-message>

          <!-- Form -->
          <h1 class="title">Cadastro de Curso</h1>
          <b-message
            v-if="!hasMatters"
            :closable="false"
            title="Você não tem nenhuma disciplina cadastrada"
            type="is-warning"
            aria-close-label="Close message"
          >
            <p class="margin-bottom-1">Antes de cadastrar um curso, você precisa ter uma ou mais disciplinas cadastradas.</p>
            <p class="margin-bottom-2">Deseja cadastrar uma disciplina?</p>
              <b-button
                tag="router-link"
                to="/register-matter"
                type="is-primary">
                Cadastrar disciplina
              </b-button>
          </b-message>
          <card v-else>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Nome do Curso">
                    <b-input v-model="name" placeholder="Ex: Ciênca da Computação" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Período">
                  <b-select v-model="period" placeholder="Selecione">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                  </b-select>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class=" column is-6">
                <b-field label="Disciplinas">
                  <multiselect
                    v-model="selectedMatters"
                    :options="matters"
                    :multiple="true"
                    :close-on-select="false"
                    :max="6"
                    searchable
                    track-by="name"
                    label="name"
                    placeholder="Selecione as disciplinas"
                    selectLabel="Selecionar"
                    selectedLabel="Selecionado"
                    deselectLabel="Remover"
                  >
                    <template slot="maxElements">
                      Você pode selecionar no máximo 6 disciplinas.
                    </template>
                  </multiselect>
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
import { getMatters, saveCourse } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'register-course',
  components: {
    Card,
  },
  data() {
    return {
      name: '',
      matters: [],
      teacher: '',
      hasMatters: true,
      selectedMatters: [],
      period: null,
      isSuccessActive: false,
      isErrorActive: false,
    }
  },
  mounted() {
    getMatters()
      .then((response) => {
        this.matters = response
        if(response.length > 0) {
          this.hasMatters = true;
        } else {
          this.hasMatters = false;
        }
      })
  },
  methods: {
    save() {
      this.$store.commit('loading', true)
      saveCourse({
        name: this.name,
        period: this.period,
        matters: this.selectedMatters,
      }).then((resp) => {
          this.$store.commit('loading', false)
          this.isSuccessActive = true
        })
        .catch((err) => {
          this.$store.commit('loading', false)
          this.isErrorActive = true
        })
    }
  }
}
</script>

<style lang="scss">

</style>