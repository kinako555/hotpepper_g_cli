<template>
  <header id="header" class="navbar navbar-dark bg-dark">
    <a href="#" class="navbar-brand">ホットペッパーグルメ管理サイト</a>
    <ul>
      <button class="button is-block is-info is-large is-fullwidth"
      v-on:click="logout" v-if="isLogin">ログアウト</button>
    </ul>
  </header>
</template>

<script>
export default {
  methods: {
    logout: async function() {
      await this.$store.dispatch('auth/destroy');
      console.log('Logout');
      this.$router.push('/login'); 
    }
  },
  computed: {
    isLogin: function(){
      return this.$parent.isLogin;
    }
  }
}
</script>

<style scoped>
</style>