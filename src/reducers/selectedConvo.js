export default (state = '', action) => {
    switch(action.type) {
        case 'SET_CONVO':
            return action.payload
        case 'LOGOUT':
        case 'CLOSE_CONVO':
            return '' 
        default:
            return state
        
    }
    
}