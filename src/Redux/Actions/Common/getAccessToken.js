import axios from 'axios';
import Cookies from 'js-cookie';

export const getAccessTokenCommon = async () => {
    const getAccessToken = Cookies.get('accessToken');
    const accessToken = JSON.parse(getAccessToken).token;
    const access_expires = JSON.parse(getAccessToken).expires_in;

    const now = new Date();
    let now_time = now.getTime();

    if (now_time - access_expires >= 0) {
        // console.log('Đã hết hạn')
        const getRefreshToken = Cookies.get('refreshToken');
        const refreshToken = JSON.parse(getRefreshToken).token;
        const refresh_expires = JSON.parse(getRefreshToken).expires_in;

        if (refresh_expires - now_time >= 0) {
            // console.log('call refreshToken')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }

            let inputData = {
                refreshToken
            }

            let { data } = await axios.post('http://localhost:8000/v1/eco/customer/refresh-token', inputData, config);

            if (data) {
                let access_data = {
                    token: data.accessToken.token,
                    expires_in: data.accessToken.expires_in
                }
                // console.log('access_data', access_data);
                const now = new Date();
                now.setTime(now.getTime() + 24 * 60 * 60 * 1000);

                const cookieNewAccessToken = `accessToken=${encodeURIComponent(JSON.stringify(access_data))}; expires=${now.toUTCString()}; path=/`;
                document.cookie = cookieNewAccessToken;

                return data.accessToken.token
            }

        }
    }
    // console.log('Chưa hết hạn')
    return accessToken
}