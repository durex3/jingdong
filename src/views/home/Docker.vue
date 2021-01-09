<template>
    <div class="docker">
        <div
            v-for="(item, index) in dockers"
            :key="item.icon"
            :class="{'docker__item': true, 'docker__item--active': index === 0}"
        >
            <router-link :to="item.to">
                <div
                    class="iconfont"
                    v-html="item.icon"
                ></div>
                <div class="docker__title">{{item.text}}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Docker',
    setup() {
        const dockers = [
            { icon: '&#xe7a5;', text: '首页', to: { name: 'Home' } },
            { icon: '&#xe62a;', text: '购物车', to: { name: 'Cart' } },
            { icon: '&#xe601;', text: '订单', to: { name: 'Home' } },
            { icon: '&#xe660;', text: '我的', to: { name: 'Home' } }
        ]
        return {
            dockers
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.docker {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    position: absolute;
    padding: 0 0.18rem;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.49rem;
    border-top: 0.01rem solid $content-background;
    &__item {
        flex: 1;
        text-align: center;
        .iconfont {
            margin: 0.07rem 0 0.02rem 0;
            font-size: 0.18rem;
        }
        a {
            color: $content-color;
            text-decoration: none;
        }
        &--active {
            a {
                color: #1fa4fc;
            }
        }
    }
    &__title {
        font-size: 0.2rem;
        transform: scale(0.5, 0.5);
        transform-origin: center top;
    }
}
</style>
