<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title"></h1>

          <div class="progress-container margin-bottom-1">
            <b-progress
              v-if="surveyData.questions && surveyData.questions.length"
              :value="totalPercent"
              size="is-medium"
              type="is-dar-grey"
              show-value
            >
              Progresso {{ answeredQuestions.length }} / {{ surveyData.questions.length }}
            </b-progress>
          </div>
          <card>
            <div
              v-for="(question, index) in surveyData.questions"
              :key="index"
              class="columns"
            >
              <div class="column is-6">
                <b-field :label="`${index+1}) ${question.statement}`">
                  <!-- Discursive question --> 
                  <b-input
                    v-if="question.type === 'discursive'"
                    v-model="answers[index]"
                  />

                  <!-- Single answer question -->
                  <div v-else-if="question.type === 'multiple' && !question.checkMultiple">
                    <div
                      v-for="(alternative, indexAlternative) in question.alternatives"
                      :key="indexAlternative"
                      class="field"
                    >
                      <b-radio v-model="answers[index]" :native-value="alternative">
                        {{ alternative.description }}
                      </b-radio>
                    </div>
                  </div>

                  <!-- Multiple answer question -->
                  <div v-else>
                    <div
                      v-for="(alternative, indexAlternative) in question.alternatives"
                      :key="indexAlternative" 
                      class="field"
                    >
                      <b-checkbox
                        v-model="tempAnswers"
                        @input="addMultiple(index)"
                        :native-value="alternative"
                        :name="`question${index}`"
                      >
                        {{ alternative.description }}
                      </b-checkbox>
                    </div>
                  </div>
                </b-field>
                <hr>
              </div>
            </div>
            <div class="align-buttons--right">
              <div class="buttons">
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getSurvey, getAlternativesByQuestion } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'answer-survey',
  components: {
    Card
  },
  data() {
    return {
      answers: [],
      surveyData: [],
      totalQuestions: null,
      answeredQuestions: [],
      tempAnswers: [],
    }
  },
  watch: {
    answers: function(newValue) {
      this.answeredQuestions = this.answers.filter((value, index) => {
        return value !== null && value !== ''
      })
    },
  },
  mounted() {
    this.$store.commit('loading', true)
    getSurvey(2)
      .then(resp => {
        this.surveyData = resp
        this.appendAlternatives()
      })
  },
  methods: {
    addMultiple(index) {
      this.answers[index] !== undefined ? this.answers[index].push(this.tempAnswers[0]) : this.answers[index] = this.tempAnswers
      this.tempAnswers = []
    },
    appendAlternatives() {
      this.surveyData.questions.map((el, index) => {
        if(el.type === 'multiple') {
          getAlternativesByQuestion(el.id)
            .then(resp => {
              this.surveyData.questions[index].alternatives = resp
            })
        }
      })
      console.log(this.surveyData)
      this.$store.commit('loading', false)
    }
  },
  computed: {
    totalPercent() {
      const number = (this.answeredQuestions.length/this.surveyData.questions.length) * 100
      return number
    }
  },
}
</script>

<style lang="scss" scoped>

</style>