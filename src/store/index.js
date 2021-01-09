import { createStore } from 'vuex'

const setLocalCarts = (state) => {
    const carts = state.carts
    const cartsString = JSON.stringify(carts)
    localStorage.carts = cartsString
}

const getLocalCarts = () => {
    return JSON.parse(localStorage.carts) || {}
}

export default createStore({
    state: {
        carts: getLocalCarts()
    },
    mutations: {
        changeCartItemInfo(state, payload) {
            const { shopId, product, count } = payload
            const carts = state.carts
            const shopInfo = carts[shopId] || {
                shopName: '',
                products: {}
            }
            let productInfo = shopInfo.products[product._id]
            if (!productInfo) {
                product.count = 0
                productInfo = product
            }
            productInfo.count += count
            if (productInfo.count < 0) {
                productInfo.count = 0
            }
            if (count > 0) {
                productInfo.checked = true
            }
            shopInfo.products[productInfo._id] = productInfo
            carts[shopId] = shopInfo
            setLocalCarts(state)
        },
        changeCartItemChecked(state, payload) {
            const { shopId, product } = payload
            const carts = state.carts
            const shopInfo = carts[shopId]
            const productInfo = shopInfo.products[product._id]
            productInfo.checked = !productInfo.checked
            setLocalCarts(state)
        },
        cleanCartProducts(state, payload) {
            const { shopId } = payload
            const carts = state.carts
            carts[shopId].products = {}
            setLocalCarts(state)
        },
        setCartItemsChecked(state, payload) {
            const { shopId, allChecked } = payload
            const carts = state.carts
            const products = carts[shopId].products
            if (products) {
                for (const i in products) {
                    const product = products[i]
                    if (product.count > 0) {
                        product.checked = allChecked
                    }
                }
            }
            setLocalCarts(state)
        },
        changeShopName(state, payload) {
            const { shopId, shopName } = payload
            const shopInfo = state.carts[shopId] || {
                shopName: '',
                products: {}
            }
            shopInfo.shopName = shopName
            state.carts[shopId] = shopInfo
            setLocalCarts(state)
        }
    },
    actions: {
    },
    modules: {
    }
})
