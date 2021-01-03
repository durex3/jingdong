<template>
    <div class="wrapper">
        <div class="search">
            <div
                class="search__back iconfont"
                @click="handleBackClick"
            >&#xe6f2;</div>
            <div class="search__content">
                <span class="search__content__icon iconfont">&#xe632;</span>
                <input
                    class="search__content__input"
                    placeholder="请输入商品名称"
                />
            </div>
        </div>
        <ShopInfo
            :item="item"
            :hideBorder="true"
            v-show="item.imgUrl"
        ></ShopInfo>
        <Content></Content>
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'
import Content from '../../views/shop/Content'

const userBackEffect = () => {
    const router = useRouter()
    const handleBackClick = () => {
        router.back()
    }
    return {
        handleBackClick
    }
}

const useShopInfoEffect = () => {
    const data = reactive({ item: {} })
    const route = useRoute()
    const getShopInfo = async () => {
        const result = await get(`/api/shop/${route.params.id}`)
        if (result?.errno === 0 && result?.data) {
            data.item = result.data
        }
    }
    const { item } = toRefs(data)
    return {
        item,
        getShopInfo
    }
}

export default {
    name: 'Shop',
    components: {
        ShopInfo,
        Content
    },
    setup() {
        const { item, getShopInfo } = useShopInfoEffect()
        const { handleBackClick } = userBackEffect()
        getShopInfo()
        return {
            item,
            getShopInfo,
            handleBackClick
        }
    }
}
</script>

<style lang="scss">
@import '../../style/viriables.scss';

.wrapper {
    padding: 0 0.18rem;
}
.search {
    display: flex;
    flex-direction: row;
    margin: 0.14rem 0 0.04rem 0;
    line-height: 0.32rem;
    &__back {
        width: 0.3rem;
        font-size: 0.24rem;
        color: #B6B6B6;
    }
    &__content {
        display: flex;
        flex-direction: row;
        flex: 1;
        background: $search-background;
        border-radius: 0.16rem;
        &__icon {
            width: 0.44rem;
            text-align: center;
            color: $search-font-color;
        }
        &__input {
            display: block;
            border: none;
            outline: none;
            background: none;
            width: 100%;
            height: 0.32rem;
            padding-right: 0.2rem;
            color: $content-color;
            font-size: 0.14rem;
            &::placeholder {
                color: $content-color;
            }
        }
    }
}
</style>
