export interface TaskInterface {
    id: number;
    title: string;
    status: boolean;
    created: Date;
}

export interface StateInterface {
    tasks: TaskInterface[] | [];
}

export interface ActionInterface {
    type: string;
    data: TaskInterface;
}
