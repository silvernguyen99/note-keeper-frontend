import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { API } from '_utils';

import { accountService } from '_services';

function EditNote({ history, match }) {
    const acc = accountService.accountValue;
    const isLoggedIn = acc?.access_token;

    if (!isLoggedIn){
        history.push('/login')
    }
    const { id } = match.params;

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, setValue, formState } = useForm();

    // pre-populate form with account details when component loads
    const [note, setNote] = useState(null);
    useEffect(() => {
        API.getNoteAPI({"note_id":parseInt(id)})
        .then(res => res.json())
        .then(x => {
            if (x.flag_info.flag === 143){
                let noteData = x.note_data
                setNote(noteData);
                const fields = ['note_name', 'content'];
                fields.forEach(field => setValue(field, noteData[field]));
            }else{
                window.alert(x.flag_info.message);
                history.push('..')
            }
        })
        // accountService.getById(id).then(account => {
        //     setAccount(account);
        //     const fields = ['name', 'extraInfo'];
        //     fields.forEach(field => setValue(field, account[field]));
        // });
    }, [id, setValue,history]);

    // form submit handler
    function onSubmit(data) {
        let body = {
            "note_data":{
                "note_id": parseInt(id),
                // "note_id": id,
                "note_name": data.note_name,
                "content": data.content,
            }
        }
        return API.editNoteAPI(body)
            // .then(() => history.push('..'))
            .then(res => res.json())
            .then(result => {
                if (result.flag_info.flag === 143){
                    window.alert(result.flag_info.message);
                    history.push('..')
                }
            })
            .catch(err => {
                window.alert(`fail to edit note - Error: ${err}`);
            });
    }

    return (
        <div>
            <h2>Edit Note</h2>
            {note &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Note Id</label>
                        <div>{note.note_id}</div>
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input name="note_name" type="text" ref={register} className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <input name="content" type="text" ref={register} className="form-control" required/>
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
            }
            {!note &&
                <div className="text-center p-3">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
        </div>
    );
}

export { EditNote };