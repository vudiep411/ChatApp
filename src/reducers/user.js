import storage from 'redux-persist/lib/storage';

export default (state = null, action) => {
    switch(action.type) {
        case 'CHANGE_USERNAME':
            return {...state, username: action.payload}
        case 'AUTH_USER':
            return {...action.payload}
        case 'CHANGE_BIO':
        case 'SET_USER_BIO':
            return {...state, bio: action.payload}
        case 'CHANGE_AVATAR':
            return {...state, image: action.payload}
        case 'LOGOUT':
            storage.removeItem('persist:root')
            return null
        default:
            return state
        
    }
    
}