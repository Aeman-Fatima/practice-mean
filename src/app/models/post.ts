

export interface Post_Create {
    title: string,
    content: string
}

export interface Post_Edit{
    _id: string,
    title: string,
    content: string
}

export interface Post_Incomming {
    _id: any
    title: string
    content: string
    creater: string
}