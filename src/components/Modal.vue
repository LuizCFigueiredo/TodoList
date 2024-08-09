<template>
    <div v-if="visible" class="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div class="w-[28rem] h-72 bg-white dark:bg-[#B0B1D5] pt-5 p-8 rounded-lg">
            <h2 class="text-xl text-center text-Light-TextColor dark:text-Dark-ColorPrimary font-bold">{{ title }}</h2>
            <div v-if="action !== 'delete'" class="mt-6">
                <input v-model="taskTitle" type="text" placeholder="Digite sua nota..."
                    class="w-full dark:bg-transparent p-2 border border-Light-ColorPrimary dark:border-Dark-ColorPrimary rounded-md placeholder:text-Light-Place dark:placeholder:text-Dark-Place dark:placeholder:opacity-70" />
                <small class="text-Light-TextColor">{{ errors }}</small>
            </div>
            <div class="flex justify-between mt-20">
                <button @click="close"
                    class="px-4 py-2 border border-Light-ColorPrimary text-Light-ColorPrimary rounded-md">CANCEL</button>
                <button @click="applyAction" class="px-4 py-2 bg-Light-ColorPrimary text-white rounded-md">
                    {{ action === 'delete' ? 'DELETE' : 'APPLY' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ visible: boolean, title: string, action: string, task?: { id: string, title: string } | null }>();
const emit = defineEmits(['close', 'apply', 'delete']);
const errors = ref<null | string>(null);
const taskTitle = ref(props.task?.title || '');

watch(() => props.task, (newTask) => {
    taskTitle.value = newTask?.title || '';
});

const close = () => {
    emit('close');
};

const applyAction = () => {
    if (props.action === 'delete') {
        emit('delete', props.task?.id);
    } else if (taskTitle.value.trim() === '') {
        errors.value = "Por favor, introduza uma nota";
        setTimeout(() => {
            errors.value = null;
            taskTitle.value = '';
        }, 3000);
    } else {
        emit('apply', { id: props.task?.id, title: taskTitle.value });
        taskTitle.value = '';
        errors.value = null;
    }
};
</script>

<style scoped></style>