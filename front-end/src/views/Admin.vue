<template>
<div class="admin">
  <h1>The Admin Page!</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add a Product</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="name" placeholder="Name">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <input type="number" v-model="price" placeholder="Price">
        <p></p>
        <textarea v-model="description" cols=50 rows=3 placeholder="Description" ></textarea>
        <button style="display: block" @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.name}}</h2>
        <img :src="addItem.path" />
        <p>{{addItem.price}}</p>
        <p>{{addItem.description}}</p>
      </div>
    </div>
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete an Item</h2>
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
        <input v-model="findItem.price">
        <p></p>
        <textarea v-model="findItem.description" cols=50 rows=4 placeholder="Description" ></textarea>
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
	<button @click="editItem(findItem)">Edit</button>
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
      price: 0,
      description: "",
      addItem: null,
      items: [],
      findName: "",
      findItem: null,
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
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          name: this.name,
          path: r1.data.path,
          price: this.price,
          description: this.description,
        });
        this.addItem = r2.data;
        /*
        this.name = "";
        this.description = "";
        this.price = 0;
        */
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
  width: 18px;
  height: 18px;
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
</style>
