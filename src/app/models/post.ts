

export interface Post_Create {
    title: string,
    content: string
}

export interface Post_Edit {
    id: string,
    title: string,
    content: string
}

export interface Post_Incomming {
    id: any
    title: string
    content: string
    userId: string
}

export interface Picture_Upload {
    image: string
}