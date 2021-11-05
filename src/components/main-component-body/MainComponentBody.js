import React, { useState, useEffect, createRef } from 'react';
//Styles
import './css/StyleMainBody.css'

//Components
import UserInfoComponent from './UserInfoComponent';

export default function MainComponentBody()
{
    //Ref
    let TextSearchValue = createRef();//Ref to the input to find users
    //hooks
    const [userFound, setUserFound] = useState();//To get the Json from the function that bring it "GotUserApi()"

    //we get the user required from the API
    async function GotUserApi(userName)
    {
        if(userName !== "")
        {
            fetch('/api/bios/'+userName)
            .then(res => res.json())
            .then(json => setUserFound(json));
        }
        else//the default profile that appears
        {
            fetch('/api/bios/torrenegra')
            .then(res => res.json())
            .then(json => setUserFound(json));
        } 
    }

    //This function is called by our button
    function FuncToFindUser()
    {
        GotUserApi(TextSearchValue.current.value);
    }

    useEffect(() => {
        GotUserApi(TextSearchValue.current.value);
    }, [])

    //console.log("lol "+((userFound !== undefined) && JSON.stringify(userFound.strengths[0].name)).replace(/"/g, " "));
    return(
        <main>
            <section>
                <div className="main-inputs-header">
                    <h3>Enter the user Id to start the search</h3>
                    <input ref={TextSearchValue} id="my-input-edit" type="text" placeholder="Find User"/>
                    <button id="my-button" placeholder="Search" onClick={FuncToFindUser}>Search</button>
                </div>

                <UserInfoComponent props={[ShowUserSkills(userFound), 
                                            ShowUserAvatar(userFound),
                                            ShowUserName(userFound)]} />
            </section>
        </main>
    );
}

//This Function Show the skills of the current user
function ShowUserSkills(userFound)
{
    //To organize the skills levels
    const MapSkills = (indexItem, StringValueItem) =>{
        let StringInfoUser =[,];
        userFound.strengths.map((item, index) =>{
            if(item.proficiency === StringValueItem)
            {
                StringInfoUser[indexItem, index] =( 
                    <div key={index} className="skills-values">
                        {item.name}
                    </div> 
                )
            }
        })

        return (StringInfoUser);
    }

    let skillLevels;
    if(userFound !== undefined && userFound !== null)
    {
        if(userFound.strengths !== undefined)
        {
            skillLevels = (
                <div className="levels-skills-div">

                    <h4>Master / Influencer</h4>
                    {MapSkills(4, "master")}
                    <h4>Expert</h4>
                    {MapSkills(3, "expert")}
                    <h4>Proficient</h4>
                    {MapSkills(2, "proficient")}
                    <h4>Novice</h4>
                    {MapSkills(1, "novice")}
                    <h4>No experience, interested</h4>
                    {MapSkills(0, "no-experience-interested")}
                    
                </div>
            );
        }
    }

    return(
        skillLevels
    );
}

//To get the url of the Avatar
function ShowUserAvatar(userFound)
{
    let UserAvatarUrl="";
    
    if(userFound !== undefined && userFound !== null)
    {
        try{ 
            UserAvatarUrl = (
                <div className="avatar-div">
                    <img src={userFound.person.picture}/>
                </div>
             );
        } catch(e) { 
            console.error(e); 
            
            if(userFound.message === "Person not found!")
            {
                UserAvatarUrl = (
                    <div className="avatar-div">
                        <img src="https://f.hubspotusercontent30.net/hub/5943984/hubfs/New%20Icon-1.png?width=108&height=108"/>
                    </div>
                );
            }
        }
    }

    return(
        UserAvatarUrl
    );
}

function ShowUserName(userFound)
{
    let UserNameId;
    if(userFound !== undefined && userFound !== null)
    {
        try{ 
            UserNameId = (
                <div className="user-names">
                   <h3> Name: {userFound.person.name} 
                   <p/>
                    User Id: {userFound.person.publicId}</h3>
                </div>
             );
        } catch(e) {console.error(e);}
    }

    return(
        UserNameId
    );

}
