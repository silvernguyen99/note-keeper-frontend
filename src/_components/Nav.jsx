import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { accountService } from '_services';

function Nav() {
    const [account, setAccount] = useState(null);
    useEffect(() => {
        accountService.account.subscribe(x => setAccount(x));
    }, []);

    // only show nav when logged in
    if (!account) return null;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink exact to="/" className="navbar-brand nav-item nav-link">Note Keeper</NavLink>

            <div className="navbar">
                <button className="btn btn-link nav-item nav-link" onClick={accountService.logout}>Logout</button>
                <span className="navbar-text ">
                    {account.user_name}
                </span>
                <span className="navbar-text ">
                    {account.access_token}
                </span>
            </div>
            
        </nav>
    );
}

export { Nav }; 