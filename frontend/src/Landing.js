import { Link } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import RegisterButton from "./components/RegisterButton";

export default function Landing() {
	return (
		<div className="min-h-screen bg-slate-800 grid place-items-center">
			<div className="grid grid-cols-2 w-10/12 text-white font-semibold text-3xl">
				<div className="text-center">
					<button className="bg-slate-500 px-3 py-2">
						<Link to="/login">Log In </Link>
					</button>
				</div>
				<div className="text-center">
					<button className="bg-slate-500 px-3 py-2">
						<Link to="/signup">Create Account</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
