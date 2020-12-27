<template>
    <div class="docker">
        <div
            v-for="(item, index) in dockers"
            :key="item.icon"
            :class="{'docker__item': true, 'docker__item--active': index === 0}"
        >
            <div
                class="iconfont"
                v-html="item.icon"
            ></div>
            <div class="docker__title">{{item.text}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Docker',
    setup() {
        const dockers = [
            { icon: '&#xe7a5;', text: '首页' },
            { icon: '&#xe62a;', text: '购物车' },
            { icon: '&#xe601;', text: '订单' },
            { icon: '&#xe660;', text: '我的' }
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
    color: $content-color;
    border-top: 0.01rem solid $content-background;
    &__item {
        flex: 1;
        text-align: center;
        .iconfont {
            margin: 0.07rem 0 0.02rem 0;
            font-size: 0.18rem;
        }
        &--active {
            color: #1fa4fc;
        }
    }
    &__title {
        font-size: 0.2rem;
        transform: scale(0.5, 0.5);
        transform-origin: center top;
    }
}
</style>
