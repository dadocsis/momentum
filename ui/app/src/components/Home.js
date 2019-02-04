"use strict";

import React from 'react';

export const Home = (props) => {
  return props.authUser.token &&
    <div>
        <div className="jumbotron">
            <div>
                <h1>Welcome to Momentum app pp51dodo</h1>
                <h3>User Info to come....</h3>
                <p>

                </p>
            </div>
        </div>
    </div> ||
    <div>
    <button
      bsStyle="success"
      bsSize="large"
      href="#home"
      target="_blank"
      onClick={() => props.authenticate()}
    >
        Login
    </button>
    </div>
};

export default Home;
