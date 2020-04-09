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
        <!--INSERT DESCRIPTION?-->
        <button class="btn btn-outline-secondary btn-sm" @click="addToCart(item)">Add to Cart</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ProductList',
  data() {
    return {
     items: [],
     cartItems: [],
     addItem: null,
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async getCartItems() {
      try {
        let response = await axios.get("/api/cartItems");
        this.cartItems = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async addToCart(item) {
      //need to check by ?item name? if item already exists in cartItems, if so, update quantity

      try {
        let response = await axios.post('/api/cartItems', {
          name: item.name,
          path: item.path,
          price: item.price,
          quantity: 1,
        });

        this.addItem = response.data;

      } catch(error) {
        console.log(error)
      }
    },
    //NOT EDITED YET
    async addToCartOldVerion(product) {
      if (this.$root.$data.cart.includes(product)) {
        let index = this.$root.$data.cart.indexOf(product);
        this.$root.$data.quantity[index] = this.$root.$data.quantity[index] + 1;
        this.$root.$data.quantity.push(0);
        this.$root.$data.quantity.pop();
      }
      else {
        this.$root.$data.cart.push(product);
        this.$root.$data.quantity.push(1);
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
