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
        <div class="admin-cards">
          <div class="columns">
            <div class="column is-4">
              <router-link to="user-list">
                <div class="icon-card">
                  <i class="mdi mdi-account-group"></i>
                  <p>Lista de Usuários</p>
                </div>
              </router-link>
            </div>
            <div class="column is-4">
              <router-link to="matters-list">
                <div class="icon-card">
                  <i class="mdi mdi-notebook"></i>
                  <p>Lista de Disciplinas</p>
                </div>
              </router-link>
            </div>
            <div class="column is-4">
              <router-link to="courses-list">
                <div class="icon-card">
                  <i class="mdi mdi-teach"></i>
                  <p>Lista de Cursos</p>
                </div>
              </router-link>
            </div>
          </div>
          <div class="columns">
            <div class="column is-4">
              <router-link to="question-list">
                <div class="icon-card">
                  <i class="mdi mdi-help-circle"></i>
                  <p>Lista de Perguntas</p>
                </div>
              </router-link>
            </div>
            <div class="column is-4">
              <router-link to="register-survey">
                <div class="icon-card">
                  <i class="mdi mdi-frequently-asked-questions"></i>
                  <p>Novo Questionário</p>
                </div>
              </router-link>
            </div>
            <div class="column is-4">
              <router-link to="get-report">
                <div class="icon-card">
                  <i class="mdi mdi-chart-bar"></i>
                  <p>Relatório</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
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

<style lang="scss">
  .survey-link {
    display: block;
    margin-bottom: 10px;
    text-decoration: underline;
  }

  .admin-cards {
    a {
      color: #363636;
      transition: .3s ease;

      &:hover {
        color: #7957d5;
      }
    }
    .icon-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px;
      border: 1px solid #7957d5;
      border-radius: 3px;

      i {
        font-size: 32px;
      }
    }
  }
</style>