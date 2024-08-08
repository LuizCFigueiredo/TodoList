<template>
    <div v-if="props.visible" class="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div class="w-[28rem] h-72 bg-white pt-5 p-8 rounded-lg">
            <h2 class="text-xl text-center text-Light-TextColor font-bold">NEW NOTE</h2>
            <div class="mt-6">
                <input v-model="newTaskTitle" type="text" placeholder="Input your note..."
                    class="w-full p-2 border border-Light-ColorPrimary rounded-md placeholder:text-Light-Place" />
                <small class="text-Light-TextColor">{{ errors }}</small>
            </div>

            <div class="flex justify-between mt-20">
                <button @click="close"
                    class="px-4 py-2 border border-Light-ColorPrimary text-Light-ColorPrimary rounded-md">CANCEL</button>
                <button @click="apply" class="px-4 py-2 bg-Light-ColorPrimary text-white rounded-md">APPLY</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(['close', 'apply']);
const errors = ref<null | string>(null);
const newTaskTitle = ref('');

const close = () => {
    emit('close');
};

const apply = () => {
    if (newTaskTitle.value.trim() === '') {
        errors.value = "Por favor, introduza uma nota";
        setTimeout(() => {
            errors.value = null;
            newTaskTitle.value = '';
        }, 3000);
        return;
    }
    emit('apply', newTaskTitle.value);
    newTaskTitle.value = '';
    errors.value = null;
};
</script>

<style scoped></style>