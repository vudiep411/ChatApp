export default (state = null, action) => {
    switch(action.type) {
        case 'GET':
            return {...action.payload}
        default:
            return state
        
    }
    
}