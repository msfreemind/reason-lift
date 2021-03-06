import * as APIUtil from '../util/draft_api_util';

export const RECEIVE_DRAFTS = "RECEIVE_DRAFTS";
export const RECEIVE_DRAFT = "RECEIVE_DRAFT";
export const REMOVE_DRAFT = "REMOVE_DRAFT";
export const CLEAR_ACTIVE_DRAFT = "CLEAR_ACTIVE_DRAFT";
export const RECEIVE_DRAFT_ERRORS = "RECEIVE_DRAFT_ERRORS";

// sync action creators

export const receiveDrafts = drafts => ({
  type: RECEIVE_DRAFTS,
  drafts
});

export const receiveDraft = draft => ({
  type: RECEIVE_DRAFT,
  draft
});

export const removeDraft = draft => ({
  type: REMOVE_DRAFT,
  draft
});

export const clearActiveDraft = () => ({
  type: CLEAR_ACTIVE_DRAFT
});

export const receiveErrors = errors => ({
  type: RECEIVE_DRAFT_ERRORS,
  errors
});

// async action creators

export const fetchDrafts = () => dispatch => {
  return APIUtil.getDrafts().then(
    res => dispatch(receiveDrafts(res.data)), 
    err => dispatch(receiveErrors(err.response.data))
  );
};

export const fetchDraft = draftId => dispatch => {
  return APIUtil.getDraft(draftId).then(
    res => dispatch(receiveDraft(res.data)), 
    err => dispatch(receiveErrors(err.response.data))
  );
};

export const createDraft = draft => dispatch => {
  return APIUtil.postDraft(draft).then(
    res => dispatch(receiveDraft(res.data)), 
    err => dispatch(receiveErrors(err.response.data))
  );
};

export const updateDraft = draft => dispatch => {
  return APIUtil.putDraft(draft).then(
    res => dispatch(receiveDraft(res.data)), 
    err => dispatch(receiveErrors(err.response.data))
  );
};

export const destroyDraft = draftId => dispatch => {
  return APIUtil.deleteDraft(draftId).then(
    res => dispatch(removeDraft(res.data)), 
    err => dispatch(receiveErrors(err.response.data))
  );
};