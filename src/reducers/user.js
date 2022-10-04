import storage from 'redux-persist/lib/storage';

export default (state = null, action) => {
    switch(action.type) {
        case 'AUTH_USER':
            return {...action.payload}
        case 'LOGOUT':
            storage.removeItem('persist:root')
            return null
        default:
            return state
        
    }
    
}