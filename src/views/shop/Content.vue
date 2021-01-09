<template>
    <div class="content">
        <div class="category">
            <div
                :class="{'category__item': true, 'category__item--active': currentTab === item.tab}"
                v-for="item in categories"
                :key="item.tab"
                @click="() => handleTabClick(item.tab)"
            >{{item.name}}</div>
        </div>
        <div class="product">
            <div
                class="product__item"
                v-for="item in contents"
                :key="item._id"
            >
                <img
                    :src="item.imgUrl"
                    class="product__item__img"
                />
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{item.name}}</h4>
                    <p class="product__item__sales">月售{{item.sales}}件</p>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;{{item.price}}</span>
                        <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                    </p>
                </div>
                <div class="product__number">
                    <span
                        class="product__number__minus"
                        @click="() => changeCartItem(shopId, shopName, item, -1)"
                    >-</span>
                    {{getProductCount(shopId, item._id)}}
                    <span
                        class="product__number__add"
                        @click="() => changeCartItem(shopId, shopName, item, 1)"
                    >+</span>
                </div>
            </div>
        </div>
    </div>
    <Cart></Cart>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import Cart from './Cart'
import { useCommonCartEffect } from './common-cart-effect'

const useCategoriesEffect = () => {
    const categories = [
        {
            name: '全部商品',
            tab: 'all'
        },
        {
            name: '秒杀',
            tab: 'seckill'
        },
        {
            name: '新鲜水果',
            tab: 'fruit'
        }
    ]
    return {
        categories
    }
}

const useContentsEffect = (shopId, currentTab) => {
    const contents = ref([])
    const getContentData = async () => {
        const result = await get(`/api/shop/${shopId}/products`, {
            tab: currentTab.value
        })
        if (result?.errno === 0 && result?.data?.length) {
            contents.value = result.data
        }
    }
    watchEffect(() => {
        getContentData()
    })
    return {
        contents
    }
}

const useTabEffect = () => {
    const currentTab = ref('all')
    const handleTabClick = (tab) => {
        currentTab.value = tab
    }
    return {
        currentTab,
        handleTabClick
    }
}

const useChangeCartEffect = () => {
    const store = useStore()
    const changeShopName = (shopId, shopName) => {
        store.commit('changeShopName', {
            shopId,
            shopName
        })
    }
    const { carts, changeCartItemInfo } = useCommonCartEffect()
    const changeCartItem = (shopId, shopName, item, count) => {
        changeShopName(shopId, shopName)
        changeCartItemInfo(shopId, item, count)
    }
    const getProductCount = (shopId, productId) => {
        return carts?.[shopId]?.products?.[productId]?.count || 0
    }
    return {
        carts,
        changeCartItem,
        getProductCount
    }
}

export default {
    name: 'Content',
    props: ['shopName'],
    components: {
        Cart
    },
    setup() {
        const route = useRoute()
        const shopId = route.params.id
        const { categories } = useCategoriesEffect()
        const { currentTab, handleTabClick } = useTabEffect()
        const { contents } = useContentsEffect(shopId, currentTab)
        const { carts, changeCartItem, getProductCount } = useChangeCartEffect()
        return {
            categories,
            contents,
            shopId,
            carts,
            changeCartItem,
            getProductCount,
            currentTab,
            handleTabClick
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: 0.5rem;
}
.category {
    width: 0.76rem;
    height: 100%;
    overflow-y: scroll;
    background: $search-background;
    &__item {
        line-height: 0.4rem;
        text-align: center;
        font-size: 0.14rem;
        color: $content-color;
        &--active {
            background: $background-color;
        }
    }
}
.product {
    flex: 1;
    overflow-y: scroll;
    &__item {
        position: relative;
        display: flex;
        flex-direction: row;
        padding: 0.12rem 0;
        margin: 0 0.16rem;
        border-bottom: 0.01rem solid $content-background;
        &__img {
            width: 0.68rem;
            height: 0.68rem;
            margin-right: 0.16rem;
        }
        &__detail {
            overflow: hidden;
        }
        &__title {
            margin: 0;
            line-height: 0.2rem;
            font-size: 0.14rem;
            color: $content-color;
            @include ellipsis;
        }
        &__sales {
            margin: 0.06rem 0;
            line-height: 0.16rem;
            font-size: 0.12rem;
            color: $content-color;
        }
        &__price {
            margin: 0;
            line-height: 0.2rem;
            font-size: 0.14rem;
            color: $hightlinght-color;
        }
        &__yen {
            font-size: 0.12rem;
        }
        &__origin {
            margin-left: 0.06rem;
            line-height: 0.2rem;
            font-size: 0.12rem;
            color: $hight-color;
            text-decoration: line-through;
        }
        .product__number {
            position: absolute;
            right: 0;
            bottom: 0.12rem;
            &__minus, &__add {
                display: inline-block;
                width: 0.2rem;
                height: 0.2rem;
                line-height: 0.16rem;
                border-radius: 50%;
                font-size: 0.2rem;
                text-align: center;
            }
            &__minus {
                box-sizing: border-box;
                border: 0.01rem solid$medium-color;
                color: $medium-color;
                margin-right: 0.05rem;

            }
            &__add {
                background: $button-color;
                color: $background-color;
                margin-left: 0.05rem;
            }
        }
    }
}
</style>
