<template>
  <v-app>
    <v-layout>
      <v-flex xs12>
        <SideBar />
        <v-container>
          <h1 style="font-size:3em;" class="text-xs-center">LEAGUES</h1>
          <v-divider></v-divider>
          <Leagues class="mb-4" />
        </v-container>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Fjalla+One");

h1 {
  font-family: 'Fjalla One', sans-serif;
}
</style>

<script>
import SideBar from '@/components/SideBar'
import Leagues from '@/components/Leagues'

export default {
  components: {
    SideBar, Leagues
  }
}
</script>
