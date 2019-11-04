<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title">Visualizar relatório</h1>
          <transition name="fade" mode="out-in">
            <card key="select-survey" v-if="!proceed">
              <div class="columns">
                <div class="column is-6">
                  <b-field label="Tipo do questionário">
                    <b-select expanded placeholder="selecione" @input="getSurveys">
                      <option value="1">Aluno avalia professor</option>
                      <option value="2">Aluno avalia instituição</option>
                      <option value="3">Professor avalia instituição</option>
                    </b-select>
                  </b-field>
                </div>
              </div>
              <div v-if="surveyList.length > 0" class="columns">
                <div class="column is-6">
                  <b-field label="Questionário">
                    <b-select expanded placeholder="selecione o questionario" @change.native="setSelectedSurvey">
                      <option
                        v-for="(survey, index) in surveyList"
                        :key="index"
                        :value="index"
                      >
                        {{ survey.name }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>
              <div v-if="selectedSurvey !== null" class="align-buttons--right">
                <b-button type="is-primary" v-on:click="proceed = true">
                  Prosseguir
                </b-button>
              </div>
            </card>
            
            <card key="answer-chart" v-else>
              <div class="columns">
                <div class="column is-6">
                  <b-field label="Selecione a pergunta desejada">
                    <b-select
                      expanded
                      placeholder="selecione"
                      @change.native="setSelectedQuestion"
                    >
                      <option
                        v-for="(question, indexQuestion) in selectedSurvey.questions"
                        :key="indexQuestion"
                        :value="indexQuestion"
                      >
                        {{ question.statement }}
                      </option>
                    </b-select>
                  </b-field>
                </div>
              </div>
              <p v-if="selectedQuestion"><strong>{{ selectedQuestion.statement }}</strong></p>

              {{average}}
              <bar-chart v-if="chartdata !== null" :chart-data="chartdata" :options="options"/>
            </card>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getSurveysByType ,getAnswersBySurveyQuestion } from '@/services/api'

import Card from  '@/components/Card'
import BarChart from '@/components/ChartBar.js'

export default {
  name: 'get-report',
  components: {
    Card,
    BarChart,
  },
  data() {
    return {
      surveyList: [],
      selectedSurvey: null,
      selectedQuestion: null,
      proceed: false,
      chartColors: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
      chartdata: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      answerCounter: null,
    }
  },
  computed: {
    average() {
      let sum = []
      const reducer = (accumulator, currentValue) => accumulator + currentValue.count;

      if (this.answerCounter !== null) {
        sum = this.answerCounter.reduce(reducer)
      }

      console.log(sum)

      return sum
    }
  },
  methods: {
    getSurveys(e) {
      this.$store.commit('loading', true)
      getSurveysByType(e)
        .then(resp => {
          console.log(resp)
          this.surveyList = resp
          this.$store.commit('loading', false)
        })
        .catch(e => {
          console.log(e)
          this.$store.commit('loading', false)
        })
    },
    setSelectedSurvey(event) {
      this.selectedSurvey = this.surveyList[event.target.value]
      console.log(this.selectedSurvey)
    },
    setSelectedQuestion(event) {
      this.selectedQuestion = this.selectedSurvey.questions[event.target.value]
      console.log(this.selectedQuestion)

      this.getAnswers()
    },
    getAnswers() {
      this.$store.commit('loading', true)
      getAnswersBySurveyQuestion(this.selectedSurvey.id, this.selectedQuestion.id)
        .then(resp => {
          this.$store.commit('loading', false)
          //count how many times the value appers
          let alternatives = []
          this.selectedQuestion.alternatives.map(el => {
            let counter = this.getOccurrence(resp, el.description)
            alternatives.push({
              description: el.description,
              count: counter,
            })
          })
          
          this.answerCounter = alternatives;
          this.updateChart(alternatives)
        })
        .catch(e => {
          console.log(e)
          this.$store.commit('loading', false)
        })
    },
    getOccurrence(array, value) {
      return array.filter((v) => (v.answer === value)).length;
    },
    updateChart(values) {
      let datasets = []

      values.map((el, index) => {
        datasets.push({
          label: [el.description],
          backgroundColor: [this.chartColors[index]],
          data: [el.count]
        })
      })

      this.chartdata = {
        labels: [this.selectedQuestion.statement],
        datasets: datasets,
      }
      
      console.log(values)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>