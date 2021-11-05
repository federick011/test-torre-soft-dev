import React, { useState, useEffect, createRef } from 'react';
//Styles
import './css/StyleMainBody.css'

//Components
import UserInfoComponent from '../UserInfoComponent';

export default function MainComponentBody()
{
    //Ref
    let TextSearchValue = createRef();//Ref to the input to find users
    //hooks
    const [userFound, setUserFound] = useState();//To get the Json from the function that bring it "GotUserApi()"
    const [infoUserShare, setInfoUserShare] = useState();//To share the info from the user to a component child

    //we get the user required from the API
    async function GotUserApi(userName)
    {
        if(userName !== "")
        {
            fetch('/api/bios/'+userName)
            .then(res => res.json())
            .then(json => setUserFound(json));
        }
        else
        {
            fetch('/api/bios/null')
            .then(res => res.json())
            .then(json => setUserFound(json));
        } 
    }

    //This function is called by our button
    function FuncToFindUser()
    {
        let StringUserName = TextSearchValue.current.value;
        GotUserApi(StringUserName);
        setInfoUserShare(ShowUserSkills(userFound));
    }

    useEffect(() => {
        let StringUserName = TextSearchValue.current.value;
        GotUserApi(StringUserName);
    }, [])

    //console.log("lol "+((userFound !== undefined) && JSON.stringify(userFound.strengths[0].name)).replace(/"/g, " "));
    return(
        <main>
            <section>
                <div className="main-inputs-header">
                    <input ref={TextSearchValue} id="my-input-edit" type="text" placeholder="Find User"/>
                    <button id="my-button" placeholder="Search" onClick={FuncToFindUser}>Search</button>
                </div>

                <UserInfoComponent props={[infoUserShare]} />
            </section>
        </main>
    );
}

//This Function Show the skills of the current user
function ShowUserSkills(userFound)
{
    let StringInfoUser =[];
    if(userFound !== undefined && userFound !== null)
    {
        if(userFound.strengths !== undefined)
        {
            userFound.strengths.map((item, index) =>{
                StringInfoUser[index] =( 
                    <div key={index} className="skills-values">
                        {JSON.stringify(item.name).replace(/"/g, " ")}
                    </div> 
                )
            })
        }
        else if(userFound.message === "Person not found!")
        {
            StringInfoUser[0]= "404";
        }
    }

    return(
        StringInfoUser
    );
}
