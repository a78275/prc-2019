<template>
  <v-container class="ma-0 pa-0 mt-3">
    <v-card>
      <v-data-table
        :headers="headers"
        :items="leagues"
        hide-actions
      >
          <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="warning">
                  No leagues available...
              </v-alert>
          </template>
          <template v-slot:items="props" class="ma-0 pa-0">
              <tr class="ma-0 pa-0" @click="getLeague(props.item)">
                  <td class="body-2">{{ props.item.name.value }}</td>
                  <td class="body-2" v-if="props.item.country">{{ props.item.country.value }}</td>
                  <td v-else></td>
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
        { text: 'Leagues', sortable: true, value: 'name', class: 'subheading' },
        { text: 'Country', sortable: true, value: 'country', class: 'subheading' }
      ],
      leagues: []
    }
  },
  mounted: async function () {
    try {
      var response = await axios.get('http://localhost:8090/leagues')
      this.leagues = response.data
    } catch (e) {
      return (e)
    }
  },
  methods: {
    getLeague: function (item) {
      console.log(JSON.stringify(item))
      this.$router.push('/league/' + item)
    }
  }
}
</script>
