<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title">Lista de Usuário</h1>
          <b-select v-model="perPage">
              <option value="10">10 por página</option>
              <option value="15">15 por página</option>
              <option value="25">25 por página</option>
              <option value="50">50 por página</option>
          </b-select>
          <div class="align-buttons--right">
            <b-button type="is-primary">
              Novo
            </b-button>
          </div>
          <b-table
            :data="userList"
            :columns="columns"
            :per-page="perPage"
            paginated
            striped
            hoverable
          >
          </b-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getUsers } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'users-list',
  components: {
    Card,
  },
  data() {
    return {
      userList: [],
      columns: [
        {
          field: 'name',
          label: 'Nome',
          width: '250',
        },
        {
          field: 'email',
          label: 'E-mail',
        },
        {
          field: 'type',
          label: 'Tipo',
        },
      ],
      perPage: 25,
    }
  },
  mounted() {
    this.$store.commit('loading', true)

    getUsers()
      .then(resp => {
        this.userList = resp
        this.$store.commit('loading', false);
      })
  }
}
</script>

<style lang="scss" scoped>

</style>