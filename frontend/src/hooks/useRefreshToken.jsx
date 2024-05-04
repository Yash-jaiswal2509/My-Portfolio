import axios from 'axios'
import { useAuth } from "../lib/AuthProvider";

const useRefreshToken = () => {
    const { apiURL } = useAuth()
    
    const refresh = async () => {
        const response = await axios.post(`${apiURL}/auth/refresh-token`, {
            Headers: {
                Authorization: `Bearer `
            }
        }
        )
    };




    return (
        <div>useRefreshToken</div>
    )
}

export default useRefreshToken;