<template>
  <v-timeline class="text-xs-center" align-start justify-center row fill-height>
    <v-timeline-item
    v-for="(g, i) in games"
    :key="i"
    :color="colors[i%2]"
    small
    >
      <template v-slot:opposite>
        <span
          class="timeline"
          :class="`subheading font-weight-bold ${colors[i]}--text`"
          v-text="g.date.value"
        ></span>
      </template>

      <v-card>
        <v-card-title class="justify-center">
          <v-chip class="timeline" left color="grey">
            <span>{{ g.impHome.value }}</span>
          </v-chip>
          <h2 class="timeline font-weight-light">{{ g.homeTeam.value }}</h2>
          <template v-if="parseInt(g.scHome.value) > parseInt(g.scVisitor.value)">
            <v-chip class="timeline" color="green" dark>{{ g.scHome.value }}</v-chip> <b>-</b> <v-chip class="timeline" color="red" dark>{{ g.scVisitor.value }}</v-chip>
          </template>
          <template v-else-if="parseInt(g.scHome.value) < parseInt(g.scVisitor.value)" class="font-weight-bold">
            <v-chip class="timeline" color="red" dark>{{ g.scHome.value }}</v-chip> - <v-chip class="timeline" color="green" dark>{{ g.scVisitor.value }}</v-chip>
          </template>
          <template v-else>
            <v-chip class="timeline" color="primary" dark>{{ g.scHome.value }}</v-chip> - <v-chip class="timeline" color="primary" dark>{{ g.scVisitor.value }}</v-chip>
          </template>
          <h2 class="timeline font-weight-light">{{ g.visitorTeam.value }}</h2>
          <v-chip class="timeline" left color="grey">
            <span>{{ g.impVisitor.value }}</span>
          </v-chip>
        </v-card-title>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Fjalla+One');

.timeline {
  font-family: "Fjalla One", sans-serif;
}
</style>

<script>
import axios from 'axios'

export default {
  props: ['idLeague'],
  data: () => ({
    games: [],
    colors: ['#424242', 'red']
  }),
  mounted: async function () {
    try {
      var response = await axios.get('http://localhost:8090/leagueGames/' + this.idLeague)
      this.games = response.data
    } catch (e) {
      return (e)
    }
  }
}
</script>
