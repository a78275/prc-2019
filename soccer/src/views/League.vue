<template>
  <v-container>
    <v-layout>
      <v-flex xs2>
        <SideBar />
      </v-flex>
      <v-flex xs10 class="text-xs-center">
        <div>
          <v-tabs v-model="active" color="gray" dark slider-color="red">
            <v-tab ripple>
              Teams
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text><LeagueTeams :idLeague="$route.params.id"/></v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab ripple>
              Games
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text><Games :idLeague="$route.params.id"/></v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SideBar from '@/components/SideBar'

export default {
  components: {
    SideBar
  }
}
</script>
