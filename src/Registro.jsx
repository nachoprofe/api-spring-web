import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api-spring-cw8c.onrender.com/countries');
                setCountries(response.data);
                setSelectedCountry(response.data[0].id);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    

    const handleSwitchMode = () => {
        navigate('/login')
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const url = 'https://api-spring-cw8c.onrender.com/users';

        try {
            const response = await axios.post(url, { email, password, countryId: parseInt(selectedCountry) });
            console.log(response.data);
            if(response.status === 201){
                alert('Registro exitoso');
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
            <h2>{'Registrarse'}</h2>
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
                <div>
                    <label>Seleccione un país:</label>
                    <select
                        value={selectedCountry}
                        className="auth-form-select"
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        required
                    >
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Registrarse'}
                </button>
            </form>
            <div className="toggle-button" onClick={handleSwitchMode}>
                {'¿Ya tienes una cuenta? Inicia sesión'}
            </div>
        </div>
    );
};

export default Registro;
