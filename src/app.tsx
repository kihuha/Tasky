import React, { Reducer, useReducer, useState, FormEvent, MouseEvent } from "react";
import { render } from 'react-dom'

// TYPES
import { IState, IAction, ITask } from './types'


const App = () => {
    const reducer = (state: IState, action: IAction) => {
        switch (action.type) {
            case 'ADD_TODO':
                if (action.data.title.trim().length > 0) {
                    setIdTrack(idTrack + 1)
                    return Object.assign(
                        {},
                        {
                            tasks: [
                                ...state.tasks,
                                {
                                    id: state.tasks.length + 1,
                                    title: action.data.title,
                                    status: action.data.status,
                                    created: action.data.created
                                }
                            ]
                        }
                    )
                } else {
                    return state
                }
            case 'MARK_AS_DONE_OR_UNDO':
                const getSpecificTask = state.tasks.filter(
                    (item) => item.id === action.data.id
                )[0]

                const otherTasks = state.tasks.filter(
                    (item) => item.id !== action.data.id
                )

                const newTasks = [
                    ...otherTasks,
                    {
                        id: getSpecificTask.id,
                        title: getSpecificTask.title,
                        status: !getSpecificTask.status,
                        created: getSpecificTask.created
                    }
                ]



                return Object.assign(
                    {},
                    {
                        tasks: newTasks.sort((a, b) => a.id - b.id)
                    }
                )
            case 'DELETE_TASK':
                const filteredTasks = state.tasks.filter(
                    (item) => item.id !== action.data.id
                ).sort((a, b) => a.id - b.id)

                return Object.assign(
                    {},
                    {
                        tasks: [
                            ...filteredTasks
                        ]
                    }
                )
            default:
                return state
        }
    }

    const [input, setInput] = useState<string>('')
    const [idTrack, setIdTrack] = useState<number>(1)
    const [state, dispatch] = useReducer<Reducer<any, any>>(
        reducer,
        {
            tasks: []
        }
    )

    const handleOptions = (e: MouseEvent) => {
        const el = e.target as HTMLElement
        el.parentElement?.children[1].classList.toggle('expand')
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(
            {
                type: 'ADD_TODO',
                data: {
                    title: input,
                    status: false,
                    created: new Date
                }
            })

    }

    return (
        <section className="col-sm-12 col-md-6 col-lg-4 mx-auto p-0">
            <header className="header px-4">
                <h1 className="header__brand">Tasky</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group header__input-group">
                        <input
                            type="text"
                            name="task"
                            id="taskInputID"
                            className="form-control header__input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="What to do...!"
                        />
                        <small>Press 'enter' to add</small>
                    </div>
                </form>
            </header>
            <div className="task__list px-4">
                <div className="task__list-title">
                    <h2 className="m-0">Today</h2>
                    <small>Click Task to expand options</small>
                </div>
                {
                    state.tasks.map(
                        (task: ITask, index: number) => (
                            <div
                                key={index}
                                className={`task shadow ${task.status && 'task--done'}`}
                                onClick={handleOptions}
                            >
                                <div className="task__content d-flex justify-content-between align-items-center">
                                    <div className="left">
                                        <p className={`m-0 ${task.status && 'decoration-strikethrough'}`}>{task.title}</p>
                                        <small>{task.created.toLocaleDateString()}</small>
                                    </div>
                                    <div className="right">
                                        {task.status ? 'DONE' : 'NOT DONE'}
                                    </div>
                                </div>
                                <div className="task__options d-flex align-items-end">
                                    <div className="d-flex align-items-center justify-content-between w-100" role="group" aria-label="Basic example">
                                        <button
                                            type="button"
                                            className="btn btn-success w-25"
                                            onClick={
                                                () => dispatch(
                                                    {
                                                        type: 'MARK_AS_DONE_OR_UNDO',
                                                        data: { id: task.id }
                                                    }
                                                )
                                            }
                                        >
                                            {task.status ? 'Undo' : 'Done'}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger w-25"
                                            onClick={
                                                () => dispatch(
                                                    {
                                                        type: 'DELETE_TASK',
                                                        data: { id: task.id }
                                                    }
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </section>
    )
}

render(
    <App />,
    document.querySelector('#root')
)
