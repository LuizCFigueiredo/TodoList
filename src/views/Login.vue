<template>
    <main class="h-full flex flex-col items-center justify-center bg-[#B0B1D5]">
        <div
            class="flex flex-col items-center justify-center h-96 w-96 bg-gradient-to-r from-[#B0B1D5]/20 via-[#52616B]/05 to-[#B0B1D5]/20 bg-opacity-50 border border-[#f3f7fa] border-opacity-50 rounded shadow-lg">
            <h1 class="text-center text-[#f3f7fa]">Login</h1>
            <form class="flex flex-col gap-3 z-10" @submit.prevent="login">
                <InputLogin id="Email" label="Email" type="email" placeholder="Email..." required v-model="email" />
                <InputLogin id="Senha" label="Senha" type="password" placeholder="Senha..." required v-model="senha" />
                <button type="submit" class="w-32 border border-Light-ColorPrimary rounded-md text-[#EBE9FD]">Fazer
                    Login</button>
                <small>não tem conta? <small @click.prevent="navigateToRegister" class="cursor-pointer">CLIQUE
                        AQUI</small></small>
            </form>
        </div>
    </main>
</template>

<script lang="ts">
import { ref } from 'vue';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { auth } from '../../firebaseConfig';
import InputLogin from '../components/InputLogin.vue';

export default {
    name: 'Login',
    components: {
        InputLogin,
    },
    setup() {
        const email = ref('');
        const senha = ref('');
        const router = useRouter();

        const login = async () => {
            try {
                await setPersistence(auth, browserLocalPersistence);

                const userCredential = await signInWithEmailAndPassword(auth, email.value, senha.value);
                console.log('Usuário autenticado:', userCredential.user);

                router.push('/');
            } catch (error) {
                console.error('Erro ao fazer login:', error);
            }
        };

        const navigateToRegister = () => {
            router.push('/register');
        };

        return {
            email,
            senha,
            login,
            navigateToRegister,
        };
    },
};
</script>
