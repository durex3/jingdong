<template>
    <div class="nearby">
        <h3 class="nearby__title">附近店铺</h3>
        <router-link
            :to="`/shop/${item._id}`"
            v-for="item in nearbys"
            :key="item._id"
        >
            <ShopInfo :item="item"></ShopInfo>
        </router-link>

    </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

const useNearbysEffect = () => {
    const nearbys = ref([])
    const getnearbys = async () => {
        const result = await get('/api/shop/hot-list')
        if (result?.errno === 0 && result?.data?.length) {
            nearbys.value = result.data
        }
    }
    return {
        nearbys,
        getnearbys
    }
}

export default {
    name: 'Nearby',
    components: {
        ShopInfo
    },
    setup() {
        const { nearbys, getnearbys } = useNearbysEffect()
        getnearbys()
        return {
            nearbys
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.nearby {
    &__title {
        margin: 0.16rem 0 0.02rem 0;
        font-size: 0.18rem;
        font-weight: normal;
        color: $content-color;
    }
    a {
        text-decoration: none;
    }
}
</style>
