import { connect } from 'react-redux'
import Home from '../components/Home'
import { authenticate, fetchUserInfo } from '../Actions'

const mapState = state => {
    return state.authUser;
};

const mapDispatch = dispatch => ({
  authenticate: () => authenticate(dispatch),
  fetchUserInfo: (accessToken) => fetchUserInfo(dispatch, accessToken)
});

export default connect(
  mapState,
  mapDispatch
)(Home)