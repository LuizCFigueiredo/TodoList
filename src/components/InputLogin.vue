<template>
  <div class="relative">
    <label v-if="label" :for="id" class="block mb-1 text-sm font-medium text-[#F3F3F3] dark:text-white">{{
      label
    }}</label>
    <div class="relative">
      <input :type="computedType" :id="id" :placeholder="placeholder" v-model="inputValue" @input="handleInput"
        class="flex w-64 pl-2 items-center border border-Light-ColorPrimary dark:border-Dark-ColorPrimary rounded-md placeholder:text-[#EBE9FD] bg-transparent dark:bg-transparent"
        :class="{ 'border-red-500': error }" />
      <span v-if="type === 'password'" class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
        @click="togglePasswordVisibility">
        <img v-if="!showPassword" src="../assets/HidePassword.svg" class="h-5 w-5">
        <img v-else src="../assets/ShowPassword.svg" class="h-5 w-5">
      </span>
    </div>
    <small v-if="error" class="text-red-500">{{ error }}</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true
    },
    label: String,
    id: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    error: String
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);
    const showPassword = ref(false);

    const handleInput = (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        inputValue.value = event.target.value;
        emit('update:modelValue', inputValue.value);
      }
    };

    const computedType = computed(() => {
      return showPassword.value && props.type === 'password' ? 'text' : props.type;
    });

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      inputValue,
      handleInput,
      showPassword,
      togglePasswordVisibility,
      computedType
    };
  }
});
</script>
