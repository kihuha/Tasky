export interface ITask {
    id: number
    title: string
    status: boolean
    created: Date
}

export interface IState {
    tasks: ITask[] | []
}


export interface IAction {
    type: string
    data: ITask
}