<template>
    <div class="relative">
        <input :type="type" :id="id" :placeholder="placeholder" v-model="inputValue"
            class="flex w-[37.188rem] h-[38px] p-2 items-center gap-[27.25rem] border border-Light-ColorPrimary dark:border-Dark-ColorPrimary rounded placeholder:text-[#C3C1E5] dark:placeholder:text-Dark-Place dark:bg-transparent">
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        id: {
            type: String,
            required:
                true
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default:
                ''
        }
    },
    setup(props, { emit }) {
        const inputValue = ref('');

        const handleInput = () => {
            emit('input', inputValue.value);
        };

        return {
            inputValue,
            handleInput
        };
    }
});
</script>