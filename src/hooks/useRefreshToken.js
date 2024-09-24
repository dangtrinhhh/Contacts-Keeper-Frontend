import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        console.log("Refresh token");

        const response = await axios.get(
            '/api/users/refresh-token',
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );

        const newAccessToken = response.data.accessToken;
        setAuth((prev) => ({ ...prev, accessToken: newAccessToken, auth }));

        return newAccessToken;
    }

    return refresh;
};

export default useRefreshToken;
