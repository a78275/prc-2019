<template>
  <v-container class="ma-0 pa-0 mt-3">
    <v-card>
      <v-card-title>
        <v-container>
          <v-text-field
            v-model="search"
            color="red"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            solo
          ></v-text-field>
        </v-container>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="teams"
        :search="search"
        hide-actions
        disable-initial-sort
      >
          <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="warning">
                  No leagues available...
              </v-alert>
          </template>
          <template v-slot:items="props" class="ma-0 pa-0">
              <tr class="ma-0 pa-0" @click="getTeam(props.item)">
                <td class="body-2">{{ props.item.name.value }}</td>
                <td class="body-2">{{ props.item.league.value }}</td>
                <td class="body-2">{{ props.item.psi.value }}</td>
              </tr>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      search: '',
      headers: [
        { text: 'Team', sortable: true, value: 'name.value', class: 'title' },
        { text: 'League', sortable: true, value: 'league.value', class: 'title' },
        { text: 'PSI', sortable: true, value: 'psi.value', class: 'title' }
      ],
      teams: []
    }
  },
  mounted: async function () {
    try {
      var response = await axios.get('http://localhost:8090/teams')
      this.teams = response.data
    } catch (e) {
      return (e)
    }
  },
  methods: {
    getTeam: function (item) {
      var id = item.team.value.split('#')[1]
      this.$router.push('/teams/' + id)
    }
  }
}
</script>
