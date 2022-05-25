import { Dialog, FormGroup, InputGroup } from '@blueprintjs/core'
import { hide } from '@blueprintjs/core/lib/esm/components/context-menu/contextMenu';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function DailogBox({ openmodel, closeModel, onSubmit, edit, onDataSubmit }) {

    const [addData, setAddData] = useState({ id: "", name: "", email: "" });

    useEffect(() => {
        if (edit) setAddData(edit)
    }, [edit])

    console.log("Dailog");
    return (
        <div>
            <Dialog
                icon="info-sign"
                isOpen={openmodel}
            >
                <div className="mainDiv">
                    <h1 className="Tital">Edit Your Data</h1>
                    <table className="Table">
                        <tr>
                            <td className="Td1">ID:-</td>
                            <td>
                                <input type="number" className="Input1" id="id" value={addData.id} onChange={(e) => setAddData({ ...addData, id: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td className="Td1">Name:-</td>
                            <td>
                                <input type="text" value={addData.name} onChange={(e) => setAddData({ ...addData, name: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td className="Td2">Email:-</td>
                            <td>
                                <input type="email" value={addData.email} onChange={(e) => setAddData({ ...addData, email: e.target.value })} />
                            </td>
                        </tr>
                        <tr className="allBtn">
                            <td><button type="button" className="bp4-button bp4-intent-danger cancle" onClick={() => closeModel(false) || `${toast.success("Cancle Successfully....!")}`}>Cancel</button></td>
                            <td><button type="button" className="bp4-button bp4-intent-success add" onClick={() => onSubmit(addData) || setAddData("") || `${toast.success("Data Add Successfully....!")}`}>Add</button></td>
                            <td ><button type="button" className="bp4-button bp4-intent-success edit" onClick={() => onDataSubmit(addData) || `${toast.success("Data Edit Successfully....!")}`}>Edit</button></td>
                        </tr>
                    </table>
                </div>
            </Dialog >
        </div>
    )
}
