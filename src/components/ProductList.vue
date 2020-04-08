<template>
<div class="wrapper">
  <div class="products">
    <div class="product" v-for="product in products" :key="product.id">
      <div class="image">
        <img :src="'/images/products/'+product.image">
      </div>
      <div class="info">
        <h1>{{product.name}}</h1>
        <h2 class="price">${{product.price.toFixed(2)}}</h2>
        <button class="btn btn-outline-secondary btn-sm" @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    products: Array
  },
  methods: {
    addToCart(product) {
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
