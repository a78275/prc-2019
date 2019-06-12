<template>
  <v-container>
    <v-card
      color="grey darken-1"
      class="elevation-12 mt-4"
      dark
    >
      <v-card-title>
          <img
            style="display:block;margin-left:auto;margin-right:auto;"
            :src="`${logo}`"
            width="20%"
          >
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        <h1 v-if="homepage" class="text text-xs-center"><a :href="`${homepage}`">{{ name }}</a></h1>
        <h1 v-else class="text text-xs-center">{{ name }}</h1>
        <br>
        <h4 v-if="comment" class="text">{{ comment }}</h4>
        <br>
        <v-expansion-panel v-if="abstract">
          <v-expansion-panel-content>
            <template v-slot:header>
              <div><h4 class="text">Abstract</h4></div>
            </template>
            <v-card>
              <v-card-text><h5 v-if="abstract" class="text">{{ abstract }}</h5></v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <br>
        <v-expansion-panel v-if="manager">
          <v-expansion-panel-content>
            <template v-slot:header>
              <div><h4 class="text">Manager: {{ manager }}</h4></div>
            </template>
            <v-card>
              <v-card-text><h5 v-if="managerAbstract" class="text">{{ managerAbstract }}</h5></v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Fjalla+One');

.text {
  font-family: "Fjalla One", sans-serif;
}

a:link {
  color: black;
  background-color: transparent;
  text-decoration: none;
}

a:visited {
  color: black;
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  color: white;
  background-color: transparent;
  text-decoration: none;
}

a:active {
  color: white;
  background-color: transparent;
  text-decoration: none;
}
</style>

<script>
import axios from 'axios'

export default {
  props: ['idTeam'],
  data: () => ({
    comment: '',
    name: '',
    logo: '',
    abstract: '',
    manager: '',
    managerAbstract: '',
    homepage: ''
  }),
  mounted: async function () {
    try {
      var notfound = 'https://i.imgur.com/uCIs9Yy.png'
      var response = await axios.get('http://localhost:8090/teamComment/' + this.idTeam)
      this.comment = response.data
      response = await axios.get('http://localhost:8090/name/' + this.idTeam)
      this.name = response.data
      response = await axios.get('http://localhost:8090/teamLogo/' + this.idTeam)
      if (response.data.length > 0) {
        this.logo = response.data
      } else {
        this.logo = notfound
      }
      response = await axios.get('http://localhost:8090/abstract/' + this.idTeam)
      this.abstract = response.data
      response = await axios.get('http://localhost:8090/teamManagerName/' + this.idTeam)
      this.manager = response.data
      response = await axios.get('http://localhost:8090/teamManagerAbstract/' + this.idTeam)
      this.managerAbstract = response.data
      response = await axios.get('http://localhost:8090/teamHomepage/' + this.idTeam)
      this.homepage = response.data
    } catch (e) {
      return (e)
    }
  }
}
</script>
