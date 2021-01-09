import { useStore } from 'vuex'

export const useCommonCartEffect = () => {
    const store = useStore()
    const carts = store.state.carts
    const changeCartItemInfo = (shopId, product, count) => {
        store.commit('changeCartItemInfo', {
            shopId,
            product,
            count
        })
    }
    return {
        carts,
        changeCartItemInfo
    }
}
