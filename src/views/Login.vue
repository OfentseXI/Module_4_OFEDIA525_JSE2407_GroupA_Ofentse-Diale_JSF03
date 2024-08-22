<template>
  <div class="flex justify-center items-center h-screen">
    <!-- Login Form Container -->
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
      <h2 class="text-center text-2xl font-extrabold text-gray-900">Sign in to your account</h2>
      
      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <!-- Username Field -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input v-model="username" id="username" name="username" type="text" autocomplete="username" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <!-- Password Field with Toggle Visibility -->
        <div class="mt-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="relative">
            <input :type="passwordFieldType" v-model="password" id="password" name="password" required
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              {{ passwordFieldType === 'password' ? 'Show' : 'Hide' }}
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-6">
          <button type="submit" :disabled="loading" 
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-4 text-center text-red-500">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    // Reactive properties for form data and UI states
    const username = ref('');
    const password = ref('');
    const passwordFieldType = ref('password'); // Toggles between 'password' and 'text' types
    const loading = ref(false); // Indicates if the form is submitting
    const error = ref(null); // Holds any error message
    const router = useRouter(); // Vue Router instance

    /**
     * Toggle the visibility of the password field.
     */
    const togglePasswordVisibility = () => {
      passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
    };

    /**
     * Handle the login process.
     * Sends the username and password to the API for authentication.
     */
    const handleLogin = async () => {
      if (!username.value || !password.value) {
        error.value = 'Username and password are required';
        return;
      }

      loading.value = true;
      error.value = null;

      try {
        const response = await fetch('https://fakestoreapi.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        console.log(data); // To view the response from the API

        // Store JWT token in localStorage
        localStorage.setItem('jwt', data.token);

        // Redirect the user to the previously stored path or home page
        const redirectPath = localStorage.getItem('redirectPath') || '/';
        router.push(redirectPath);
      } catch (err) {
        // Display an error message if login fails
        error.value = 'Login failed. Please check your credentials.';
      } finally {
        loading.value = false; // Reset loading state
      }
    };

    // Expose the reactive properties and methods to the template
    return {
      username,
      password,
      passwordFieldType,
      loading,
      error,
      togglePasswordVisibility,
      handleLogin
    };
  }
};
</script>
