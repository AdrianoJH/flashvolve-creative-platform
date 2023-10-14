<template>
    <div>
        <h1>Home</h1>
        <ul v-if="messages.length">
            <li v-for="(message, index) in messages" :key="index">
                {{ message }}
            </li>
        </ul>
        <input type="text" v-model="newMessage" placeholder="Digite sua mensagem">
        <button @click="sendMessage">Enviar</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'; // Certifique-se de que você esteja usando o Vue 3

import { io } from "socket.io-client";

const messages = ref([]);
const newMessage = ref('');

const socket = io("http://localhost:3000"); // Certifique-se de usar o mesmo endereço do seu servidor

socket.on("connect", () => {
    console.log("Conexão estabelecida com o servidor");
});

socket.on("messageFromBot", (msgData) => {
    // Manipular dados recebidos do bot
    messages.value.push(msgData.text); // Adicione a mensagem recebida à lista de mensagens
});

const sendMessage = () => {
    // Envia a mensagem para o servidor
    socket.emit("messageFromUser", { route: "/menssage", msg: { text: newMessage.value } });
    newMessage.value = ''; // Limpa o campo de entrada após o envio da mensagem
};

</script>

<style scoped>

</style>
