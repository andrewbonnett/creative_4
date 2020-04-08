<template>
<div class="shop-container">
  <br/>
  <div class="wrapper1">
    <div class="search">
      <form class="pure-form">
        <i style="display: table-cell;padding-left: 10px;width: 1px;" class="fas fa-search"></i><input v-model="searchText" />
      </form>
    </div>
  </div>
  <br/>
  <div class="sidebar-helper">
    <div class="sidebar">
      <h2>Men's</h2>
      More filters coming soon to Moonstone.
      <hr/>
      <span class="bucket-heading">Category</span>
      <ul style="list-style-type: none;padding-left: 0px;">
          <li class="li-sidebar"><a @click="setFilter('New Arrivals')" href="#">New Arrivals</a></li>
          <li class="li-sidebar"><a @click="setFilter('Popular')" href="#">Popular</a></li>
          <li class="li-sidebar"><a @click="setFilter('Shirts')" href="#">Shirts</a></li>
          <li class="li-sidebar"><a @click="setFilter('Swimwear')" href="#">Swimwear</a></li>
          <li class="li-sidebar"><a @click="setFilter('Jackets')" href="#">Jackets</a></li>
          <li class="li-sidebar line"><a @click="setFilter('')" href="#">See All</a></li>
      </ul>
    </div>
    <div class="main">
      <ProductList :products="products" />
    </div>
  </div>
</div>
</template>

<script>
import ProductList from "../components/ProductList.vue"
export default {
  name: 'Home',
  components: {
    ProductList
  },
  data() {
  return {
    searchText: '', 
    filter: '',
  }
  },
  computed: {
    products() {
        return this.$root.$data.products.filter(product => (product.name.toLowerCase().search(this.searchText)) >= 0 && product.category.includes(this.filter));
    }
  },
  methods: {
    setFilter(key) {
      if (this.filter === key) {
        this.filter = '';
      }
      else {
        this.filter = key;
      }
    }
  }
}
</script>

<style>
.sidebar-helper {
    display: flex;
    justify-content: space-between;
}

.shop-container {
  padding-left: 50px;
  padding-right: 50px;

}

.main {
    width: 75%;
    height: 150vh;
    padding-top: 20px;
    margin-bottom: 50px;
    margin-left: 20px;
    margin-right: 20px;
}

.sidebar {
    width: 25%;
    height: 100%;
    position: sticky!important;
    border-right: solid .5px #E6E6E6;
    padding-top: 20px;
    margin-left: 20px;
    top: 0!important;
    z-index: 1;
}

#shop body {
    height: 100%;
}
.line {
    border-top: 1px solid #ccc;
    padding-top: 10px;
    width: 180px;
}

.bucket-heading{
    display: block;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    width: 180px;
    font-family: "Arial Black", Gadget, sans-serif
}

.li-sidebar{
    font-size: .9375em;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 10px;
}

.wrapper1 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* -webkit-box-pack: center; */
  -ms-flex-pack: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

li a:link {
  text-decoration: none;
}

li a:visited {
  text-decoration: none;
}

li a{
  text-decoration: none;
  color: black;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
</style>
