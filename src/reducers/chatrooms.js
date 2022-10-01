export default (state = [], action) => {
    switch(action.type) {
        case 'GET_ROOMS':
            return action.payload
        default:
            return state
        
    }
    
}