/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.global;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.location,
  );
const makeSelectSearch = () =>
  createSelector(selectRouter, state => state.location.search);

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.loading);

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.error);

const makeSelectTaskResult = () =>
  createSelector(selectGlobal, globalState => globalState.task_result);

export {
  makeSelectTaskResult,
  makeSelectLoading,
  makeSelectLocation,
  makeSelectSearch,
  makeSelectError,
};
