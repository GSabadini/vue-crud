<template lang="html">
  <div id="sidebar">
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-toolbar class="elevation-0" color="grey lighten-4">
        <v-layout row justify-center>
          <v-flex xs2>
            <a title="Documentação "href="https://vuetifyjs.com/en/" target="_blank">
              <img src="@/assets/logo.png" width="40sem"></img>
            </a>
          </v-flex>
        </v-layout>
      </v-toolbar>
      <v-list dense>
        <v-list-tile to="/form">
          <v-list-tile-action>
            <v-icon>note_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Formulário</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/list">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Listagem</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar ligth app fixed class="elevation-1" color="grey lighten-4">
      <v-toolbar-side-icon color="primary" @click.stop="toogleDrawer()"></v-toolbar-side-icon>
      <v-toolbar-title>Processo Seletivo - CRMALL</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>

export default {
  name: 'Sidebar',
  data: () => ({
    drawer: false
  }),
  methods: {
    toogleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style lang="css">
#sidebar
logo {
	display: flex;
	align-items: center;
	justify-content: center;
}

logo .toolbar__content {
	align-items: center;
	justify-content: center;
}

.sidebar-link {
	color: #fff;
}
color-toolbar {
  color: #FF7F2B;
  }
</style>
