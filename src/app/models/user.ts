export interface User_Create {
    name: string,
    email: string,
    password: string
}

export interface User_Incomming {
    id: string,
    email: string,
    profile: string
}

export interface User_Login {
    email: string,
    password: string
}

