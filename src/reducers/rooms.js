export default (state = [], action) => {
    switch(action.type) {
        case 'GET_ROOMS':
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return state
        
    }
    
}