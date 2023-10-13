<script setup>
import SignupBox from "../components/SignupBox.vue";
</script>

<template>
  <div class="signup-container">
    <SignupBox/>
  </div>
</template>

<style scoped>
.signup-container {
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
