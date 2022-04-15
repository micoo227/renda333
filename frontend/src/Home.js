import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
	const [data, setData] = useState([]);
	const [songTable, setSongTable] = useState({});
	const [submit, setSubmit] = useState(false);
	const [error, setError] = useState(false);
	const location = useLocation();
	const [res, setRes] = useState({
		title: "",
		artist: "",
		rating: "",
	});

	useEffect(() => {
		//axios get call
		showData();
	}, []);

	const showData = () => {
		axios
			.get("http://127.0.0.1:8000/api/ratings")
			.then((response) => {
				console.log(response);

				bySong(response.data);
				console.log(response.data);
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const bySong = (data) => {
		/*
			{
				"song" : { username, artist, average rating}
			}
		*/
		var songMap = {};

		for (let idx = 0; idx < data.length; idx++) {
			let song = data[idx].song;
			if (songMap.hasOwnProperty(song)) {
				songMap[song].ratings.push(data[idx].rating);
				songMap[song].average =
					Math.round(
						(songMap[song].ratings.reduce((a, b) => a + b, 0) * 100) /
							(songMap[song].ratings.length * 1.0)
					) / 100;

				songMap[song].usernames.push(data[idx].username);
			} else {
				songMap[song] = {
					artist: data[idx].artist,
					ratings: [data[idx].rating],
					average: [data[idx].rating],
					usernames: [data[idx].username],
				};
			}
		}

		setSongTable(songMap);
	};

	const deleteRow = (id, e) => {
		axios.delete("http://127.0.0.1:8000/api/ratings/" + id).then((response) => {
			showData();
		});
	};

	const handleSubmit = () => {
		//check data
		console.log("Submit res form:", res);

		axios
			.post("http://127.0.0.1:8000/api/ratings", {
				username: String(location.state.username),
				song: res.title,
				artist: res.artist,
				rating: Number(res.rating),
			})
			.then(function (response) {
				console.log(response);
				showData();
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
		<div className="min-h-screen bg-slate-800">
			<div className="flex justify-center ">
				<section className="w-10/12 flex justify-end text-white font-semibold italic py-3 text-xl">
					{location.state.username}
				</section>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 pt-10">
				<div className="">
					<div className="text-3xl font-bold text-center text-white pb-2">
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

				<div className="">
					<div className="text-3xl font-bold text-center text-white lg:pt-0 pt-20 pb-2">
						All Ratings
					</div>

					<section className="flex justify-center">
						<table className="w-10/12 table table-compact ">
							<thead>
								<tr className=" text-white text-md bg-slate-700">
									<th className="py-2 ">Username</th>
									<th className="py-2  hover:opacity-80 transition ease-in duration-50 ">
										Song
									</th>
									<th className="py-2 flex items-end justify-center space-x-2 hover:opacity-80 transition ease-in duration-50 ">
										Artist
									</th>
									<th className="py-2  hover:opacity-80 transition ease-in duration-50 ">
										Rating
									</th>
									<th className="py-2  hover:opacity-80 transition ease-in duration-50 "></th>
								</tr>
							</thead>
							<tbody>
								{data.map(({ id, username, song, artist, rating }) => {
									return (
										<tr
											key={song}
											className="border-y text-md cursor-pointer bg-gray-100 text-black border-slate-700 group hover:bg-slate-500 hover:text-white transition ease-in duration-50"
										>
											<th className="p-1 font-normal">{username}</th>
											<th className="p-1 font-normal">{song}</th>
											<th className="p-1 font-normal">{artist}</th>
											<th className="p-1 font-normal">{rating}</th>
											<th className="p-1">
												<button
													className="py-2 px-2 bg-red-400 text-sm font-semibold"
													onClick={(e) => deleteRow(id, e)}
												>
                          
													DELETE
												</button>
											</th>
										</tr>
									);
								})}
							</tbody>
						</table>
					</section>

					<div className="text-3xl font-bold text-center text-white pt-20 pb-2">
						Song Ratings
					</div>
					<div className="flex justify-center">
						<table className="w-10/12 table table-compact">
							<thead>
								<tr className=" text-white text-md bg-slate-700">
									<th className="py-2 ">Song</th>
									<th className="py-2 ">Artist</th>
									<th className="py-2">Average Rating</th>
									<th className="py-2">Raters</th>
								</tr>
							</thead>
							<tbody>
								{Object.keys(songTable).map((item) => {
									return (
										<tr
											key={songTable[item].song}
											className="border-y text-md cursor-pointer bg-gray-100 text-black border-slate-700 group hover:bg-slate-500 hover:text-white transition ease-in duration-50"
										>
											<th className="p-1 font-normal">{item}</th>
											<th className="p-1 font-normal">
												{songTable[item].artist}
											</th>
											<th className="p-1 font-normal">
												{songTable[item].average}
											</th>
											<th>{songTable[item].ratings.length}</th>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
