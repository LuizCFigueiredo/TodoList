<template>
    <main class="h-full flex flex-col items-center justify-center bg-[#B0B1D5]">
        <div
            class="flex flex-col items-center justify-center h-96 w-96 bg-gradient-to-r from-[#B0B1D5]/20 via-[#52616B]/05 to-[#B0B1D5]/20 bg-opacity-50 border border-[#f3f7fa] border-opacity-50 rounded shadow-lg">
            <h1 class="text-center text-[#f3f7fa]">Registrar</h1>
            <form class="flex flex-col gap-3 z-10" @submit.prevent="register">
                <InputLogin id="Nome" label="Nome" type="text" placeholder="Nome" required v-model="nome" />
                <InputLogin id="Email" label="Email" type="email" placeholder="Email..." required v-model="email" />
                <InputLogin id="Senha" label="Senha" type="password" placeholder="Senha..." required v-model="senha" />
                <button type="submit" @click="register"
                    class="w-32 border border-Light-ColorPrimary rounded-md text-[#EBE9FD]">Fazer
                    Login</button>
                <small>já tem conta? <small @click.prevent="navigateToLogin" class="cursor-pointer">CLIQUE
                        AQUI</small></small>
            </form>
        </div>
    </main>

</template>

<script lang="ts">
import { ref } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import InputLogin from '../components/InputLogin.vue';



export default {
    name: 'Auth',
    components: {
        InputLogin,
    },
    setup() {
        const nome = ref('');
        const email = ref('');
        const senha = ref('');

        const router = useRouter();

        const register = async () => {
            if (!nome.value || !email.value || !senha.value) {
                console.error('Todos os campos são obrigatórios.');
                return;
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email.value, senha.value);
                const user = userCredential.user;
                console.log('Usuário registrado:', user);


                await setDoc(doc(db, 'users', user.uid), {
                    nome: nome.value,
                    email: email.value,
                    createdAt: serverTimestamp()
                });

            } catch (error) {
                console.error('Erro ao registrar usuário:', error);
            }
        };

        const navigateToLogin = () => {
            router.push('/login');
        };

        return {
            nome,
            email,
            senha,
            register,
            navigateToLogin,
        };
    },
};

</script>