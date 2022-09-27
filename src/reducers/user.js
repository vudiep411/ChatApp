export default (state = null, action) => {
    switch(action.type) {
        case 'AUTH_USER':
            return {...action.payload}
        case 'LOGOUT':
            return null
        default:
            return state
        
    }
    
}