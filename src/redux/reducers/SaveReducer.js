const initialState = {
    numero: 10
}

const saveReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE': return {
            ...state, // sintassi per copiare tutti gli elementi dello stato, per poi override di numero 
            numero: state.numero - 1
        }
        default:
            return state;

    }
}
export default saveReducer;
