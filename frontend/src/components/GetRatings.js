import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ExportComponent() {
	const [data, setData] = useState([]);
	const [counter, setCounter] = useState(1);

	useEffect(() => {
		axios
			.get("http://127.0.0.1:8000/api/ratings/")
			.then((response) => {
				console.log(response);
				console.log(response.data);
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<section className="py-20 text-white text-center text-lg ">
				<div className="text-3xl font-bold opacity-100">Your Ratings</div>
			</section>
			<section className=" grid place-items-center">
				<section className="w-10/12">
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
										className="border-y text-lg cursor-pointer bg-gray-100 text-black border-slate-700 font-sans group hover:bg-slate-500 hover:text-white transition ease-in duration-50"
									>
										<th className="p-1">
											<input placeholder={username} 
                                            className="text-black"
                                            value={username}/>
										</th>
										<th className="p-1">{song}</th>
										<th className="p-1">{artist}</th>
										<th className="p-1">{rating}</th>
									</tr>
								);
							})}
						</tbody>
					</table>
				</section>
			</section>
		</div>
	);
}
