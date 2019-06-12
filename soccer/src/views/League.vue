<template>
  <v-app>
    <v-layout>
      <v-flex xs12>
        <SideBar />
        <v-tabs
          background-color="white"
          dark
          fixed-tabs
          slider-color="red"
        >
          <v-tab class='font-weight-bold subheading tabName'>About</v-tab>
          <v-tab class='font-weight-bold subheading tabName'>Teams</v-tab>
          <v-tab class='font-weight-bold subheading tabName'>Games</v-tab>

          <v-tab-item>
            <v-layout wrap>
              <v-flex xs12>
                <About :idLeague="$route.params.id"/>
              </v-flex>
            </v-layout>
          </v-tab-item>

          <v-tab-item>
            <v-layout wrap>
              <v-flex xs12>
                <LeagueTeams :idLeague="$route.params.id"/>
              </v-flex>
            </v-layout>
          </v-tab-item>

          <v-tab-item>
            <v-layout wrap>
              <v-flex xs12 mx-4>
                <Games :idLeague="$route.params.id"/>
              </v-flex>
            </v-layout>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Fjalla+One');

.tabName {
  font-family: "Fjalla One", sans-serif;
}

body {
  background: #e8e8e8;
}
</style>

<script>
import SideBar from '@/components/SideBar'
import LeagueTeams from '@/components/LeagueTeams'
import About from '@/components/About'
import Games from '@/components/Games'

export default {
  components: {
    SideBar, LeagueTeams, About, Games
  }
}
</script>
