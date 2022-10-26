export interface User_Create {
    name: string,
    email: string,
    password: string
}

export interface User_Incomming {
    _id: string,
    email: string
}

export interface User_Login {
    email: string,
    password: string
}

