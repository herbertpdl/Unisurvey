<template>
  <section class="section">
    <div class="container">
    <div class="columns">
      <div v-if="!isAdmin" class="column is-12">
        <h1 class="title">Olá {{ userName }}</h1>
        <card>
          <p v-if="surveys" class="title is-5">
            Você possui  {{ surveys.length }} questionários pendentes
          </p>
          <a
            v-for="(survey, index) in surveys"
            :key="index"
            :href="`#/answer-survey/${survey.id}`"
            class="has-text-link survey-link"
          >
            {{ survey.name }}
          </a>
        </card>
      </div>
      <div v-else class="column is-12">
        teste home admin
      </div>
    </div>
    </div>
  </section>
</template>

<script>
import { getSurveysByCourse, getSurveysByType } from '@/services/api'
import Card from  '@/components/Card'

export default {
  name: 'home',
  components: {
    Card,
  },
  data() {
    return {
      surveys: [],
    }
  },
  mounted() {
    this.getSurveysByUserType()
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('userType') === 'admin'
    },
    userName() {
      return localStorage.getItem('userName')
    },
    userId() {
      return localStorage.getItem('userId')
    }
  },
  methods: {
    getSurveysByUserType() {
      let userType = localStorage.getItem('userType')
      let userCourse;

      if (userType === 'aluno') { 
        userCourse = localStorage.getItem('userCourse')
        Promise.all([getSurveysByCourse(userCourse, this.userId),getSurveysByTypeUser(2, this.userId)])
          .then(([courses, type]) => {
            this.surveys = courses.concat(type)
          })
      } else if (userType === 'professor' || userType === 'funcionario') {
        getSurveysByType(3)
          .then(resp => {
            this.surveys = resp;
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .survey-link {
    display: block;
    margin-bottom: 10px;
    text-decoration: underline;
  }
</style>