import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { API } from '_utils';


function Home() {
    const [notes, setNotes] = useState(null);
    useEffect(() => {

        API.getAllNotesAPI()
        .then(res => res.json())
        .then(x => {
            if (x){
                setNotes(x.notes_data)
            }
        })
        .catch((err) => {
            window.alert(`fail to get all notes - Error: ${err}`);
        });

    }, []);

    function deleteNote(note_id) {
        // set isDeleting flag to show spinner
        setNotes(notes.map(x => {
            if (x.note_id === note_id) { x.isDeleting = true; }
            return x;
        }));

        // delete note
        API.deleteNoteAPI({"note_id": note_id})
        .then(res => res.json())
        .then(result => {
            if (result.flag_info.flag === 143){
                window.alert(result.flag_info.message);
                setNotes(notes.filter(x => x.note_id !== note_id));
            }
        }).catch(err => {
            window.alert(`fail to get all notes - Error: ${err}`);
        })


    }

    return (
        <div>
            <h2>You're logged in with React & Facebook!!</h2>
            <p>Your notes:</p>
            <div className="md:w-3/12 md:flex md:justify-end">
                {/* <div className="w-1/12 border">{experiment.experiment_id}</div> */}
                
                <Link className="btn btn-sm btn-warning" to="/create">
                    Create new note
                </Link>
                
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Note Id</th>
                        <th>Note Name</th>
                        <th>Content</th>
                        <th>Last updated</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {notes && notes.length > 0 && notes.map(note =>
                        <tr key={note.note_id}>
                            <td>{note.note_id}</td>
                            <td>{note.note_name}</td>
                            <td>{note.content}</td>
                            <td>{note.last_updated}</td>
                            <td className="text-right" style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`edit/${note.note_id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteNote(note.note_id)} className="btn btn-sm btn-danger btn-delete-account" disabled={note.isDeleting}>
                                    {notes.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!notes &&
                        <tr>
                            <td colSpan="5" className="text-center">
                                No note found
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { Home };