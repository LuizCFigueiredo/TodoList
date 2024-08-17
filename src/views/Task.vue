<template>
    <main :class="{ 'dark': isDarkMode }" class="!h-full !w-full mt-10 flex flex-col items-center font-medium">
        <h1 class="text-Light-TextColor dark:text-Dark-TextColor text-[26px]">TODO LIST</h1>
        <div class="flex gap-[10px] mt-4">
            <div class="relative">
                <Input id="filtro" type="text" placeholder="procurar tarefa..." v-model="filterTerm" />
                <button class="absolute top-1/2 -translate-y-1/2 right-3" @click="applyFilter">
                    <svg class=" fill-Light-Place dark:fill-Dark-ColorPrimary " width="21" height="22"
                        viewBox="0 0 21 22" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.7773 20.184L15.9056 15.312H15.8531C17.3547 13.5415 18.1136 11.2588 17.9709 8.94156C17.8282 6.62433 16.7951 4.45202 15.0876 2.87905C13.3801 1.30608 11.1306 0.454303 8.80958 0.501892C6.48855 0.549481 4.27583 1.49275 2.63427 3.13439C0.992706 4.77602 0.0494786 6.98885 0.00189181 9.30999C-0.045695 11.6311 0.806045 13.8808 2.37894 15.5883C3.95184 17.2958 6.12404 18.329 8.44117 18.4717C10.7583 18.6144 13.0408 17.8555 14.8113 16.3539C14.8113 16.3539 14.8113 16.3914 14.8113 16.4063L19.6831 21.2783C19.7527 21.3485 19.8356 21.4043 19.927 21.4424C20.0183 21.4804 20.1163 21.5 20.2152 21.5C20.3141 21.5 20.4121 21.4804 20.5034 21.4424C20.5948 21.4043 20.6777 21.3485 20.7473 21.2783C20.8242 21.2103 20.8862 21.1272 20.9296 21.0342C20.9731 20.9412 20.9969 20.8402 20.9997 20.7376C21.0025 20.635 20.9842 20.533 20.946 20.4377C20.9077 20.3425 20.8503 20.2561 20.7773 20.184ZM9.00276 16.9685C7.5204 16.9685 6.07133 16.5289 4.83879 15.7053C3.60625 14.8817 2.64561 13.7111 2.07833 12.3415C1.51106 10.9719 1.36263 9.46488 1.65183 8.01094C1.94102 6.55699 2.65485 5.22146 3.70303 4.17322C4.75122 3.12499 6.08669 2.41113 7.54057 2.12192C8.99445 1.83272 10.5014 1.98115 11.871 2.54845C13.2405 3.11575 14.411 4.07644 15.2346 5.30904C16.0581 6.54163 16.4977 7.99077 16.4977 9.4732C16.4977 10.4575 16.3038 11.4322 15.9272 12.3415C15.5505 13.2509 14.9985 14.0772 14.3025 14.7732C13.6065 15.4692 12.7803 16.0213 11.871 16.3979C10.9616 16.7746 9.98701 16.9685 9.00276 16.9685Z " />
                    </svg>
                </button>
            </div>
            <select id="select"
                class="h-[38px] w-[85px] border rounded-md bg-Light-ColorPrimary text-white text-lg uppercase dark:border-transparent">
                <option value="all">All</option>
            </select>
            <ThemeSwitch @toggle-dark-mode="toggleDarkMode" />
        </div>
        <div class="mt-8">
            <div v-for="task in filteredTasks" :key="task.id" :class="{ 'completed': task.completed }">
                <div class="flex items-center justify-between mt-4">
                    <div class="flex gap-4">
                        <input type="checkbox" :id="'checkbox-' + task.id" class="InputCheck" :checked="task.completed"
                            @change="toggleTask(task.id)" />
                        <h2
                            class="task-title text-xl text-Light-TextColor dark:text-Dark-TextColor dark:opacity-100 opacity-50">
                            {{
                                task.title }}</h2>
                    </div>
                    <div class="flex items-center gap-[6px] pt-2">
                        <button @click="openEditModal(task)"><img :src="Editar"></button>
                        <button @click="openDeleteModal(task)"><img :src="Lixo"></button>
                    </div>
                </div>
                <hr class="w-[32.5rem] mt-4 border border-Light-ColorPrimary opacity-70" />
            </div>
        </div>
        <button @click="openAddModal" class="absolute left-[76%] top-[86%]"><img src="../assets/Add button.svg"
                class="w-auto h-[3.5rem]" /></button>
        <Modal :visible="showModal" :title="modalTitle" :action="modalAction" :task="selectedTask" @close="closeModal"
            @apply="handleApply" @delete="deleteTask" />
    </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import Input from '../components/Input.vue';
import ThemeSwitch from '../components/ThemeSwitch.vue'
import Modal from '../components/Modal.vue'
import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, addDoc, updateDoc, doc, onSnapshot, query, orderBy, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Editar from '../assets/Editar.svg'
import Lixo from '../assets/Lixeiro.svg'
import { computed } from 'vue';


const isDarkMode = ref(false);
const filterTerm = ref('');
const appliedFilterTerm = ref('');
const showModal = ref(false);
const modalTitle = ref('');
const modalAction = ref('');
const selectedTask = ref<Task | null>(null);

interface Task {
    id: string;
    title: string;
    completed: boolean;
    userId: string;
}

watch(isDarkMode, (newValue) => {
    if (newValue) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.add('light');
        document.body.classList.remove('dark');
    }
}, { immediate: true });

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
};

watch(filterTerm, (newValue) => {
    if (newValue === '') {
        appliedFilterTerm.value = '';
    }
});

const Tasks = ref<Task[]>([
]);

const filteredTasks = computed(() => {
    if (!filterTerm.value) {
        return Tasks.value;
    }
    return Tasks.value.filter(task =>
        task.title.toLowerCase().includes(appliedFilterTerm.value.toLowerCase())
    );
});

onMounted(async () => {
    const user = getAuth().currentUser;
    if (user) {
        await fetchTasks(user.uid);
    } else {

    }
});

async function fetchTasks(userId: string) {
    const userRef = doc(db, 'users', userId);
    const q = query(collection(userRef, 'tasks'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (querySnapshot) => {
        Tasks.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Task[];
    });
}

async function addTask(taskTitle: string) {
    const user = getAuth().currentUser;
    if (user) {
        const userRef = doc(db, 'users', user.uid);
        const tasksCollection = collection(userRef, 'tasks');
        const docRef = await addDoc(tasksCollection, {
            title: taskTitle,
            completed: false,
            createdAt: serverTimestamp(),
        });
        Tasks.value.push({ id: docRef.id, title: taskTitle, completed: false, userId: user.uid });
    } else {
        console.error("Usuário não autenticado");
    }
}

const openAddModal = () => {
    modalTitle.value = 'Add Task';
    modalAction.value = 'add';
    selectedTask.value = null;
    showModal.value = true;
};

const openEditModal = (task: { id: string, title: string, completed: boolean, userId: string }) => {
    modalTitle.value = 'Editar Task';
    modalAction.value = 'edit';
    selectedTask.value = task;
    showModal.value = true;
};

const openDeleteModal = (task: { id: string, title: string, completed: boolean, userId: string }) => {
    modalTitle.value = 'Apagar Task';
    modalAction.value = 'delete';
    selectedTask.value = task;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const handleApply = async ({ id, title }: { id: string, title: string }) => {
    if (modalAction.value === 'add') {
        await addTask(title);
    } else if (modalAction.value === 'edit') {
        await editTask(id, title);
    }
    closeModal();
};

const deleteTask = async (taskId: string) => {
    await removeTask(taskId);
    closeModal();
};


async function removeTask(taskId: string) {
    const user = getAuth().currentUser;
    if (user) {
        const taskRef = doc(db, `users/${user.uid}/tasks`, taskId);
        await deleteDoc(taskRef);
        Tasks.value = Tasks.value.filter(task => task.id !== taskId);
    } else {
        console.error("Usuário não autenticado");
    }
}

async function editTask(taskId: string, newTitle: string) {
    const user = getAuth().currentUser;
    if (user) {
        const taskRef = doc(db, `users/${user.uid}/tasks`, taskId);
        await updateDoc(taskRef, { title: newTitle });
        const task = Tasks.value.find(task => task.id === taskId);
        if (task) {
            task.title = newTitle;
        }
    }
}

async function toggleTask(taskId: string) {
    const task = Tasks.value.find(t => t.id === taskId);
    if (task) {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, { completed: !task.completed });
    } else {
        console.error("Tarefa não encontrada:", taskId);
    }
}

const applyFilter = () => {
    appliedFilterTerm.value = filterTerm.value;
};
</script>

<style scoped>
.InputCheck {
    @apply text-center relative appearance-none w-6 h-6 border-2 border-Light-ColorPrimary rounded-[2px];
}

.InputCheck:checked::after {
    @apply content-['✓'] absolute inset-0 flex items-center justify-center text-white text-base bg-Light-ColorPrimary;
}

.completed .task-title {
    @apply text-[#ccc] line-through decoration-1;
}
</style>