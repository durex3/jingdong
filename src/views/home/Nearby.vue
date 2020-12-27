<template>
    <div class="nearby">
        <h3 class="nearby__title">附近店铺</h3>
        <div
            class="nearby__item"
            v-for="item in nearbys"
            :key="item.id"
        >
            <img
                class="nearby__item__img"
                :src="item.img"
            />
            <div class="nearby__content">
                <div class="nearby__content__title">{{item.title}}</div>
                <div class="nearby__content__tags">
                    <span
                        v-for="(tag, innerIndex) in item.tags"
                        :key="innerIndex"
                        class="nearby__content__tag"
                    >{{tag}}</span>
                </div>
                <p class="nearby__content__highlight">{{item.desc}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Nearby',
    setup() {
        const nearbys = [
            {
                id: 1,
                img: 'http://www.dell-lee.com/imgs/vue3/near.png',
                title: '沃尔玛',
                tags: ['月售1万+', '起送￥0', '基础运费￥5'],
                desc: 'vip尊享'
            },
             {
                id: 2,
                img: 'http://www.dell-lee.com/imgs/vue3/near.png',
                title: '沃尔玛',
                tags: ['月售1万+', '起送￥0', '基础运费￥5'],
                desc: 'vip尊享'
            }
        ]
        return {
            nearbys
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.nearby {
    &__title {
        margin: 0.16rem 0 0.02rem 0;
        font-size: 0.18rem;
        font-weight: normal;
        color: $content-color;
    }
    &__item {
        display: flex;
        padding-top: 0.12rem;
        &__img {
            margin-right: 0.16rem;
            width: 0.56rem;
            height: 0.56rem;
        }
    }
    &__content {
        flex: 1;
        padding-bottom: 0.12rem;
        border-bottom: 0.01rem solid $content-background;
        &__title {
            line-height: 0.22rem;
            font-size: 0.16rem;
            color: $content-color;
        }
        &__tags {
            margin-top: 0.08rem;
            line-height: 0.18rem;
            font-size: 0.13rem;
            color: $content-color;
        }
        &__tag {
            margin-right: 0.16rem;
        }
        &__highlight {
            margin: 0.08rem 0 0 0;
            line-height: 0.18rem;
            font-size: 0.13rem;
            color: #e93b3b;
        }
    }
}
</style>
