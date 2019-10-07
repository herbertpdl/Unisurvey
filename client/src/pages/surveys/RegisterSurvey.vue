<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title">Cadastro de Questionário</h1>
          <card>
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
              <b-button type="is-primary">
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
import { getQuestions } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'register-survey',
  components: {
    Card,
  },
  data() {
    return {
      surveyType: null,
      selectedQuestions: [],
      questionsList: [],
      infoActive: false,
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
  }
}
</script>

<style lang="scss" scoped>

</style>