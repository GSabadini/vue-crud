<template lang="html">
  <v-content>
    <sidebar/>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-container>
  </v-content>
</template>

<script>
import Sidebar from '@/components/Arch/Sidebar'

export default {
  name: 'Layout',
  components: {
    Sidebar
  }
}
</script>
