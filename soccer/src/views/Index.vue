<template>
  <v-app>
    <v-layout>
      <v-flex xs12>
        <SideBar />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-container>
        <h1 style="font-size:3em;" class="text-xs-center">TOP 10 TEAMS</h1>
        <v-divider></v-divider>
        <Top10 class="mb-4"/>
        <h1 style="font-size:3em;" class="text-xs-center">TOP LEAGUES</h1>
        <v-divider></v-divider>
        <TopLeagues/>
        </v-container>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Fjalla+One');

h1 {
  font-family: "Fjalla One", sans-serif;
}

body {
  background: #e8e8e8;
}
</style>

<script>
import SideBar from '@/components/SideBar'
import Top10 from '@/components/Top10'
import TopLeagues from '@/components/TopLeagues'

export default {
  components: {
    SideBar,
    Top10,
    TopLeagues
  }
}
</script>
