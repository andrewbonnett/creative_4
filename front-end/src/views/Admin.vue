<template>
<div class="content">
  <div class="admin">
    <h1>The Admin Page!</h1>
      <div class="heading">
        <div class="circle">1</div>
        <h2 style="font-size: 18px">Add a Product</h2>
      </div>
      <div class="add">
        <div class="form">
          <input v-model="name" placeholder="Product Name">
          <p></p>
          <input type="number" v-model="price" placeholder="Price">
          <p></p>
          <input type="file" name="photo" @change="fileChanged">
          <p></p>
          <p style="margin-bottom: 8px; font-size: 17px">Add Filters:</p>
          <!--Checkboxes for filters-->
          <div class="checkbox">
            <input type="checkbox" id="new arrivals" v-model="categoryBools[0]">
            <label class="checkbox-spacing" for="new arrivals">New Arrivals</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="popular" v-model="categoryBools[1]">
            <label class="checkbox-spacing" for="popular">Popular</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="shirts" v-model="categoryBools[2]">
            <label class="checkbox-spacing" for="shirts">Shirts</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="swimwear" v-model="categoryBools[3]">
            <label class="checkbox-spacing" for="swimwear">Swimwear</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="jackets" v-model="categoryBools[4]">
            <label class="checkbox-spacing" for="jackets">Jackets</label>
          </div>
          <button style="display: block" class ="btn btn-secondary" @click="upload">Upload</button>
        </div>
        <div class="upload" v-if="addItem">
          <h2>{{addItem.name}}</h2>
          <img :src="addItem.path" />
          <p>${{addItem.price.toFixed(2)}}</p>
        </div>
      </div>
      <div class="heading">
        <div class="circle">2</div>
        <h2 style="font-size: 18px">Edit/Delete an Item</h2>
      </div>
      <div class="edit">
        <div class="form">
          <input v-model="findName" placeholder="Search">
          <div class="suggestions" v-if="suggestions.length > 0">
            <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.name}}
            </div>
          </div>
        </div>
        <div class="upload" v-if="findItem">
          <input v-model="findItem.name">
          <p></p>
          <img :src="findItem.path" />
          <p></p>
          <input v-model="findItem.price">
          <p></p>
        </div>
        <div class="actions" v-if="findItem">
          <button @click="deleteItem(findItem)">Delete</button>
          <button @click="editItem(findItem)">Edit</button>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      name: "",
      file: null,
      price: null,
      addItem: null,
      items: [],
      findName: "",
      findItem: null,
      categoryBools: [true, false, false, false, false],
      categoryStrings: [],
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return items.sort((a, b) => a.name > b.name);
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    getCategoryStrings() {
        if (this.categoryBools[0])
          this.categoryStrings.push("New Arrivals")
        if (this.categoryBools[1])
          this.categoryStrings.push("Popular")
        if (this.categoryBools[2])
          this.categoryStrings.push("Shirts")
        if (this.categoryBools[3])
          this.categoryStrings.push("Swimwear")
        if (this.categoryBools[4])
          this.categoryStrings.push("Jackets")
        this.categoryStrings.push(""); //push the empty string for all items
    },
    async upload() {
        this.getCategoryStrings();
      try {
        const photoData = new FormData();
        photoData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', photoData);
        let r2 = await axios.post('/api/items', {
          name: this.name,
          path: r1.data.path,
          price: this.price,
          category: this.categoryStrings, //error occurring here
        });

        this.addItem = r2.data;
        this.name = "";
        this.categoryBools = [true, false, false, false, false];
        this.price = null;

      } catch(error) {
        console.log(error)
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch(error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findName = "";
      this.findItem = item;
    },
    async deleteItem(item) {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
    },
    async editItem(item) {
        await axios.put("/api/items/" + item._id, {
          name: this.findItem.name,
          path: this.findItem.path,
          price: this.findItem.price,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
    },
  }
}
</script>

<style scoped>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #5BDEFF;
  color: #1C454F;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}

.content {
  display: block;
  padding: 20px 100px;
  min-height: 500px;
  font-family: Montserrat,sans-serif;
  font-size: 16px;

  width: 75%;
  margin-bottom: 250px;
  margin-left: 20px;
  margin-right: 20px;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 40px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.checkbox {
  margin: .4rem;
}

.checkbox-spacing {
  margin-left: .4rem
}
</style>
