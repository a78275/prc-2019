<template>
  <v-container class="ma-0 pa-0 mt-3">
    <v-card>
      <v-data-table
        :headers="headers"
        :items="teams"
        hide-actions
      >
          <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="warning">
                  No teams available...
              </v-alert>
          </template>
          <template v-slot:items="props" class="ma-0 pa-0">
              <tr class="ma-0 pa-0">
                  <td class="body-2">{{ props.item.rank.value }}</td>
                  <td class="body-2">{{ props.item.nome.value }}</td>
                  <td class="body-2">{{ props.item.league.value }}</td>
                  <td class="body-2" v-if="props.item.pais">{{ props.item.pais.value }}</td>
                  <td v-else></td>
                  <td class="body-2">{{ props.item.psi.value }}</td>
                  <td class="body-2">{{ props.item.off.value }}</td>
                  <td class="body-2">{{ props.item.def.value }}</td>
              </tr>
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
      headers: [
        { text: 'Rank', align: 'left', sortable: true, value: 'rank.value', class: 'subheading' },
        { text: 'Team', sortable: false, value: 'nome.value', class: 'subheading' },
        { text: 'League', sortable: true, value: 'league.value', class: 'subheading' },
        { text: 'Country', sortable: false, value: 'pais.value', class: 'subheading' },
        { text: 'SPI', sortable: true, value: 'psi.value', class: 'subheading' },
        { text: 'Offense', sortable: true, value: 'off.value', class: 'subheading' },
        { text: 'Defense', sortable: true, value: 'def.value', class: 'subheading' }
      ],
      teams: []
    }
  },
  mounted: async function () {
    try {
      var response = await axios.get('http://localhost:8090/top10')
      this.teams = response.data
    } catch (e) {
      return (e)
    }
  }
}
</script>
