<script setup>
import { ref, reactive, watch, computed } from "vue";
import { useStore } from "vuex";

const register_form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const store = useStore();

const register = () => {
  store.dispatch("register", register_form);
};

const nameValid = ref(false);
const emailValid = ref(false);
const passwordValid = ref(false);
const confirmPasswordValid = ref(false);

const nameInvalid = ref(false);
const emailInvalid = ref(false);
const passwordInvalid = ref(false);
const confirmPasswordInvalid = ref(false);
const showPassword = ref(false);

const checkName = () => {
  nameValid.value = register_form.name !== "";
  nameInvalid.value = register_form.name === "" && nameValid.value;
};

const checkEmail = () => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  emailValid.value = re.test(register_form.email);
  emailInvalid.value = register_form.email !== "" && !emailValid.value;
};

const checkPassword = () => {
  passwordValid.value = register_form.password.length >= 6;
  passwordInvalid.value = register_form.password !== "" && !passwordValid.value;
};

const checkConfirmPassword = () => {
  confirmPasswordValid.value =
    register_form.password_confirmation === register_form.password;
  confirmPasswordInvalid.value =
    register_form.password_confirmation !== "" && !confirmPasswordValid.value;
};

const isDisabled = ref(true);

watch(
  [nameValid, emailValid, passwordValid, confirmPasswordValid],
  ([name, email, password, confirmPassword]) => {
    isDisabled.value = !(name && email && password && confirmPassword);
  }
);

const isDisabledButton = computed(() => {
  return (
    !nameValid.value ||
    !emailValid.value ||
    !passwordValid.value ||
    !confirmPasswordValid.value
  );
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>
<template>
  <div class="signupContainer">
    <h1>Cadastro</h1>
    <form @submit.prevent="register">
      <input
        type="text"
        placeholder="Nome"
        id="name"
        v-model="register_form.name"
        @input="checkName"
        :class="{ invalid: nameInvalid, valid: nameValid }"
      />
      <input
        type="email"
        autocomplete="email"
        placeholder="E-mail"
        id="email"
        v-model="register_form.email"
        @input="checkEmail"
        :class="{ invalid: emailInvalid, valid: emailValid }"
      />
      <div class="password-container">
        <input
          :type="showPassword ? 'text' : 'password'"
          autocomplete="new-password"
          placeholder="Senha"
          id="password"
          v-model="register_form.password"
          @input="checkPassword"
          :class="{ invalid: passwordInvalid, valid: passwordValid }"
        />
        <span class="password-toggle" @click="togglePasswordVisibility">
          <i v-if="showPassword" class="fas fa-eye-slash"></i>
          <i v-else class="fas fa-eye"></i>
        </span>
      </div>
      <div class="password-container">
        <input
          :type="showPassword ? 'text' : 'password'"
          autocomplete="new-password"
          placeholder="Confirmar senha"
          id="confirm-password"
          v-model="register_form.password_confirmation"
          @input="checkConfirmPassword"
          :class="{
            invalid: confirmPasswordInvalid,
            valid: confirmPasswordValid,
          }"
        />
        <span class="password-toggle" @click="togglePasswordVisibility">
          <i v-if="showPassword" class="fas fa-eye-slash"></i>
          <i v-else class="fas fa-eye"></i>
        </span>
      </div>
      <div class="box-button">
        <button
          type="button"
          class="btn-signup"
          @click="$router.push({ name: 'login' })"
        >
          VOLTAR
        </button>
        <button
          type="submit"
          value="Register"
          class="btn-signup"
          :class="{ disabled: isDisabledButton }"
          :disabled="isDisabledButton"
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

.password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 50px;
  top: 65%;
  transform: translateY(-50%);
  color: #7a7b84;
  cursor: pointer;
}

.password-toggle i {
  font-size: 18px;
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

.invalid {
  border: 2px solid red !important;
}

.valid {
  border: 2px solid green !important;
}

.disabled {
  opacity: 0.6;
  pointer-events: none;
  cursor: not-allowed;
}
</style>
