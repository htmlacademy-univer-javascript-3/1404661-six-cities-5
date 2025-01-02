import { createReducer } from '@reduxjs/toolkit';

import { IComment } from '../../interfaces/comment.interface';
import { LoadingStatus } from '../../emuns/loading-statuses.enum';

import { clearComments, setComments, setCommentsLoadingStatus } from '../actions';

interface CommentsState {
  comments: IComment[];
  isCommentsDataLoading: LoadingStatus;
}

const initialState: CommentsState = {
  comments: [],
  isCommentsDataLoading: LoadingStatus.Init,
};

const commentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(clearComments, (state) => {
      state.comments = [];
      state.isCommentsDataLoading = LoadingStatus.Init;
    })
    .addCase(setCommentsLoadingStatus, (state, action) => {
      state.isCommentsDataLoading = action.payload;
    });
});

export { commentsReducer };
