<template>
    <main class="h-full flex flex-row bg-Light-BackgroundColor">
        <div class="flex flex-col flex-[2] items-center justify-center">
            <h1 class="text-center text-Light-TextColor">Novo
                membro <br /><small class="text-Dark-BackgroundColor text-start">Registro</small> </h1>
            <form class="flex flex-col gap-3  z-10" @submit.prevent="register">
                <InputLogin id="Nome" label="Nome" type="text" placeholder="Nome" required v-model="nome" />
                <InputLogin id="Email" label="Email" type="email" placeholder="Email" required v-model="email" />
                <InputLogin id="Senha" label="Senha" type="password" placeholder="Senha" required v-model="senha" />
                <div>
                    <button type="submit" @click="register"
                        class="w-32 border border-Light-ColorPrimary rounded-md">Registrar</button>
                    <button class="w-32 border border-Light-ColorPrimary rounded-md"
                        @click.prevent="navigateToLogin">Fazer
                        Login</button>
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