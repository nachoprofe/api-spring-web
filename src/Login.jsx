import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSwitchMode = () => {
        navigate('/registro')
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const url = 'https://api-spring-cw8c.onrender.com/users/login';

        try {
            const response = await axios.post(url, { email, password });
            console.log(response.data);
            if(response.status === 200){
                alert('Inicio de sesión exitoso');
                navigate('/home');
            } else {
                alert("Credenciales incorrectas");
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error en la autenticación');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
            </form>
            <div className="toggle-button" onClick={handleSwitchMode}>
                {'¿No tienes una cuenta? Regístrate'}
            </div>
        </div>
    );
};

export default Login;
