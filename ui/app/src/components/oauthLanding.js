import React from "react";
import {Redirect} from "react-router-dom"

let params = new URLSearchParams(window.location.search);

const oAuthLanding = (props) => {
    if (!window.location.search || props.authUser.token)
        return <Redirect to={{pathname: "/"}}/>;

    // implement a login
    const code = params.get("code");
    props.fetchToken(code);


    return (<div className="container-fluid">
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