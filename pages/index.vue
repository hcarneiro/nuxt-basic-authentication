<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">
        nuxt-basic-authentication
      </h1>
      <h2 class="subtitle">
        An example project on how to use HTTP authorization in Nuxt.js
      </h2>
      <div class="is-authenticated">
        <h3>
          Authentication status:
        </h3>
        <p :class="{ 'danger': !authenticated }">
          {{ authenticated }}
        </p>
        <div v-if="authenticated" class="logout-btn" @click="logout">
          Logout
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Logo
  },
  computed: {
    ...mapState({
      authenticated: (state) => {
        return state.auth.authenticated
      }
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.is-authenticated {
  padding-top: 30px;
  text-align: center;
}

.is-authenticated h3 {
  font-size: 42px;
  color: #35495e;
}

.is-authenticated p {
  font-size: 32px;
  color: #41b883;
}

.is-authenticated p.danger {
  color: #F44336;
}

.logout-btn {
  margin-top: 20px;
  padding: 6px 12px;
  cursor: pointer;
  opacity: 0.6;
}

.logout-btn:hover {
  opacity: 1;
}
</style>
