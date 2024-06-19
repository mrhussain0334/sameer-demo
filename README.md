# How to build this project
First you need to create a project in angular (use the LTS version)

Once the project is created lets install the following packages
```bash
ng add @ngrx/store@latest
ng add @ngrx/effects@latest
ng add @ngrx/store-devtools
npm i axos
npm i @arcgis/core
```

After installing the above lets move on to creating our first TASK CRUD via NGRX

# Ngrx
Ngrx is use for global state management which allows the developer to share data with other components with ease

Lets start with creating a component first called Task Management

```
src/app/pages/task/components/task-management
```
First Create State

```
export interface TaskDto {
id: number,
name: string,
description: string,
}

export interface TaskState {
tasks: TaskDto[],
}


export const initialTaskState: TaskState = {
tasks: [],
}
```


After creating a component lets start by creating an Action


An Action is used with interacting with the Store

```
export const addTask = createAction('[Task Management Component] Add Task', props<{task: TaskDto}>());
export const removeTask = createAction('[Task Management Component] Remove Task', props<{ id: number }>());
export const updateTask = createAction('[Task Management Component] Update Task', props<{task: TaskDto}>());
```
Each action has a purpose and makes changes to the store.
