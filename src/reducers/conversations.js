export default (state = {id:'', messages: []}, action) => {
    switch(action.type) {
        case 'GET_ALL_CONVO':
            return {...action.payload}
        case 'CHECK_SESSION':
            const newState = state.id === action.payload.id ?
            action.payload : state
            return newState
        case 'EMPTY_OUT_CONVO':
            return {id: '', messages: []}
        case 'LOGOUT':
            return {id: '', messages: []}
        default:
            return state
        
    }
    
}