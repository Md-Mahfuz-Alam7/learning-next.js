const SingleUserPostPage = async(props) => {

    const post = await props.params;
    // console.log(user);
    
    
    return <h1>Post Id : {post.postId}</h1>
}

export default SingleUserPostPage;