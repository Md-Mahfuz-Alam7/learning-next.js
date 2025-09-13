"use client";
import { useState, useEffect, use } from "react";
import {Counter} from "./Counter";

const URL = "https://jsonplaceholder.typicode.com/posts";

const clientpage = () => {

    const [postdata, setPostdata] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(URL);
            const data = await response.json();

            setPostdata(data);
            return data;
        };

        fetchData();
    }, []);

    return (
        <>
            <h1 className="text-2xl text-blue-300">Client Page</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => alert("button Clicked")}>Click Me</button>

            <Counter />


            <ul className="text-white grid grid-cols-3 gap-5" >
                {postdata.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </>
    )
}

export default clientpage