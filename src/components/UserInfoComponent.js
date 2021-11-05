import React from "react";

export default function UserInfoComponent({props})
{
    return(
        <React.Fragment>
            <div className="content-skills-itself">
                {props}
            </div>
            
        </React.Fragment>
    );
}