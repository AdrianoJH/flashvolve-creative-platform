<script setup>
import LoginBox from "../components/LoginBox.vue";
</script>

<template>
  <div class="login-container">
    <LoginBox />
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #35425d 0%, #3b3f7a 60%);
  background-size: cover;
}
</style>
