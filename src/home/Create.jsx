import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { API } from '_utils';
import { accountService } from '_services';

function CreateNote({ history }) {
    // functions to build form returned by useForm() hook
    const { register, handleSubmit, formState } = useForm();

    // pre-populate form with account details when component loads
    // const [account, setAccount] = useState(null);
    useEffect(() => {
        const account = accountService.accountValue;
        const isLoggedIn = account?.access_token;

        if (!isLoggedIn){
            history.push("/login");
        }
    },);

    // form submit handler
    function onSubmit(data) {
        let body = {
            "note_data": data
        }
        return API.createNoteAPI(body)
            .then((res) => res.json() )
            .then((result) => {
                console.log(result)
                if (result.flag_info.flag === 143){
                    window.alert(result.flag_info.message)
                    history.push('..')
                }
                
            })
            .catch(err => window.alert(`Can not create note(maybe note name was already existed) - Error: ${err}`));
    }

    return (
        <div>
            <h2>Create Note</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Note name</label>
                    <input name="note_name" type="text" ref={register} className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea name="content" type="text" ref={register}  className="form-control" required/>
                </div>
                <div className="form-group">
                    <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                        {formState.isSubmitting &&
                            <span className="spinner-border spinner-border-sm mr-1"></span>
                        }
                        Save
                    </button>
                    <Link to=".." className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { CreateNote };