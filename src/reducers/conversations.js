export default (state = [], action) => {
    switch(action.type) {
        case 'GET_CONVO':
            return action.payload
        case 'POST_CONVO': 
            return []
        case 'LOGOUT':
            return null
        default:
            return state
        
    }
    
}