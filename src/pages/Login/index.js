import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Login = ({ setUser }) => {
	const [username, setUsername] = useState('');
    const navigate = useNavigate()

	const handleChange = (e) => {
		setUsername(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
        setUser(username)
        navigate('/pokemon/list')
	};

	return (
		<form className="mx-auto m-2 p-2 border " id="login-form">
			<div className="mb-3">
				<label htmlFor="exampleInputUser1" className="form-label">
					Username
				</label>
				<input
					type="text"
					className="form-control"
					id="exampleInputUser1"
					aria-describedby="userHelp"
					value={username}
					onChange={handleChange}
				/>
				<div id="userHelp" className="form-text">
					We'll never share your username with anyone else.
				</div>
			</div>
			<div className="mb-3">
				<label htmlFor="exampleInputPassword1" className="form-label">
					Password
				</label>
				<input
					type="password"
					className="form-control"
					id="exampleInputPassword1"
				/>
			</div>

			<button onClick={handleSubmit} type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export default Login;
