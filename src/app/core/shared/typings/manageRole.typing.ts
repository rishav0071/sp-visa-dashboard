export interface IRoleBase {
    id?:string,
    description?:string,
    title: string,
    siblings: ISibling[],
}

export interface ISibling {
    id?:string,
    description?:string,
    title: string,
    actions?: IAction[],
    permission?: boolean,
    siblings ?: ISibling[]
}

export interface IAction {
    name: string,
    type: string,
    description?: string,
    permission?:boolean
}

// export interface ISubChild {
//     id?:string,
//     title: string,
//     description?:string,
//     actions?: IAction[],
//     permission?: boolean,
// }

export interface Roles{
    name?:string,
    userCount?:string,
    id:string
}