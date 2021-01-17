<template>
  <div class="search-restaurants">
    <h1>飲食店検索 hotpepperより</h1>
    
    <div class="field">
      <div class="control">
        <input class="input is-large"
               type="text"
               placeholder="食品検索"
               v-model="restaurantName"
               name="restaurantName">
      </div>
    </div>
    <button class="btn btn-primary" 
        v-on:click="search" 
        v-bind:disabled="restaurantName==''">検索</button>
    <Restaurant v-for="sr in searchedRestaurants" 
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
  name: 'SearchRestaurants',
  data() {
    return {
      restaurantName: '',
      defaultUrl: '/restaurants',
      searchedRestaurants: []
    }
  },
  methods: {
    search: async function() {
      let rtn = await this.$store.dispatch('restaurant/search', this.formatUrl());
      if (!rtn) {
        alert("通信に失敗しました");
        return;
      }
      this.searchedRestaurants = rtn['data'];
    },
    formatUrl: function() {
      return this.defaultUrl + "?name=" + this.restaurantName;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
