<template>
    <div class="toast">{{message}}</div>
</template>

<script>
import { reactive } from 'vue'

export default {
    name: 'Toast',
    props: ['message']
}
export const useToastEffect = () => {
    const toast = reactive({
        show: false,
        message: ''
    })
    const showToast = (message) => {
        toast.show = true
        toast.message = message
        setTimeout(() => {
            toast.show = false
            toast.message = ''
        }, 3000)
    }
    return {
        toast,
        showToast
    }
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';

.toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0.1rem;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 0.05rem;
    color: $background-color;
}
</style>
