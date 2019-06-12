<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="teams"
        hide-actions
        disable-initial-sort
      >
          <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="warning">
                  No teams available...
              </v-alert>
          </template>
          <template v-slot:items="props" class="ma-0 pa-0">
              <tr class="ma-0 pa-0" @click="getTeam(props.item)">
                  <td class="body-2">{{ props.index + 1 }}</td>
                  <td class="body-2">{{ props.item.name.value }}</td>
                  <td class="body-2">{{ props.item.pnt.value }}</td>
                  <td class="body-2">{{ parseInt(props.item.victories.value) + parseInt(props.item.ties.value) + parseInt(props.item.losses.value) }}</td>
                  <td class="body-2">{{ props.item.victories.value }}</td>
                  <td class="body-2">{{ props.item.ties.value }}</td>
                  <td class="body-2">{{ props.item.losses.value }}</td>
                  <td class="body-2">{{ props.item.scored.value }}</td>
                  <td class="body-2">{{ props.item.suffered.value }}</td>
                  <td class="body-2">{{ parseInt(props.item.scored.value) - parseInt(props.item.suffered.value) }}</td>
              </tr>
          </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style>
</style>

<script>
import axios from 'axios'

export default {
  props: ['idLeague'],
  data () {
    return {
      headers: [
        { text: 'Rank', align: 'left', sortable: false, value: '', class: 'title' },
        { text: 'Team', sortable: false, value: 'name.value', class: 'title' },
        { text: 'P', sortable: true, value: 'pnt.value', class: 'title' },
        { text: 'G', sortable: false, value: '', class: 'title' },
        { text: 'V', sortable: true, value: 'victories.value', class: 'title' },
        { text: 'T', sortable: true, value: 'ties.value', class: 'title' },
        { text: 'D', sortable: true, value: 'losses.value', class: 'title' },
        { text: 'SG', sortable: true, value: 'scored.value', class: 'title' },
        { text: 'CG', sortable: true, value: 'suffered.value', class: 'title' },
        { text: 'GD', sortable: false, value: '', class: 'title' }
      ],
      teams: []
    }
  },
  mounted: async function () {
    try {
      var response = await axios.get('http://localhost:8090/leagueTeams/' + this.idLeague)
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
