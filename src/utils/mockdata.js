import mock from './images/mock.jpg'
import mock2 from './images/mock2.jpg'

export const userMessages = [
    {
        _id: '1',
        uid: '123456',
        name: 'Vu Diep',
        username: 'Vu Diep',
        date: '09/25/2022',
        image: mock,
        lastMessage: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam pariatur, in rerum nostrum, asperiores mollitia molestias modi aspernatur perferendis repudiandae eligendi vero aliquid tenetur nam fugiat neque quisquam vitae et.' 
    },
    {
        _id: '2',
        uid: '123457',
        name: 'John Diep',
        username: 'John Diep',
        date: '09/25/2022',
        image: mock2,
        lastMessage: 'Hello'
    },
    {
        _id: '3',
        uid: '123458',
        name: 'John Doe',
        username: 'John Doe',
        date: '09/25/2022',
        image: '',
        lastMessage: 'Hello Vu'
    }
]

export const messages = [
    {
        id: '1',
        conversations: [
        {
            uid: '123456',
            username: 'Vu Diep',
            date: '09/27/2022',
            image: mock,
            message: 'Hello',
        },
        {
            date: '09/27/2022',
            image: mock,
            username: 'Vu Diep',
            uid: '123456',
            message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam pariatur, in rerum nostrum, asperiores mollitia molestias modi aspernatur perferendis repudiandae eligendi vero aliquid tenetur nam fugiat neque quisquam vitae et.',
        },
        {
            uid: '123456',
            username: 'Vu Diep',
            date: '09/27/2022',
            image: mock,
            message: 'Hello',
        },
        {
            date: '09/27/2022',
            image: mock,
            username: 'Vu Diep',
            uid: '123456',
            message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam pariatur, in rerum nostrum, asperiores mollitia molestias modi aspernatur perferendis repudiandae eligendi vero aliquid tenetur nam fugiat neque quisquam vitae et.',
        },
        {
            uid: '123456',
            username: 'Vu Diep',
            date: '09/27/2022',
            image: mock,
            message: 'Hello',
        },
        {
            date: '09/27/2022',
            image: mock,
            username: 'Vu Diep',
            uid: '123456',
            message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam pariatur, in rerum nostrum, asperiores mollitia molestias modi aspernatur perferendis repudiandae eligendi vero aliquid tenetur nam fugiat neque quisquam vitae et.',
        },
        {
            uid: '123456',
            username: 'Vu Diep',
            date: '09/27/2022',
            image: mock,
            message: 'Hello',
        },
        {
            date: '09/27/2022',
            image: mock,
            username: 'Vu Diep',
            uid: '123456',
            message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam pariatur, in rerum nostrum, asperiores mollitia molestias modi aspernatur perferendis repudiandae eligendi vero aliquid tenetur nam fugiat neque quisquam vitae et.',
        }
    
    ]
    },
    {
        id: '2',
        conversations: [
        {  
            uid: '123457',
            username: 'John Diep',
            date: '09/25/2022',
            image: mock2,
            message: 'Hello'
        }
        ]
    },
    {
        id: '3',
        conversations: [
        {  
            uid: '123458',
            username: 'John Doe',
            date: '09/25/2022',
            image: '',
            message: 'Hello Vu'
        }
        ]
    }
]