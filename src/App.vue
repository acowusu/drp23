<script lang="ts">
import { NMessageProvider } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    NMessageProvider,
  },
});
</script>
<template>
  <n-message-provider>
    <nav>
      <router-link data-test="/today" to="/today">Today's events</router-link> |
      <router-link data-test="/subscriptions" to="/subscriptions"
        >Subscriptions</router-link
      >
      |
      <router-link data-test=">Browse" to="/"
        >Browse Events and Societies</router-link
      >
      |
      <router-link data-test="/myevents" to="/myevents">My Events</router-link>
      |
      <router-link data-test="/societyhomepage" to="/societyhomepage"
        >Edit Society</router-link
      >| <router-link data-test="/account" to="/account">Account</router-link> |
      <router-link data-test="/messages" to="/messages"
        >Announcements</router-link
      >
    </nav>
    <router-view />
  </n-message-provider>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
