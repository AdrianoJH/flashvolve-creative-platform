<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const register_form = ref({});
const store = useStore();

const register = () => {
  store.dispatch("register", register_form.value);
};
</script>
<template>
  <div class="signupContainer">
    <h1>Cadastro</h1>
    <form @submit.prevent="register">
      <input type="text" placeholder="Nome" id="name" v-model="register_form.name"/>
      <input
        type="email"
        autocomplete="email"
        placeholder="E-mail"
        id="email"
        v-model="register_form.email"
      />
      <input
        type="password"
        autocomplete="new-password"
        placeholder="Senha"
        id="password"
        v-model="register_form.password"
      />
      <input
        type="password"
        autocomplete="new-password"
        placeholder="Confirmar senha"
        id="confirm-password"
        v-model="register_form.password_confirmation"
      />
      <div class="box-button">
        <button type="button" class="btn-signup" @click="$router.push({ name: 'login' })">
          VOLTAR
        </button>
        <button
          type="submit"
          value="Register"
          class="btn-signup"
        >
          SALVAR
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped>
.signupContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 500px;
  border-radius: 20px;
  background-color: #0e0027;
  box-shadow: #000000af 0px 10px 10px;
}

h1 {
  text-align: center;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 30px;
  color: #fff;
  text-shadow: #000000af 0px 5px 5px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

input {
  width: 80%;
  margin-top: 20px;
  font-size: 15px;
  font-weight: bold;
  padding: 12px;
  border: 2px solid #7a7b84;
  border-radius: 8px;
}

input:focus {
  border: 2px solid #7a7b84;
  outline: none;
}

.text-box {
  width: 80%;
  display: flex;
  justify-content: space-between;
}

a {
  font-size: 12px;
  text-decoration: none;
  color: #fff;
  margin-top: 5px;
  text-shadow: #000000af 0px 5px 5px;
  cursor: pointer;
}

a:hover {
  color: #908fd9;
}

.box-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-top: 40px;
}

.btn-signup {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 45px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  color: #140036;
  background-color: #fff;
  box-shadow: #000000af 0px 5px 5px;
  cursor: pointer;
}

.btn-signup:hover {
  background-color: #908fd9;
}
</style>
