<template>
<v-container text-xs-center>
  <v-layout row wrap mt-4>
    <v-flex xs-2 class="grey--text text--darken-3">
      <p class="text stat">{{ numberGames }}</p>
      <p class="text label">Games</p>
    </v-flex>

    <v-flex xs-2 class="red--text text--darken-1">
      <p class="text stat">{{ victories }}</p>
      <p class="text label">Victories</p>
    </v-flex>

    <v-flex xs-2 class="grey--text text--darken-3">
      <p class="text stat">{{ defeats }}</p>
      <p class="text label">Defeats</p>
    </v-flex>

    <v-flex xs-2 class="red--text text--darken-1">
      <p class="text stat">{{ ties }}</p>
      <p class="text label">Ties</p>
    </v-flex>

    <v-flex xs-2 class="grey--text text--darken-3">
      <p class="text stat">{{ numberGoals }}</p>
      <p class="text label">Scored Goals</p>
    </v-flex>

    <v-flex xs-2 class="red--text text--darken-1">
      <p class="text stat">{{ sufferedGoals }}</p>
      <p class="text label">Suffered Goals</p>
    </v-flex>
  </v-layout>

  <v-layout row wrap mt-5>
    <v-flex xs-2 class="red--text text--darken-1">
      <p class="text stat">{{ gamesHome }}</p>
      <p class="text label">Home Games</p>
    </v-flex>

    <v-flex xs-2 class="grey--text text--darken-3">
      <p class="text stat">{{ victoriesHome }}</p>
      <p class="text label">Home Victories</p>
    </v-flex>

    <v-flex xs-2 class="red--text text--darken-1">
      <p class="text stat">{{ defeatsHome }}</p>
      <p class="text label">Home Defeats</p>
    </v-flex>

    <v-flex xs-2 class="grey--text text--darken-3">
      <p class="text stat">{{ tiesHome }}</p>
      <p class="text label">Home Ties</p>
    </v-flex>

    <v-flex xs-2 class="red--text text--darken-1">
      <p class="text stat">{{ scoredHome }}</p>
      <p class="text label">Home Scored Goals</p>
    </v-flex>

    <v-flex xs-2 class="grey--text text--darken-3">
      <p class="text stat">{{ sufferedHome }}</p>
      <p class="text label">Home Suffered Goals</p>
    </v-flex>

  </v-layout>

  <v-layout row wrap mt-5>

    <v-flex xs-2 class="grey--text text--darken-3">
      <p class="text stat">{{ gamesAway }}</p>
      <p class="text label">Away Games</p>
    </v-flex>

    <v-flex xs-2 class="red--text text--darken-1">
      <p class="text stat">{{ victoriesAway }}</p>
      <p class="text label">Away Victories</p>
    </v-flex>

    <v-flex xs-2 class="grey--text text--darken-3">
      <p class="text stat">{{ defeatsAway }}</p>
      <p class="text label">Away Defeats</p>
    </v-flex>

    <v-flex xs-2 class="red--text text--darken-1">
      <p class="text stat">{{ tiesAway }}</p>
      <p class="text label">Away Ties</p>
    </v-flex>

    <v-flex xs-2 class="grey--text text--darken-3">
      <p class="text stat">{{ scoredAway }}</p>
      <p class="text label">Away Scored Goals</p>
    </v-flex>

    <v-flex xs-2 class="red--text text--darken-1">
      <p class="text stat">{{ sufferedAway }}</p>
      <p class="text label">Away Suffered Goals</p>
    </v-flex>

  </v-layout>
</v-container>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Fjalla+One');

.text {
  font-family: "Fjalla One", sans-serif;
}

.stat {
  font-size: 5em;
  font-weight: 900;
}

.label {
  font-size: 1.5em;
  font-weight: 500;
}
</style>

<script>
import axios from 'axios'

export default {
  props: ['idTeam'],
  data: () => ({
    numberGames: 0,
    gamesHome: '',
    gamesAway: '',
    numberGoals: '',
    scoredHome: '',
    scoredAway: '',
    victories: '',
    victoriesHome: '',
    victoriesAway: '',
    defeats: '',
    defeatsHome: '',
    defeatsAway: '',
    ties: '',
    tiesHome: '',
    tiesAway: '',
    sufferedGoals: '',
    sufferedHome: '',
    sufferedAway: ''
  }),
  mounted: async function () {
    try {
      var response = await axios.get('http://localhost:8090/teamNumberGames/' + this.idTeam)
      var ngames = response.data
      this.gamesHome = ngames.gamesHome.value
      this.gamesAway = ngames.gamesAway.value
      this.numberGames = parseInt(this.gamesHome) + parseInt(this.gamesAway)

      response = await axios.get('http://localhost:8090/teamScoredGoals/' + this.idTeam)
      var scored = response.data
      this.scoredHome = scored.scoredHome.value
      this.scoredAway = scored.scoredAway.value
      this.numberGoals = parseInt(this.scoredHome) + parseInt(this.scoredAway)

      response = await axios.get('http://localhost:8090/teamSufferedGoals/' + this.idTeam)
      var suf = response.data
      this.sufferedHome = suf.sufferedHome.value
      this.sufferedAway = suf.sufferedAway.value
      this.sufferedGoals = parseInt(this.sufferedHome) + parseInt(this.sufferedAway)

      response = await axios.get('http://localhost:8090/teamVictories/' + this.idTeam)
      var vic = response.data
      this.victoriesHome = vic.victoriesHome.value
      this.victoriesAway = vic.victoriesAway.value
      this.victories = parseInt(this.victoriesHome) + parseInt(this.victoriesAway)

      response = await axios.get('http://localhost:8090/teamDefeats/' + this.idTeam)
      var def = response.data
      this.defeatsHome = def.defeatsHome.value
      this.defeatsAway = def.defeatsAway.value
      this.defeats = parseInt(this.defeatsHome) + parseInt(this.defeatsAway)

      response = await axios.get('http://localhost:8090/teamTies/' + this.idTeam)
      var tie = response.data
      this.tiesHome = tie.tiesHome.value
      this.tiesAway = tie.tiesAway.value
      this.ties = parseInt(this.tiesHome) + parseInt(this.tiesAway)
    } catch (e) {
      return (e)
    }
  }
}
</script>
