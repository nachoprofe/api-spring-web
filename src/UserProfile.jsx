import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://api-spring-cw8c.onrender.com/users/${userId}`);
                setUser(response.data);
            } catch (err) {
                setError("Error al cargar el perfil del usuario");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="user-profile">
            <h2>Perfil de Usuario</h2>
            <div className="user-info">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>País:</strong> {user.country ? user.country.name : 'N/A'}</p>
            </div>
            <button className="back-button" onClick={() => navigate('/home')}>
                Regresar a la Lista de Usuarios
            </button>
        </div>
    );
};

export default UserProfile;
