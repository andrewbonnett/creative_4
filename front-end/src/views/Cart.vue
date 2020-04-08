<template>

<div class="cart-page-container">
  <p v-if="this.$root.$data.cart.length === 0" style="text-align: center;">No items in cart.</p>
    <div v-else>
      <div class="cart-heading">Your Cart</div>

      <hr>
        <div class="row">
          <div class="cart-text col-sm">Item<a v-if="this.$root.$data.cart.length > 1">s</a></div>
          <div class="cart-text col-sm">
          </div>
          <div class="cart-text-2 col-sm">
            Price
          </div>
          <div class="cart-text-2 col-sm">Qty</div>
          <div class="cart-text-2 col-sm"></div>
        </div>
      <hr>

      <div v-for="(item, index) in this.$root.$data.cart" :key="item.id">
        <div class="row">
          <div class="col-sm">
            <img :src="'/images/products/'+item.image" width="100%">
          </div>
          <div class="cart-text col-sm">
            {{item.name}}
          </div>
          <div class="cart-text-2 col-sm">
            ${{item.price.toFixed(2)}}
          </div>
          <div class="cart-text-2 col-sm">
            {{$root.$data.quantity[index]}}  <!--FIX QUANTITY -->
          </div>
          <div class="cart-text-2 col-sm">
            <button class="btn btn-outline-secondary" @click="removeFromCart(item.id)">Remove Item</button>
          </div>
        </div>
        <hr>
      </div>
      <div class="row">
        <div class="col-sm-5">
        </div>
        <div class="cart-text-2 col-sm">
          Subtotal: ${{totalPrice.toFixed(2)}}
        </div>
        <div class="cart-text-2 col-sm">
          Items: {{numQuantity}}
        </div>
        <div class="col-sm"></div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'Cart',
  methods: {
    removeFromCart(id) {
      for (let i = 0; i < this.$root.$data.cart.length; i++) {
        if (this.$root.$data.cart[i].id === id) {
          this.$root.$data.quantity .splice(i,1);
          this.$root.$data.cart.splice(i,1);
        }
      }
    }
  },
  computed: {
    numQuantity() {
      let total = 0;
      for (let i = 0; i < this.$root.$data.quantity.length; i++)
        total += this.$root.$data.quantity[i];
      return total;
    },
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.$root.$data.quantity.length; i++)
        total += this.$root.$data.quantity[i] * this.$root.$data.cart[i].price;
      return total;
    }
  }
}
</script>

<style scoped>

img {
  width: 100%;
}

.cart-heading {
  text-align: left;
  font-size: 30px;
  color: black;
  font-family:"Arial Black", Gadget, sans-serif;
}

.cart-page-container {
  margin: auto;
  padding-top: 35px;
  padding-bottom: 85px;
  background-color: white;
  width:65%;
}

.cart-text {
  margin: auto;
  font-size: 24px;
}

.cart-text-2 {
  font-size: 24px;
  text-align: right;
  margin: auto;
}

</style>
