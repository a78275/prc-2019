<template>
  <v-container>
    <v-card
      color="grey darken-1"
      class="elevation-12 mt-4"
      dark
    >
      <v-card-text class="headline font-weight-bold">
        <h1 v-if="homepage" class="text text-xs-center mt-4"><a :href="`${homepage}`">{{ name }}</a></h1>
        <h1 v-else class="text text-xs-center mt-4">{{ name }}</h1>
        <br>
        <h5 v-if="abstract" class="text">{{ abstract }}</h5>
        <img v-else src="../../public/underconstruction.png" width="100%">
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
  props: ['idLeague'],
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
      var response = await axios.get('http://localhost:8090/name/' + this.idLeague)
      this.name = response.data
      response = await axios.get('http://localhost:8090/abstract/' + this.idLeague)
      this.abstract = response.data
      response = await axios.get('http://localhost:8090/homepage/' + this.idLeague)
      this.homepage = response.data
    } catch (e) {
      return (e)
    }
  }
}
</script>
