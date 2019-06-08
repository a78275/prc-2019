<template>
  <v-app>
    <v-layout>
      <v-flex xs12>
        <SideBar />
      </v-flex>
    </v-layout>
    <v-layout class="align-start">
      <v-flex xs12>
        <v-tabs
          background-color="white"
          dark
          fixed-tabs
          slider-color="red"
        >
          <v-tab class='font-weight-bold subheading tabName'>About</v-tab>
          <v-tab class='font-weight-bold subheading tabName'>Games</v-tab>

          <v-tab-item>
            <v-layout wrap>
              <v-flex xs12>
                <AboutTeam :idTeam="$route.params.id"/>
              </v-flex>
            </v-layout>
          </v-tab-item>

          <v-tab-item>
            <v-layout wrap>
              <v-flex xs12 mx-4>
                <GamesTeam :idTeam="$route.params.id" />
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
import AboutTeam from '@/components/AboutTeam'
import GamesTeam from '@/components/GamesTeam'

export default {
  components: {
    SideBar, AboutTeam, GamesTeam
  }
}
</script>
