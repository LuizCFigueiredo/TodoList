<template>
    <div><input :type="type" :id="id" :placeholder="placeholder" v-model="inputValue" @input="handleInput"
            class="flex w-[37.188rem] h-[38px] p-2 items-center  border border-Light-ColorPrimary dark:border-Dark-ColorPrimary rounded placeholder:text-[#C3C1E5] dark:placeholder:text-Dark-Place bg-transparent dark:bg-transparent" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
    props: {
        id: {
            type: String as PropType<string>,
            required: true
        },
        type: {
            type: String as PropType<string>,
            default: 'text'
        },
        placeholder: {
            type: String as PropType<string>,
            default: ''
        },
        modelValue: {
            type: String as PropType<string>,
            default: ''
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const inputValue = ref(props.modelValue);

        const handleInput = (event: Event) => {
            const target = event.target as HTMLInputElement;
            inputValue.value = target.value;
            emit('update:modelValue', inputValue.value);
        };

        return {
            inputValue,
            handleInput
        };
    }
});
</script>