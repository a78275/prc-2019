<template>
  <v-container class="text-xs-center ma-0 pa-0 mt-3">
    <v-data-table
      :headers="headers"
      :items="teams"
      dark
      hide-actions
    >
        <template v-slot:no-data>
            <v-alert :value="true" color="error" icon="warning">
                Não foi possível apresentar uma lista de equipas...
            </v-alert>
        </template>
        <template v-slot:items="props" class="text-xs-center ma-0 pa-0">
            <tr class="text-xs-center ma-0 pa-0">
                <td class="body-2">{{ props.item.rank.value }}</td>
                <td v-if="props.item.prev_rank.value - props.item.rank.value == 0"></td>
                <td class="body-2" v-else-if="props.item.prev_rank.value - props.item.rank.value > 0" style="color:green">+{{ props.item.prev_rank.value - props.item.rank.value }}</td>
                <td class="body-2" v-else style="color:#E53935">{{ props.item.prev_rank.value - props.item.rank.value }}</td>
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
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  props: ['idLeague'],
  data: () => ({
    leagueTeams: {}
  }),
  mounted: async function () {
    try {
      var response = await axios.get(this.idLeague)
      this.leagueTeams = response.data
    } catch (e) {
      return (e)
    }
  }
}
</script>

<style>
</style>
