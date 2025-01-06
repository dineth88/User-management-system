import { createSelector } from 'reselect';

const selectUserState = (state) => state.user || {};  // Safeguard against undefined `state.user`

export const selectUserData = createSelector(
  [selectUserState],
  (userState) => userState.userData || {}  // Memoized selector
);
