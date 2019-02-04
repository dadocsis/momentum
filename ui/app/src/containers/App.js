import { connect } from 'react-redux'
import App from '../components/App'
import {fetchToken} from '../Actions'

const mapState = state => ({
    ...state.authUser
});

const mapDispatch = dispatch => ({
    fetchToken: (code) => fetchToken(dispatch, code)
});

export default connect(
  mapState,
  mapDispatch
)(App)