<template>
  <v-toolbar height="80" id="items">
    <img src="../../public/logoo.png" height="70" @click="getIndex()">
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat><h1>Teams</h1></v-btn>
      <v-btn flat @click="getLeagues()"><h1>Leagues</h1></v-btn>
      <v-btn flat><h1>International Teams</h1></v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Fjalla+One');

#items {
  font-family: "Fjalla One", sans-serif;
}
</style>

<script>
export default {
  methods: {
    getLeagues: function () {
      this.$router.push('/leagues')
    },
    getIndex: function () {
      this.$router.push('/')
    }
  }
}
</script>
