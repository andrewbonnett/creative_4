<template>
<div id="app">

<!-- NAVBAR-->
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-primary">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav" style="list-style: none;">
        <li class="nav-item" style="display: inline; float: none">
          <router-link to="/">
            <a class="nav-link" style="display: inline-block;">Home<span class="sr-only">(current)</span></a>
          </router-link>
        </li>
        <li class="nav-item" style="display: inline; float: none">
          <router-link to="/shop">
            <a class="nav-link" style="display: inline-block;">Shop</a>
          </router-link>
        </li>
        <li class="nav-item" style="display: inline; float: none;">
          <router-link to="/cart">
            <a class="nav-link" style="display: inline-block;">Cart ({{numCartItems}})</a>
          </router-link>
        </li>
        <li class="nav-item" style="display: inline; float: none;">
          <router-link to="/about">
            <a class="nav-link" style="display: inline-block;">About</a>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
  <!-- END NAVBAR-->

  <!-- LOGO CONTAINER -->
  <div id="logo" class="logo-container">
    <img src="images/logo.jpeg" width="300" style="text-align: center;">
  </div>
  <!-- END LOGO CONTAINER -->

  <router-view />

  <!-- FOOTER-->
  <div class="footer container2">
    <div class="row">
      <div class="col-auto mr-auto">
        <span>Drew Bonnett, Christian Lewis 2020. Please visit <a href="https://github.com/andrewbonnett/creative_4">Github</a> for the files associated with this site.</span>
      </div>
      <div class="col-auto">
        <router-link to="/admin">
          <a>Admin</a>
        </router-link>
      </div>
    </div>
  </div>
  <!-- END FOOTER-->

</div>

</template>

<script>
import axios from 'axios';
export default {
  computed: {
    numCartItems() {
      return this.$root.$data.cart.length;
    },
  },
  created() {
    if (!this.$root.$data.cart.length === 0)
      this.getCartItems();
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
  }
}
</script>

<style>

.container2 {
    width: auto;
    padding: 0 15px;
}

.navbar-light .navbar-nav .active>.nav-link, .navbar-light .navbar-nav .nav-link.active, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .show>.nav-link, .navbar-light .navbar-nav .nav-link.hover {
    color: rgb(0, 0, 0);
}

.navbar-light .navbar-nav .nav-link {
    color: rgb(0, 0, 0);
    font-size: 15px;
    font-family: Verdana, Geneva, sans-serif;
    padding-right: 36px;
    padding-left: 30px;
}

.bg-primary {
    background-color: rgb(255, 255, 255)!important;
    backdrop-filter: blur(0.8);
    border-bottom: solid .5px #E6E6E6
}

.navbar-nav {
   float: left;
   margin: 0;
   margin-left: 34%;
}

.navbar-nav.navbar-right:last-child {
   margin-right: -15px;
   margin-left: 0;
}

.logo-container {
    padding-top: 10px;
    padding-bottom: 10px!important;
    background-color: white;
    width:100%;
    border-bottom: solid .5px #E6E6E6
}

#logo img{
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.foreground {
    backdrop-filter: blur(4 px);
    background-color: rgba(255, 255, 255, 0.5);
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 20px;
    font-size: 30px;
    text-align: center;
}

.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: white;
    border-top: solid .5px #E6E6E6
  }

</style>
