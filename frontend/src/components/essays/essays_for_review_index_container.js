import { connect } from 'react-redux';
import { fetchReviewableEssays } from '../../actions/essay_actions';
import { setMode } from '../../actions/mode_actions';
import EssaysForReviewIndex from './essays_for_review_index';

const mapStateToProps = state => ({
  reviewables: Object.values(state.entities.reviewables)
});

const mapDispatchToProps = dispatch => ({
  fetchReviewableEssays: () => dispatch(fetchReviewableEssays()),
  setMode: mode => dispatch(setMode(mode))
});

export default connect(mapStateToProps, mapDispatchToProps)(EssaysForReviewIndex);