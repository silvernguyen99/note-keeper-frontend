import { BehaviorSubject } from 'rxjs';

import { history } from '_helpers';
import {API} from '_utils';

const accountSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('note-keeper-user')));

export const accountService = {
    login,
    apiAuthenticate,
    logout,
    account: accountSubject.asObservable(),
    get accountValue () { 
        let acc = accountSubject.value;
        return acc; 
    }
};

async function login() {
    // login with facebook then authenticate with the API to get a access token
    const { authResponse } = await new Promise(window.FB.login);
    if (!authResponse) return;

    await apiAuthenticate(authResponse.accessToken);
    // await apiAuthenticate("EAAKkqHqwdjEBAKgGOsmDLWoasI9ZBHcDpjTf4z17OTmEJzEQX5N2TW8T98as0gJDLEdbAwPbxsK3WCCPCp83jgZAqlcZA3IKv82MZBQDAuPPCISofgSrZAHGvMqNdkHSo9I2L75BUhqZCTW0CV5E3xZCxnNyZADFFIlk2iDdgxw1GOfL5TI1xnePMPmlYRKXssFPh9Fh1AxinTLnLZCEfFIdc"); 
    

    // get return url from location state or default to home page
    const { from } = history.location.state || { from: { pathname: "/" } };
    history.push(from);
}

async function apiAuthenticate(accessToken) {
    // authenticate with the api using a facebook access token,
    // on success the api returns an account object with a auth token
    API.loginUsingSocialAccessToken({ 
        type: "facebook", 
        social_token: accessToken 
    })
    .then((res) => res.json())
    .then((result) => {
        if (result.flag_info.flag === 143){
            let account = result.account;
            // let account = {
            //     "access_token": "ba5174ea9caf699b3955306f2b8550fa63b3450cf60a11f62c97",
            //     "user_name" : "vo van bao ngoc"
            // }
            accountSubject.next(account);
            API.setToken(account.access_token)
            localStorage.setItem('note-keeper-user', JSON.stringify(account));
            return result;
        }else{
            window.alert(result.flag_info.message);
        }
    })
    .catch(error => {
        window.alert(`fail to login with social account - Error: ${error}`);
        return;
    })
}

function logout() {
    // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
    API.logoutAPI()
    .then(res => res.json())
    .then(result => {
        if (result.flag_info.flag === 143){
            window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout());
            localStorage.removeItem('note-keeper-user');
            accountSubject.next(null);
            history.push('/login');
        }
    })
    
}
