export default (state = [], action) => {
    switch(action.type) {
        case 'GET_ROOMS':
            return action.payload
        case 'READ_MSG':
            return state.map(room => room.id === action.payload ? {...room, read: true} : room)
        case 'ADD_ROOM':
            return [...state, action.payload]
        case 'LOGOUT':
            return null
        default:
            return state
        
    }
    
}