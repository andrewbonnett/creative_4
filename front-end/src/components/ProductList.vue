<template>
<div class="wrapper">
  <div class="products">
    <div class="product" v-for="item in items" :key="item.id">
      <div class="image">
        <img :src="item.path">
      </div>
      <div class="info">
        <h1>{{item.name}}</h1>
        <h2 class="price">${{item.price.toFixed(2)}}</h2>
        <button class="btn btn-outline-secondary btn-sm" @click="addToCart(item)">Add to Cart</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ItemList',
  props: {
    items: Array
  },
  data() {
    return {
     addItem: null,
    }
  },
  methods: {
    async getCartItems() {
      try {
        let response = await axios.get("/api/cartItems");
        this.$root.$data.cart = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addToCart(item) {
      try {
        let response = await axios.post('/api/cartItems', {
          name: item.name,
          path: item.path,
          price: item.price
        });
        this.getCartItems();
        this.addItem = response.data;

      } catch(error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.info {
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
}

.price {
    font-family: "Arial Black", Gadget, sans-serif;
    text-align: center;
    display:inline-block;
    margin-right:10px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 75px;
}

.product {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}

.product img {
  width: 200px;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 20px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}

button {
  display: inline-block;
}
</style>
