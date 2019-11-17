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
            Questionário cadastrado com sucesso!
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
            Houve um erro ao tentar cadastrar o questionário, verifique os dados digitados e tente novamente.
          </b-message>

          <h1 class="title">Cadastro de Questionário</h1>
          <card>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Nome do Questionário">
                    <b-input v-model="name" placeholder="Ex: Avaliação institucional 2019/2" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Tipo de questionário">
                  <b-select
                    expanded
                    v-model="surveyType"
                    placeholder="Selecione"
                  >
                    <option value="1">Aluno avalia professores</option>
                    <option value="2">Aluno avalia instituição</option>
                    <option value="3">Funcionários avaliam instituição</option>
                  </b-select>
                </b-field>
                <b-message v-if="infoActive" type="is-info" >
                  Ao selecionar esta opção, este questionário será enviado automaticamente para todos os alunos avaliarem seus respectivos professores.
                </b-message>
              </div>
            </div>

            <div class="columns">
              <div class="column is-6">
                <b-field label="Selecione as perguntas">
                  <multiselect
                    v-model="selectedQuestions"
                    :options="questionsList"
                    :multiple="true"
                    :close-on-select="false"
                    :max="20"
                    searchable
                    track-by="statement"
                    label="statement"
                    placeholder="Selecione as perguntas"
                    selectLabel="Selecionar"
                    selectedLabel="Selecionado"
                    deselectLabel="Remover"
                  >
                    <template slot="maxElements">
                      Você pode selecionar no máximo 20 perguntas.
                    </template>
                  </multiselect>
                </b-field>
              </div>
            </div>
            <div class="align-buttons--right">
              <b-button type="is-primary" @click="save">
                Enviar
              </b-button>
            </div>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getQuestions, registerSurvey } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'register-survey',
  components: {
    Card,
  },
  data() {
    return {
      name: null,
      surveyType: null,
      selectedQuestions: [],
      questionsList: [],
      infoActive: false,
      isSuccessActive: false,
      isErrorActive: false,
    }
  },
  watch: {
    surveyType: function (newValue) {
      newValue === '1' ? this.infoActive = true : this.infoActive = false;
    }
  },
  mounted() {
    this.$store.commit('loading', true)
    getQuestions()
      .then(resp => {
        this.questionsList = resp
        this.$store.commit('loading', false)
      })
  },
  methods: {
    save() {
      this.$store.commit('loading', true)
      registerSurvey({
        name: this.name,
        type: this.surveyType,
        questions: this.selectedQuestions,
      }).then(resp => {
        this.$store.commit('loading', false)
        this.isSuccessActive = true
      })
      .catch(err => {
        console.log(err)
        this.$store.commit('loading', false)
        this.isErrorActive = true
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>