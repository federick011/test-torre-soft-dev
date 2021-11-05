import React from "react";

export default function UserInfoComponent({props})
{
    return(
        <React.Fragment>
            <div className="content-profile-itself">

                {props[1]}
                {props[2]}
                <hr/>
                {props[0]}
                
            </div>
        </React.Fragment>
    );
}