import React, { useState, useEffect } from "react";
import axios from "axios";

//we do a get call here to get all the data
export default function Rating() {
	const [data, setData] = useState([]);
	const [songTable, setSongTable] = useState({});

	useEffect(() => {
		//axios get call
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
	}, []);

	const bySong = (data) => {
		/*
			{
				"song" : { username, artist, average rating}
			}
		*/
		var songMap = {};

		for (let idx = 0; idx < data.length; idx++) {
			let song = data[idx].song;
			console.log("song", song);
			if (songMap.hasOwnProperty(song)) {
				songMap[song].ratings.push(data[idx].rating);
				songMap[song].usernames.push(data[idx].username);
			} else {
				songMap[song] = {
					artist: data[idx].artist,
					ratings: [data[idx].rating],
					usernames: [data[idx].username],
				};
			}
		}
		setSongTable(songMap);
	};

	return (
		<div>
			<table className="table table-compact w-full">
				<thead>
					<tr className=" text-white text-md bg-slate-700">
						<th className="py-2 ">Username</th>
						<th className="cursor-pointer  py-2  hover:opacity-80 transition ease-in duration-50 ">
							Song
						</th>
						<th className="cursor-pointer  py-2 flex items-end justify-center space-x-2 hover:opacity-80 transition ease-in duration-50 ">
							Artist
						</th>
						<th className="cursor-pointer py-2  hover:opacity-80 transition ease-in duration-50 ">
							Rating
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map(({ username, song, artist, rating }) => {
						return (
							<tr
								key={song}
								className="border-y text-md cursor-pointer bg-gray-100 text-black border-slate-700 group hover:bg-slate-500 hover:text-white transition ease-in duration-50"
							>
								<th className="p-1 font-normal">{username}</th>
								<th className="p-1 font-normal">{song}</th>
								<th className="p-1 font-normal">{artist}</th>
								<th className="p-1 font-normal">{rating}</th>
							</tr>
						);
					})}
				</tbody>
			</table>

			<table className="table table-compact w-full">
				<thead>
					<tr className=" text-white text-md bg-slate-700">
						<th className="py-2 ">Song</th>
						<th className="cursor-pointer py-2  hover:opacity-80 transition ease-in duration-50 ">
							Artist
						</th>
						<th className="cursor-pointer  py-2  hover:opacity-80 transition ease-in duration-50 ">
							Average Rating
						</th>
						<th className="cursor-pointer  py-2 flex items-end justify-center space-x-2 hover:opacity-80 transition ease-in duration-50 ">
							Raters
						</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(songTable).map((item) => {
						return (
							<tr
								key={songTable[item].song}
								className="border-y text-md cursor-pointer bg-gray-100 text-black border-slate-700 group hover:bg-slate-500 hover:text-white transition ease-in duration-50"
							>
								<th className="p-1">{item}</th>
								<th className="p-1">{songTable[item].artist}</th>
								<th className="p-1">
									{Math.floor(
										songTable[item].ratings.reduce((a, b) => a + b, 0) /
											songTable[item].ratings.length
									)}
								</th>
								<th>{songTable[item].ratings.length}</th>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
