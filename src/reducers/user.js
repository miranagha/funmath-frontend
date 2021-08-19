

const initialState = {
    token: null,
}


const register = (state = initialState, action) => {
    switch (action.type) {



        case 'LOG_OUT':
            return {
                ...state,
                token: null
            }
        case 'TOKEN':
            return {
                ...state,
                token: action.payload,
            }

        default:
            return state;
    }
}
export default register;