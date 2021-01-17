<template>
  <div class="favorite-restaurants">
    <h1>お気に入り hotpepperより</h1>
    現在20件までしか表示できません
    <Restaurant v-for="sr in restaurants" 
      v-bind:key="sr.id" 
      v-bind:id="sr.id"
      v-bind:name="sr.name"
      v-bind:imgUrl="sr.img_url"
      v-bind:is_favorited="sr.is_favorited"
      v-bind:hotpepperUrl="sr.hotpepper_url"></Restaurant>
  </div>
</template>

<script>
import Restaurant from './Restaurant'
export default {
  components: {
    Restaurant
  },
  name: 'FavoriteRestaurants',
  data() {
    return {
      restaurantName: '',
      defaultUrl: '/favoriteRestaurants',
      restaurants: []
    }
  },
  methods: {
  },
  mounted: async function() {
    let rtn = await this.$store.dispatch('restaurant/favorites');
    if (!rtn) {
      alert("通信に失敗しました");
      return;
    }
    this.restaurants = rtn['data'];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
