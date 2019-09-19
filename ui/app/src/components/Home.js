"use strict";

import React from 'react';

export const Home = (props) => {
  if (props.authUser.token && !props.authUser.userInfo) {
    props.fetchUserInfo(props.authUser.token.access_token)
  };

  if (props.isFetching) {
    return <div className="row">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="ml-2">
            <span>Authenticating...</span>
            </div>
        </div>
  }
  if (props.authUser.userInfo) {
    const user = props.authUser.userInfo;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="jumbotron text-center">
              <h1>Welcome to Momentum app {user.userId}</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
                Field Name:
          </div>
          <div className="col">
                Value:
          </div>
        </div>
        <div className="row">
          <div className="col">
                userId
          </div>
          <div className="col">
            {user.userId}
          </div>
        </div>
      </div>
    )
  }
    return <div>
      <button onClick={() => props.authenticate()} >
        Login
      </button>
    </div>

};

export default Home;
