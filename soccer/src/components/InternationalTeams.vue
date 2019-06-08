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
                  No international teams available...
              </v-alert>
          </template>
          <template v-slot:items="props" class="ma-0 pa-0">
              <tr class="ma-0 pa-0">
                <td class="body-2">{{ props.item.rank.value }}</td>
                <td class="body-2">{{ props.item.name.value }}</td>
                <td class="body-2">{{ props.item.confed.value }}</td>
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
        { text: 'Rank', sortable: true, value: 'rank.value', class: 'title' },
        { text: 'Team', sortable: true, value: 'name.value', class: 'title' },
        { text: 'Confederation', sortable: true, value: 'confed.value', class: 'title' }
      ],
      teams: []
    }
  },
  mounted: async function () {
    try {
      var response = await axios.get('http://localhost:8090/internationalTeams')
      this.teams = response.data
    } catch (e) {
      return (e)
    }
  }
}
</script>
