<template>
    <div class="bg-light h-100 w-100 d-flex flex-column align-items-center justify-content-center">
      <img class="mb-4" src="../assets/logo.png" width="35" height="100">
      <form class="form-signin" @submit.prevent="onSignIn">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <text-input class="mb-3" :errors="vuelidate.username.$errors" id="username" label="Username" placeholder="Username" type="text" v-model="username"/>
        <text-input :errors="vuelidate.password.$errors" id="password" label="Password" placeholder="Password" type="password" v-model="password"/>
        <button class="btn btn-outline-dark btn-block mt-3 w-100" type="submit">
          <span v-if="loading" class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="false"></span>
          <span v-else>Sign in</span>
        </button>
      </form>
      <alert v-if="error" class="mt-4" type="danger" :message="error"/>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from 'vuelidate/lib/validators'
import { signIn } from '@/services/auth';
import { loginBadCredentialsMessage, loginDefaultErrorMessage, tokenStorageName } from '@/helpers/constants';
import Alert from '@/components/ui/Alert.vue';
import TextInput from '@/components/ui/TextInput.vue';

export default {
  name: 'Login',
  setup() {
    return { vuelidate: useVuelidate() }
  },
  components: {
    Alert,
    TextInput
  },
  data() {
    return {
      error: null,
      loading: false,
      password: '',
      username: '',
    }
  },
  methods: {
    async onSignIn () {
      //Validate form and cancel submission if invalid
      const isValid = await this.vuelidate.$validate()
      if (!isValid) return

      try {
        this.loading = true

        //Attempt to sign in
        const data = await signIn(this.username, this.password)

        //If successful, persist token and redirect
        if(data.status === 200){
          localStorage[tokenStorageName] = data.data.token
          this.$router.push('/')
        }

        //Otherwise, throw an error
        throw new Error(data)
      } 
      catch (error) {
        //Display error message in the alert component
        this.error = error.status === 401 
          ? loginBadCredentialsMessage
          : error.message ?? loginDefaultErrorMessage
      } 
      finally {
        this.loading = false
      }
    }
  },
  validations: {
    username: {
      required, $autoDirty: true
    },
    password: {
      required, $autoDirty: true
    }
  }
}
</script>

<style scoped>
.form-signin {
  background-color: white;
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
</style>
