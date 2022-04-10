import React, { useEffect,useState } from 'react';

import { accountService } from '_services';
import {API} from '_utils';

function Login({ history }) {
    // useEffect(() => {
    //     // redirect to home if already logged in
    //     let accountValue = accountService.accountValue;
    //     if (accountValue) {
    //         API.setToken(accountValue.access_token)
    //         history.push('/');
    //     }      
        

    // }, [history]);
    const [account, setAccount] = useState(null);
    useEffect(() => {
        accountService.account.subscribe(x => setAccount(x));
        if (account){
            API.setToken(account.access_token)
            history.push('/');
        }  
    }, [history,account]);
    

    return (
        <div className="col-md-6 offset-md-3 mt-5 text-center">
            <div className="card">
                <h4 className="card-header">NoteKeeper - Facebook Login</h4>
                <div className="card-body">
                    <button className="btn btn-facebook" onClick={accountService.login}>
                        <i className="fa fa-facebook mr-1"></i>
                        Login with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
}

export { Login };