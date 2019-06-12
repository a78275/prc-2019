<template>
  <v-app>
    <v-layout>
      <v-flex xs12>
        <SideBar />
        <v-container>
          <h1 style="font-size:3em;" class="text-xs-center">TEAMS</h1>
          <v-divider></v-divider>
          <Teams class="mb-4" />
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
import Teams from '@/components/Teams'

export default {
  components: {
    SideBar, Teams
  }
}
</script>
