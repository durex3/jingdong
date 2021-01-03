<template>
    <div class="wrapper">
        <img
            class="wrapper__img"
            src="http://www.dell-lee.com/imgs/vue3/user.png"
        />
        <div class="wrapper__input">
            <input
                class="wrapper__input__content"
                type="text"
                placeholder="请输入用户名"
                v-model="username"
            >
        </div>
        <div class="wrapper__input">
            <input
                class="wrapper__input__content"
                type="password"
                placeholder="请输入密码"
                v-model="password"
            >
        </div>
        <div
            class="wrapper__login-button"
            @click="handleLogin"
        >登录</div>
        <div class="wrapper__login-link">
            <span @click.prevent="handelRegisterClick">立即注册</span>
            <span> | </span>
            <span>忘记密码</span>
        </div>
        <Toast v-if="toast.show" :message="toast.message"></Toast>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import { reactive, toRefs } from 'vue'
import Toast, { useToastEffect } from '../../components/Toast'

const useLoginEffect = () => {
    const router = useRouter()
    const data = reactive({
        username: '',
        password: ''
    })
    const handleLogin = async (showToast) => {
        try {
                const result = await post('/api/user/login', {
                username: data.username,
                password: data.password
            })
            if (result?.errno === 0) {
                localStorage.isLogin = true
                router.push({ name: 'Home' })
            } else {
                showToast('登录失败')
            }
        } catch (e) {
            showToast('请求失败')
        }
    }
    const { username, password } = toRefs(data)
    return {
        username,
        password,
        handleLogin
    }
}

const useRegisterEffect = () => {
    const router = useRouter()
    const handelRegisterClick = () => {
        router.push({ name: 'Register' })
    }
    return {
        handelRegisterClick
    }
}

export default {
    name: 'Login',
    components: {
        Toast
    },
    setup() {
        const { toast, showToast } = useToastEffect()
        const { username, password, handleLogin } = useLoginEffect(showToast)
        const { handelRegisterClick } = useRegisterEffect()
        return {
            username,
            password,
            toast,
            handleLogin,
            handelRegisterClick
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__img {
        display: block;
        margin: 0 auto 0.4rem auto;
        width: 0.66rem;
        height: 0.66rem;
    }
    &__input {
        box-sizing: border-box;
        height: 0.48rem;
        margin: 0 0.4rem 0.16rem 0.4rem;
        padding: 0 0.16rem;
        background: #f9f9f9;
        border: 0.01rem solid rgba(0, 0, 0, 0.1);
        border-radius: 0.06rem;
        &__content {
            line-height: 0.48rem;
            border: none;
            outline: none;
            width: 100%;
            background: none;
            font-size: 0.16rem;
            color: $content-notice-color;
            &::placeholder {
                color: $content-notice-color;
            }
        }
    }
    &__login-button {
        margin: 0.32rem 0.4rem 0.16rem 0.4rem;
        line-height: 0.48rem;
        background: $button-color;
        box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
        border-radius: 0.04rem;
        color: $background-color;
        font-size: 0.16rem;
        text-align: center;
    }
    &__login-link {
        text-align: center;
        font-size: 0.14rem;
        color: $content-notice-color;
    }
}
</style>
