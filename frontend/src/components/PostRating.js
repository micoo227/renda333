import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PostRating() {
	const [res, setRes] = useState({
		title: "",
		artist: "",
		rating: "",
	});
	const [submit, setSubmit] = useState(false);

	const [error, setError] = useState(false);

	useEffect(() => {}, []);

	const handleSubmit = () => {
		//check data
		console.log("Submit res form:", res);

		axios
			.post("http://127.0.0.1:8000/api/ratings", {
				username: "ilovematt",
				song: res.title,
				artist: res.artist,
				rating: 3,
			})
			.then(function (response) {
				console.log(response);
				setSubmit(true);
			})
			.catch(function (error) {
				setError(true);
				if (error.response) {
					console.log(error.response.data);
				} else if (error.request) {
					console.log(error.request.data);
				} else if (error.message) {
					console.log(error.message.data);
				}
			});
	};

	const handleTitleChange = (event) => {
		event.persist();
		setRes((res) => ({
			...res,
			title: event.target.value,
		}));
	};

	const handleArtistChange = (event) => {
		event.persist();
		setRes((res) => ({
			...res,
			artist: event.target.value,
		}));
	};

	const handleRatingChange = (event) => {
		event.persist();
		setRes((res) => ({
			...res,
			rating: event.target.value,
		}));
	};

	return (
		<div className="">
			<div className="text-3xl font-bold text-center text-white pt-20 pb-2">
				Create Rating
			</div>
			<div className="grid place-items-center">
				<section className="w-10/12 bg-slate-600 p-4">
					<div className="flex text-white text-lg font-semibold space-x-4 my-2">
						<div className="w-20 flex justify-end">Title</div>
						<input
							id="title"
							type="text"
							name="title"
							value={res.title}
							placeholder="enter song title"
							className="w-full px-1 placeholder:italic text-black"
							onChange={handleTitleChange}
						/>
					</div>

					<div className="flex text-white text-lg font-semibold space-x-4 my-2">
						<div className="w-20  flex justify-end">Artist</div>
						<input
							id="artist"
							type="text"
							name="artist"
							value={res.artist}
							placeholder="enter artist name"
							className="w-full px-1 placeholder:italic text-black"
							onChange={handleArtistChange}
						/>
					</div>

					<div className="flex text-lg font-semibold space-x-4">
						<div className="w-20 text-white flex justify-end">Rating</div>
						<input
							id="rating"
							type="number"
							min="1"
							max="10"
							name="rating"
							value={res.rating}
							placeholder="enter rating from 1-10"
							className="w-full px-1 placeholder:italic text-black"
							onChange={handleRatingChange}
						/>
					</div>

					<div className="flex justify-end py-3">
						<button
							onClick={handleSubmit}
							className="bg-yellow-300 px-3 py-2 font-semibold hover:bg-cyan-300 transition ease-in duration-200 text-lg"
						>
							POST
						</button>
					</div>
				</section>
				{submit && <div className="w-10/12 bg-green-300"> success</div>}
				{error && <div className="w-10/12 bg-red-300">Error </div>}
			</div>
		</div>
	);
}
