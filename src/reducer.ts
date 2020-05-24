// TYPES
import { StateInterface, ActionInterface, TaskInterface } from './types';

let count = 0;
const reducer = (
    state: StateInterface,
    action: ActionInterface
): StateInterface => {
    const addTaskFunc = (
        state: StateInterface,
        action: ActionInterface
    ): TaskInterface[] => {
        if (action.data.title.trim().length > 0) {
            count += 1;
            return [
                ...state.tasks,
                {
                    id: count + 1,
                    title: action.data.title,
                    status: action.data.status,
                    created: action.data.created,
                },
            ];
        } else {
            return state.tasks;
        }
    };

    const updateTaskFunc = (
        state: StateInterface,
        action: ActionInterface
    ): TaskInterface[] => {
        const getSpecificTask = state.tasks.filter(
            (item) => item.id === action.data.id
        )[0];

        const otherTasks = state.tasks.filter(
            (item) => item.id !== action.data.id
        );

        return [
            ...otherTasks,
            {
                id: getSpecificTask.id,
                title: getSpecificTask.title,
                status: !getSpecificTask.status,
                created: getSpecificTask.created,
            },
        ].sort((a, b) => a.id - b.id);
    };

    const deleteTasksFunc = (
        state: StateInterface,
        action: ActionInterface
    ): TaskInterface[] => {
        const filteredTasks = state.tasks
            .filter((item) => item.id !== action.data.id)
            .sort((a, b) => a.id - b.id);

        return filteredTasks;
    };

    switch (action.type) {
        case 'ADD_TODO':
            return Object.assign(
                {},
                {
                    tasks: addTaskFunc(state, action),
                }
            );
        case 'MARK_AS_DONE_OR_UNDO':
            return Object.assign(
                {},
                {
                    tasks: updateTaskFunc(state, action),
                }
            );
        case 'DELETE_TASK':
            return Object.assign(
                {},
                {
                    tasks: deleteTasksFunc(state, action),
                }
            );
        default:
            return state;
    }
};

export default reducer;
