const serverpage = async () => {
    const URL = "https://jsonplaceholder.typicode.com/posts"

    const response = await fetch(URL);
    const data = await response.json();
    return (
        <>
            <h1 className="text-2xl text-white">server page</h1>

               <ul className="text-white grid grid-cols-3 gap-5" >
                {data.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </>
    )
}

export default serverpage
