const  initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
}

export function NavReducer(state = initialState, action) {
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
        default:
            return state
    }
}