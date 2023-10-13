<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const login_form = ref({});
const store = useStore();

const login = () => {
  store.dispatch("login", login_form.value);
};
</script>


<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input
        type="email"
        autocomplete="email"
        placeholder="E-mail"
        id="email"
        v-model="login_form.email"
      />
      <input
        type="password"
        autocomplete="current-password"
        placeholder="Senha"
        id="password"
        v-model="login_form.password"
      />
      <div class="text-box">
        <p>Esqueceu a senha?</p>
        <p @click="$router.push({ name: 'signup' })">Cadastre-se</p>
      </div>
      <button
        type="submit"
        class="btn-login"
        value="Login"
      >
        ENTRAR
      </button>
    </form>
  </div>
</template>

<style scoped>
.container {
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
  margin-bottom: 80px;
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
  padding-left: 40px;
  border: 2px solid #7a7b84;
  border-radius: 8px;
}

input#email {
  background-image: url("../assets/images/email.png");
  background-size: 20px 20px;
  background-position: 10px center;
  background-repeat: no-repeat;
}

input#password {
  background-image: url("../assets/images/lock.png");
  background-size: 20px 20px;
  background-position: 10px center;
  background-repeat: no-repeat;
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

p {
  font-size: 12px;
  color: #fff;
  margin-top: 5px;
  text-shadow: #000000af 0px 5px 5px;
  cursor: pointer;
}

a:hover {
  color: #908fd9;
}

.btn-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 45px;
  margin-top: 50px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  color: #140036;
  background-color: #fff;
  box-shadow: #000000af 0px 5px 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #908fd9;
}
</style>
