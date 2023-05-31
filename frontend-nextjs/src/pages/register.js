import { useState } from 'react';
import axios from 'axios'; // Import Axios

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/register', {
                username,
                password
            });

            if (response.status === 200) {
                console.log('Registration successful');
                setUsername('');
                setPassword('');
            } else {
                console.log('Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Benutzername:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Passwort:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Registrieren</button>
            </form>
        </div>
    );
};

export default Home;
