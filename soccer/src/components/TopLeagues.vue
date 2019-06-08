<template>
  <v-item-group>
    <v-container grid-list-md class="ma-0 pa-0 mt-3">
      <v-layout wrap>
        <v-flex
          xs12
          md6
        >
          <h2 class="pb-3 text-xs-center">Portuguese Liga</h2>
          <v-item>
            <v-card>
              <v-data-table
                :headers="headers"
                :items="portugal"
                hide-actions
                disable-initial-sort
                >
                <template v-slot:no-data>
                  <v-alert :value="true" color="error" icon="warning">
                    No team results available...
                  </v-alert>
                </template>
                <template v-slot:items="props">
                  <tr class="ma-0 pa-0">
                    <td class="body-2">{{ props.item.pnt.value }}</td>
                    <td class="body-2">{{ props.item.name.value }}</td>
                    <td class="body-2">{{ props.item.scored.value }}</td>
                    <td class="body-2">{{ props.item.suffered.value }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-item>
        </v-flex>

        <v-flex
          xs12
          md6
        >
          <h2 class="pb-3 text-xs-center">Barclays Premier League</h2>
          <v-item>
            <v-card>
              <v-data-table
                :headers="headers"
                :items="england"
                hide-actions
                disable-initial-sort
                >
                <template v-slot:no-data>
                  <v-alert :value="true" color="error" icon="warning">
                    No team results available...
                  </v-alert>
                </template>
                <template v-slot:items="props">
                  <tr class="ma-0 pa-0">
                    <td class="body-2">{{ props.item.pnt.value }}</td>
                    <td class="body-2">{{ props.item.name.value }}</td>
                    <td class="body-2">{{ props.item.scored.value }}</td>
                    <td class="body-2">{{ props.item.suffered.value }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-item>
        </v-flex>

        <v-flex
          xs12
          md6
        >
          <h2 class="pt-2 pb-3 text-xs-center">Spanish Primera Division</h2>
          <v-item>
            <v-card>
              <v-data-table
                :headers="headers"
                :items="spain"
                hide-actions
                disable-initial-sort
                >
                <template v-slot:no-data>
                  <v-alert :value="true" color="error" icon="warning">
                    No team results available...
                  </v-alert>
                </template>
                <template v-slot:items="props">
                  <tr class="ma-0 pa-0">
                    <td class="body-2">{{ props.item.pnt.value }}</td>
                    <td class="body-2">{{ props.item.name.value }}</td>
                    <td class="body-2">{{ props.item.scored.value }}</td>
                    <td class="body-2">{{ props.item.suffered.value }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-item>
        </v-flex>

        <v-flex
          xs12
          md6
        >
          <h2 class="pt-2 pb-3 text-xs-center">Italy Serie A</h2>
          <v-item>
            <v-card>
              <v-data-table
                :headers="headers"
                :items="italy"
                hide-actions
                disable-initial-sort
                >
                <template v-slot:no-data>
                  <v-alert :value="true" color="error" icon="warning">
                    No team results available...
                  </v-alert>
                </template>
                <template v-slot:items="props">
                  <tr class="ma-0 pa-0">
                    <td class="body-2">{{ props.item.pnt.value }}</td>
                    <td class="body-2">{{ props.item.name.value }}</td>
                    <td class="body-2">{{ props.item.scored.value }}</td>
                    <td class="body-2">{{ props.item.suffered.value }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-item>
        </v-flex>
      </v-layout>
    </v-container>
  </v-item-group>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Fjalla+One");

h2 {
  font-family: 'Fjalla One', sans-serif;
}
</style>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      headers: [
        { text: 'Points', sortable: false, value: 'pnt.value', class: 'title' },
        { text: 'Team', align: 'left', sortable: false, value: 'name.value', class: 'title' },
        { text: 'Scored', align: 'left', sortable: false, value: 'scored.value', class: 'title' },
        { text: 'Suffered', align: 'left', sortable: false, value: 'suffered.value', class: 'title' }
      ],
      england: [],
      spain: [],
      portugal: [],
      italy: []
    }
  },
  mounted: async function () {
    try {
      var en = await axios.get('http://localhost:8090/englandtop5')
      this.england = en.data
      var sp = await axios.get('http://localhost:8090/spaintop5')
      this.spain = sp.data
      var pt = await axios.get('http://localhost:8090/portugaltop5')
      this.portugal = pt.data
      var it = await axios.get('http://localhost:8090/italytop5')
      this.italy = it.data
    } catch (e) {
      return (e)
    }
  }
}
</script>
