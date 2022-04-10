import { accountService } from '_services';
import { API } from '_utils';

export function jwtInterceptor() {
    const account = accountService.accountValue;
    const isLoggedIn = account?.access_token;

    if (isLoggedIn){
        API.setToken(account.access_token);
    }
    return
}