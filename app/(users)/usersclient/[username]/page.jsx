"use client"

import { use } from "react";


const SingleUserClientPage = (props) => {

    const user = use(props.params);
    // console.log(user);
    
    
    return <h1>Profile Name : {user.username}</h1>
}

export default SingleUserClientPage;