<template>
    <div
        class="mask"
        v-if="showCart && calculations.total > 0"
        @click="handleCartShowChange"
    ></div>
    <div class="cart">
        <div
            class="product"
            v-if="showCart && calculations.total > 0"
        >
            <div class="product__hearder">
                <div class="product__hearder__all">
                    <span
                        class="product__hearder__icon iconfont"
                        v-html="calculations.allChecked ? '&#xe66c;' : '&#xe63a;'"
                        @click="() => setCartItemsChecked(shopId, calculations.allChecked)"
                    ></span>
                    全选
                </div>
                <div class="product__hearder__clear">
                    <span @click="() => cleanCartProducts(shopId)">清空购物车</span>
                </div>
            </div>
            <template
                v-for="item in products"
                :key="item._id"
            >
                <div
                    class="product__item"
                    v-if="item.count > 0"
                >
                    <div
                        class="product__item__checked iconfont"
                        v-html="item.checked ? '&#xe66c;': '&#xe63a;'"
                        @click="() => changeCartItemChecked(shopId, item)"
                    ></div>
                    <img
                        :src="item.imgUrl"
                        class="product__item__img"
                    />
                    <div class="product__item__detail">
                        <h4 class="product__item__title">{{item.name}}</h4>
                        <p class="product__item__price">
                            <span class="product__item__yen">&yen;{{item.price}}</span>
                            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                        </p>
                    </div>
                    <div class="product__number">
                        <span
                            class="product__number__minus"
                            @click="() => changeCartItemInfo(shopId, item, -1)"
                        >-</span>
                        {{item.count}}
                        <span
                            class="product__number__add"
                            @click="() => changeCartItemInfo(shopId, item, 1)"
                        >+</span>
                    </div>
                </div>
            </template>
        </div>
        <div class="check">
            <div class="check__icon">
                <img
                    class="check__icon__img"
                    src="http://www.dell-lee.com/imgs/vue3/basket.png"
                    @click="handleCartShowChange"
                />
                <div class="check__icon__tag">{{calculations.total}}</div>
            </div>
            <div class="check__info">
                总计：<span class="check__info__price">&yen;{{calculations.price}}</span>
            </div>
            <div class="check__button">
                <router-link :to="{name: 'Home'}">
                    去结算
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from './common-cart-effect'

const usecartEffect = (shopId) => {
    const store = useStore()
    const { carts, changeCartItemInfo } = useCommonCartEffect()
    const calculations = computed(() => {
        const products = carts[shopId]?.products
        let total = 0
        let price = 0
        let allChecked = true
        if (products) {
            for (const i in products) {
                const product = products[i]
                total += product.count
                if (product.checked) {
                    price += product.count * product.price
                }
                if (product.count > 0 && !product.checked) {
                    allChecked = false
                }
            }
        }
        price = price.toFixed(2)
        return {
            total,
            price,
            allChecked
        }
    })
    const products = computed(() => {
        return carts[shopId]?.products || []
    })
    const changeCartItemChecked = (shopId, product) => {
        store.commit('changeCartItemChecked', {
            shopId,
            product
        })
    }
    const cleanCartProducts = (shopId) => {
        store.commit('cleanCartProducts', {
            shopId
        })
    }
    const setCartItemsChecked = (shopId, allChecked) => {
        allChecked = !allChecked
        store.commit('setCartItemsChecked', {
            shopId,
            allChecked
        })
    }
    return {
        calculations,
        products,
        changeCartItemInfo,
        changeCartItemChecked,
        cleanCartProducts,
        setCartItemsChecked
    }
}

const toggleCartEffect = () => {
    const showCart = ref(false)
    const handleCartShowChange = () => {
        showCart.value = !showCart.value
    }
    return {
        showCart,
        handleCartShowChange
    }
}

export default {
    name: 'Cart',
    setup() {
        const route = useRoute()
        const shopId = route.params.id
        const {
            calculations,
            products,
            changeCartItemInfo,
            changeCartItemChecked,
            cleanCartProducts,
            setCartItemsChecked
        } = usecartEffect(shopId)
        const { showCart, handleCartShowChange } = toggleCartEffect()
        return {
            calculations,
            products,
            shopId,
            changeCartItemInfo,
            changeCartItemChecked,
            cleanCartProducts,
            setCartItemsChecked,
            showCart,
            handleCartShowChange
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}
.cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background: $content-background;
}
.product {
    flex: 1;
    overflow-y: scroll;
    background: #FFF;
    &__hearder {
        display: flex;
        flex-direction: row;
        line-height: 0.52rem;
        border-bottom: 0.01rem solid $content-background;
        font-size: 0.14rem;
        color: $content-color;
        &__all {
            width: 0.64rem;
            margin-left: 0.16rem;
        }
        &__icon {
            color: #0091FF;
            font-size: 0.2rem;
        }
        &__clear {
            flex: 1;
            margin-right: 0.16rem;
            text-align: right;
        }
    }
    &__item {
        position: relative;
        display: flex;
        flex-direction: row;
        padding: 0.12rem 0;
        margin: 0 0.16rem;
        border-bottom: 0.01rem solid $content-background;
        &__checked {
            line-height: 0.5rem;
            margin-right: 0.2rem;
            color: #0091FF;
            font-size: 0.2rem;
        }
        &__img {
            width: 0.46rem;
            height: 0.46rem;
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
        &__price {
            margin: 0.06rem 0 0 0;
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
.check {
    display: flex;
    height: 0.49rem;
    flex-direction: row;
    line-height: 0.49rem;
    border-top: 0.01rem solid $content-background;
    &__icon {
        position: relative;
        width: 0.84rem;
        &__img {
            display: block;
            width: 0.28rem;
            height: 0.26rem;
            margin: 0.12rem auto;
        }
        &__tag {
            position: absolute;
            left: 0.45rem;
            top: 0.04rem;
            padding: 0 0.04rem;
            min-width: 0.2rem;
            height: 0.2rem;
            line-height: 0.2rem;
            background-color: $hightlinght-color;
            border-radius: 50%;
            font-size: 0.12rem;
            text-align: center;
            color:$background-color;
            transform: scale(0.5);
            transform-origin: left center;
        }
    }
    &__info {
        flex: 1;
        color: $content-color;
            font-size: 0.12rem;
        &__price {
            line-height: 0.49rem;
            color: $hightlinght-color;
            font-size: 0.18rem;
        }
    }
    &__button {
        width: 0.98rem;
        background-color: #4FB09F;
        color: $background-color;
        font-size: 0.14rem;
        text-align: center;
        a {
            color: $background-color;
            text-decoration: none;
        }
    }
}
</style>
