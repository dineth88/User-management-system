import { createSelector } from 'reselect';

const selectUserState = (state) => state.user || {};  // Safeguard against undefined `state.user`

export const selectUserData = createSelector(
  [selectUserState],
  (userState) => userState.userData || []  // Memoized selector
);

// Selectors for task state
const selectTaskState = (state) => state.tasks || {}; // Safeguard against undefined `state.tasks`

export const selectTaskData = createSelector(
  [selectTaskState],
  (taskState) => taskState.data || [] // Memoized selector for task data
);

export const selectTasksForUser = (userId) =>
  createSelector(
    [selectTaskData],
    (taskData) => taskData.filter((task) => task.assigned_to === userId) // Tasks filtered by user
  );
