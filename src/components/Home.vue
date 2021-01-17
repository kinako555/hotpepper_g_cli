<template>
  <div id="home">
    ホーム
    <p>
		<button v-on:click="switchPage('search')"   class="btn btn-secondary">検索</button>
		<button v-on:click="switchPage('favorite')" class="btn btn-secondary">お気に入り</button>
    </p>
    <component :is="currentPage"></component>
  </div>  
</template>

<script>
import SearchRestaurants   from './SearchRestaurants'
import FavoriteRestaurants from './FavoriteRestaurants'
export default {
  name: 'Home',
  data() {
    return {
      currentPage: SearchRestaurants
    }
  },
  props: {
  },
  methods: {
    switchPage: function(page) {
      this.currentPage = page;
      switch (page) {
        case 'favorite':
          this.currentPage = FavoriteRestaurants;
          break;
        default:
          this.currentPage = SearchRestaurants;
      }
    },

  },
  watch: {
  },
  mounted: function() {
    // this.$router.push('/search_restaurants'); 
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
