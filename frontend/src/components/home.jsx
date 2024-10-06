import React from "react";
import { Link } from "react-router-dom";
const Home=()=>
{
    return (
        <div className="flex flex-col justify-center items-center h-screen ">
            <h1 className="font-mono font-bold text-9xl">INFOSEEK</h1>
            <h2 className="text-4xl mt-2 text-center">Search Smarter,Not Harder!</h2>
            <Link to='/Search' className="bg-white p-4 rounded-full font-bold border mt-6">Get Started</Link>
        </div>
    )
}

export default Home;