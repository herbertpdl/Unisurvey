<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title">Responder questionário XXXXXX</h1>

          <div class="progress-container margin-bottom-1">
            <b-progress
              :value="totalPercent"
              size="is-medium"
              type="is-dar-grey"
              show-value
            >
              Progresso {{ answeredQuestions.length }} / {{ totalQuestions }}
            </b-progress>
          </div>
          <card>
            <div
              v-for="(question, index) in surveyQuestions"
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
                        {{ alternative }}
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
                      <b-checkbox @click.native="addMultiple(alternative, index)" :native-value="alternative">
                        {{ alternative }}
                      </b-checkbox>
                    </div>
                  </div>
                </b-field>
                <hr>
              </div>
            </div>
            {{ answers }}
            {{ answeredQuestions }}
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
  name: 'answer-survey',
  components: {
    Card
  },
  data() {
    return {
      answers: [],
      surveyQuestions: [],
      totalQuestions: null,
      answeredQuestions: [],
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
    getQuestions()
      .then(resp => {
        this.surveyQuestions = resp;
        this.totalQuestions = resp.length
        this.$store.commit('loading', false)
      })
  },
  methods: {
    addMultiple(value, index) {
      this.answers[index] = value
    }
  },
  computed: {
    totalPercent() {
      const number = (this.answeredQuestions.length/this.totalQuestions) * 100
      return number
    }
  },
}
</script>

<style lang="scss" scoped>

</style>