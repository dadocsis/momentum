

const ActionType = {
  AUTHENTICATE: 'AUTHENTICATE',
  RCV_OAUTH_CODE: 'RCV_OAUTH_CODE',
  RCV_ACCESS_TOKEN: 'RCV_ACCESS_TOKEN',
  RCV_USER_INFO: 'RCV_USER_INFO',
  REQ_USER_INFO: 'REQ_USER_INFO',
  REQ_TOKEN: 'REQ_TOKEN',
  FETCH_ERROR: 'FETCH_ERROR'
};

const LANDING = 'http://localhost:5000/oAuth';
const HOME = 'http://localhost:5000/';

export const authenticate = (dispatch) => {
    const landing = LANDING;
    const login = process.env.REACT_APP_TD_LOGIN;
    const loc = `https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=${landing}&client_id=${login}`;
    window.location.assign(loc)
    //postToken(data => dispatch(rcvAccessToken(data)))
};

export const fetchToken = (dispatch, code) => {
    const login = process.env.REACT_APP_TD_LOGIN;
    let data = [];
    data.push('grant_type=authorization_code');
    data.push('access_type=offline');
    data.push('code=' + encodeURIComponent(code));
    data.push('client_id=' + encodeURIComponent(login));
    data.push('redirect_uri=' + encodeURIComponent(LANDING));
    data = data.join('&');
    dispatch({
      type: ActionType.REQ_TOKEN
    });
    fetch("https://api.tdameritrade.com/v1/oauth2/token",
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data
    }).then(rsp => rsp.json())
      .then(json => {
        if (json && json.access_token) {
          dispatch(rcvAccessToken(json))
        } else {
          dispatch({type: ActionType.FETCH_ERROR})
        }
      })
      .catch(error => {
          console.log(error);
          dispatch({type: ActionType.FETCH_ERROR});
      })

};

export const fetchUserInfo = (dispatch, access_token) => {
  fetch("https://api.tdameritrade.com/v1/userprincipals",
    {
      headers: { Authorization: "Bearer " + access_token }
    })
    .then(rsp => rsp.json())
    .then(json => {
      if (json && json.userId) {
        dispatch(rcvUserInfo(json))
      } else {
        dispatch({type: ActionType.FETCH_ERROR})
      }
    })
    .catch(dispatch({type: ActionType.FETCH_ERROR}))
};

export const rcvAccessToken = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    return {
        type: ActionType.RCV_ACCESS_TOKEN,
        accessToken: data
    }
};

export const rcvUserInfo = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
    return {
        type: ActionType.RCV_USER_INFO,
        userInfo: data
    }
};

export default ActionType;