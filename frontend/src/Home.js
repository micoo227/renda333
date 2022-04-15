import React from "react";
import PostRating from "./components/PostRating";
import Ratings from "./components/Ratings";

const Home = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-slate-800">
			<PostRating />
			<Ratings />
		</div>
	);
};

export default Home;
