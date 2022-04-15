import React from 'react'
import PostRating from "./components/PostRating";
import GetRating from "./components/GetRatings";
import LoginButton from "./components/LoginButton";
import RegisterButton from "./components/RegisterButton";

const Home = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-slate-800">
			<RegisterButton />
            <LoginButton />
            <PostRating />
            <GetRating />
        </div>
  )
}

export default Home