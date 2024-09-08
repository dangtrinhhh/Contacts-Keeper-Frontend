import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
    const controller = new AbortController();

    const refresh = async () => {
        console.log("Refresh token");

        const response = await axios.get(
            '/api/users/refresh-token',
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
                signal: controller.signal,
            }
        );
        console.log("🚀 ~ response:", response)
        const newAccessToken = response.data.accessToken;
        setAuth((prev) => ({ ...prev, accessToken: newAccessToken }));

        return newAccessToken;
    }

    return refresh;
    // refresh();

    // return () => {
    //     refresh();
    //     controller.abort();
    // };
};

export default useRefreshToken;
