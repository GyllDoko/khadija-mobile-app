const  initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    userInfo: "Admin",
    cart: [],
}

export default function reducers(state = initialState, action) {

    switch (action.type) {
        case "SET_ORIGIN":
            return {
                ...state,
                origin : action.value,
            }
        case "SET_DESTINATION":
            return {
                ...state,
                destination : action.value,
            }
        case "SET_TRAVEL_TIME_INFORMATION":
            return {
                ...state,
                travelTimeInformation : action.value,
            }
        case "USER_LOGIN":
            return  {
                ...state,
                userInfo : action.value
            }
        case "UPDATE_CART":
            const productIndex = state.cart.findIndex(item => item.id == action.value.id)
            if (productIndex !== -1){
                const previousQuantity = state.cart[productIndex].quantity
                const newQuantity = action.value.quantity
                const newCart = state.cart.filter((item, index) => index !== productIndex)
                const product =  {
                    ...action.value,
                    quantity: previousQuantity + newQuantity
                }
                return {
                    ...state,
                    cart: [
                        ...newCart,
                        product
                    ]

                }
            }else{
                return {
                    ...state,
                    cart: [
                        ...state.cart,
                        action.value
                    ]
                }
            }
        case "UPDATE_QUANTITY":
            let prodIndex = state.cart.findIndex(e => e.id === action.value.item.id)
            const newCart = state.cart.filter((item, index) => index !== prodIndex)
            const product =  {
                ...action.value.item,
                quantity: action.value.quantity
            }
            return {
                ...state,
                cart: [
                    ...newCart,
                    product
                ]

            }
        case "GET_ORDER":
            return {
                ...state,
                orders : action.value
            }

        default:
            return state
    }
}