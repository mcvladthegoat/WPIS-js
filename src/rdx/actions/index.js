// src/js/actions/index.js
import { ActionType } from "../constants/action-types";

export const addToDoItem = ToDoItem => ({
  type: ActionType.ADD_TODO_ITEM,
  payload: ToDoItem,
});

export const updateToDoItem = ToDoItem => ({
  type: ActionType.UPDATE_TODO_ITEM,
  payload: ToDoItem,
});

export const deleteToDoItem = ToDoItem => ({
  type:ActionType. DELETE_TODO_ITEM,
  payload: ToDoItem,
});
