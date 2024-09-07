<template>
    <main class="h-full flex flex-row bg-Light-BackgroundColor">
        <div class="flex flex-col flex-[2] items-center justify-center">
            <h1 class="text-center text-Light-TextColor">Login</h1>
            <form class="flex flex-col gap-3 z-10" @submit.prevent="login">
                <InputLogin id="Email" label="Email" type="email" placeholder="Email" required v-model="email" />
                <InputLogin id="Senha" label="Senha" type="password" placeholder="Senha" required v-model="senha" />
                <div class="flex gap-2">
                    <button type="submit" class="w-32 border border-Light-ColorPrimary rounded-md">Fazer Login</button>
                    <button class="w-32 border border-Light-ColorPrimary rounded-md"
                        @click.prevent="navigateToRegister">Criar conta</button>
                </div>
            </form>
        </div>
        <div class="bg-[#B0B1D5] flex-[1] shadow-[-3px_1px_2px_rgba(0,0,0,0.35)]">
            <div class="relative right-40 top-[4.5rem] drop-shadow-xl">
                <img src="../assets/LoginFoto.png" alt="Login foto"
                    class="filter drop-shadow-[-4px_8px_4px_rgba(0,0,0,0.35)] absolute">
            </div>
        </div>
        <div class="ilustracao-container absolute bottom-0 left-0 z-1">
            <img src="../assets/Teste.svg" alt="Ilustração"
                class="filter drop-shadow-[3px_-1px_2px_rgba(0,0,0,0.35)] w-[60%]">
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
