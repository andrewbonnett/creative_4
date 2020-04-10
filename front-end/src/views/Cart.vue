<template>

<div class="cart-page-container">
  <p v-if="this.$root.$data.cart.length === 0" style="text-align: center;">No items in cart.</p>
    <div v-else>
      <div class="cart-heading">Your Cart</div>

      <hr>
        <div class="row">
          <div class="cart-text col-sm">Item<a v-if="this.cartItems.length > 1">s</a></div>
          <div class="cart-text col-sm">
          </div>
          <div class="cart-text-2 col-sm">
            Price
          </div>
          <div class="cart-text-2 col-sm">Qty</div>
          <div class="cart-text-2 col-sm"></div>
        </div>
      <hr>

      <div v-for="(item, index) in this.cartItems" :key="item.name">
        <div class="row">
          <div class="col-sm">
            <img :src=item.path width="100%">
          </div>
          <div class="cart-text col-sm">
            {{item.name}}
          </div>
          <div class="cart-text-2 col-sm">
            ${{item.price.toFixed(2)}}
          </div>
          <div class="cart-text-2 col-sm">
            {{quantities[index]}}  <!--FIX QUANTITY -->
          </div>
          <div class="cart-text-2 col-sm">
            <button class="btn btn-outline-secondary" @click="removeFromCart(item.name)">Remove Item</button>
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
import axios from 'axios';
export default {
  name: 'Cart',
  data () {
    return {
      cartItems: [],
      quantities: []
    }
  },
  created() {
    this.getCartItems();
  },
  methods: {
    async getCartItems() {
      try {
        let response = await axios.get("/api/cartItems");
        this.$root.$data.cart = response.data;
        this.getQuantities();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getCartItemsForNum() {
      try {
        let response = await axios.get("/api/cartItems");
        this.$root.$data.cart = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    removeFromCart(name) {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].name === name) {
          this.deleteItem(this.cartItems[i]);
          this.quantities.splice(i,1);
          this.cartItems.splice(i,1);
        }
      }
      this.getCartItemsForNum();
    },
    async deleteItem(item) {
        await axios.delete("/api/cartItems/" + item.name);
        return true;
    },
    getQuantities() {
      var flag = true;
      for (let i = 0; i < this.$root.$data.cart.length; i++) {
        for (let j = 0; j < this.cartItems.length; j++) {
          if (this.$root.$data.cart[i].name === this.cartItems[j].name) {
            this.quantities[j]++;
            flag = false;
          }
        }
        if (flag === true) {
          this.cartItems.push(this.$root.$data.cart[i]);
          this.quantities.push(1);
        } else
        flag = true;
      }
    }
  },
  computed: {
    numQuantity() {
      let total = 0;
      for (let i = 0; i < this.quantities.length; i++)
        total += this.quantities[i];
      return total;
    },
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.quantities.length; i++)
        total += this.quantities[i] * this.cartItems[i].price;
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
