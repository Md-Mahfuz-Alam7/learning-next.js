const SingleUserPage = async(props) => {

    const user = await props.params;
    // console.log(user);
    
    
    return <h1>Profile Name : {user.username}</h1>
}

export default SingleUserPage;



// for client component 
// even check the usersclient folder there I used the client component for the same work


// "use client"
// import { use } from "react";

// const SingleUserPage = (props) => {

//     const user = use(props.params);
//     // console.log(user);
    
    
//     return <h1>Profile Name : {user.username}</h1>
// }

// export default SingleUserPage;