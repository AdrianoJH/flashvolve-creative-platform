<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView :key="$route.path" />
</template>

