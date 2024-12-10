<template>
  <div class="product-list">
    <h1>Product List</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="!loading && !error" class="products">
      <div v-for="product in products" :key="product.id">
        <product-card 
          @product-favorite-clicked="toggleProductFavorite(product.id)"
          :isFavorite="favoriteProductIds.includes(product.id)"
          :product="product"
        />
      </div>
    </div>
    <alert v-if="error" class="mt-4" type="danger" :message="error"/>
  </div>
</template> 

<script>
import Alert from '../components/ui/Alert.vue'
import ProductCard from '../components/ProductCard.vue'
import { getAllProducts } from '@/services/products';

export default {
  name: 'ProductsList',
  components: {
    Alert,
    ProductCard
  },
  // remeve unnecessary created hook
  mounted () {
    this.fetchProducts()
  },
  data () {
    return {
      products: [],
      favoriteProductIds: localStorage.favoriteProductIds ? JSON.parse(localStorage.favoriteProductIds) : [],
      loading: true,
      error: null
    }
  },
  methods: {
    async fetchProducts () {
      try {
        // Extract the logic and limit the length using the API
        const data = await getAllProducts({ limit: 5 })

        // Assign the results if the request was successful
        this.products = (data.status === 200) ? data.data : []

        // Otherwise, throw an error
        if(data.status !== 200) throw new Error(data)
      } 
      catch (error) {
        this.error = error.message ?? 'Something went wrong while signing in'
      } 
      finally {
        this.loading = false
      }
    },
    toggleProductFavorite (productSelectedId) {
      // I resolve this creating an data array with the favorite products ids
      // First of all, we find in this array if the product is already there
      const index = this.favoriteProductIds.indexOf(productSelectedId)

      // Add it if not, otherwise remove it
      if (index === -1) this.favoriteProductIds.push(productSelectedId)
      else this.favoriteProductIds.splice(index, 1)
    }
  },
  watch: {
    favoriteProductIds: {
      handler: function (newVal) {
        localStorage.favoriteProductIds = JSON.stringify(newVal)
      },
    }
  }
}
</script>

<style scoped>
.product-list {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  font-size: 18px;
  color: gray;
}

.error {
  color: red;
  font-size: 18px;
}

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
</style>
