import React from "react";
import {Redirect} from "react-router-dom"

let params = new URLSearchParams(window.location.search);

const oAuthLanding = (props) => {
    if (!window.location.search || props.authUser.token)
        return <Redirect to={{pathname: "/"}}/>;

    if (props.fetchError) {
        return (
          <div className="alert alert-danger" role="alert">
            An error occured trying to get a token
          </div>
        )
    }
    const code = params.get("code");
    props.fetchToken(code);


    return (props.isFetching && <div className="container-fluid">
        <div className="row">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="ml-2">
            <span>Authenticating...</span>
            </div>
        </div>
        {/*<div className="row">*/}
            {/*<span>decodeded:</span>*/}
            {/*<div className="row">*/}
                {/*{decodeURI(params.get("code"))}*/}
            {/*</div>*/}
        {/*</div>*/}
    </div>)
};

export default oAuthLanding;