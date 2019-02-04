import { connect } from 'react-redux'
import Home from '../components/Home'
import { authenticate } from '../Actions'

const mapState = state => {
    return state.authUser;
};

const mapDispatch = dispatch => ({
    authenticate: () => authenticate(dispatch)
});

export default connect(
  mapState,
  mapDispatch
)(Home)