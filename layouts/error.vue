<template>
  <div class="card">
    <div class="card-content">
      <h1 class="title">{{ error.statusCode }}</h1>
      <div class="content">
        <p>{{ error.message }}</p>
        <button class="button is-primary" @click="goHome">Go Home</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {}
  },
  methods: {
    goHome() {
      location.href= '/';
    }
  }
}
</script>