<template>

<v-bottom-navigation grow>
  <v-btn value="main" to="/landingView">
    <v-icon>mdi-history</v-icon>

    <span>Público</span>
  </v-btn>

  <v-btn value="main" to="/loginView">
    <v-icon>mdi-history</v-icon>

    <span>Login</span>
  </v-btn>

  <v-btn value="gestion" to="/adminView">
    <v-icon>mdi-heart</v-icon>

    <span>Gestión</span>
  </v-btn>
</v-bottom-navigation>
</template>


<script>

</script>