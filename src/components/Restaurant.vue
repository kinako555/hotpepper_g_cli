<template>
  <div class="restaurant">
    <a v-bind:href="hotpepperUrl" target="blank"><img v-bind:src="imgUrl" v-bind:alt="name"><br />{{name}}</a>
    <div v-if="isFavorited">
      <button v-on:click="unfavorite(id)">解除</button>
    </div>
    <div v-else>
      <button v-on:click="favorite(id)">お気に入り</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Restaurant',
  data() {
    return {
      isFavorited: this.is_favorited
    }
  },
  props: {
    id: String,
    name: String,
    imgUrl: String,
    is_favorited: Boolean,
    hotpepperUrl: String,
  },
  methods: {
    favorite: async function(id) {
      let rtn = await this.$store.dispatch('restaurant/favorite', id);
      if (!rtn) {
        alert("通信に失敗しました");
        return;
      }
      this.isFavorited = true;
    },
    unfavorite: async function(id) {
      let rtn = await this.$store.dispatch('restaurant/unfavorite', id);
      if (!rtn) {
        alert("通信に失敗しました");
        return;
      }
      this.isFavorited = false;
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
