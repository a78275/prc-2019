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
        <h1 style="font-size:3em;" class="text-xs-center">INTERNATIONAL TEAMS</h1>
        <v-divider></v-divider>
        <InternationalTeams class="mb-4" />
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
import InternationalTeams from '@/components/InternationalTeams'

export default {
  components: {
    SideBar, InternationalTeams
  }
}
</script>
