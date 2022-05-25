import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allAction } from '../Services/index'
import { Cell, Column, Table2 } from "@blueprintjs/table";
import { ToastContainer, toast } from 'react-toastify';
import * as apiDataActions from '../Services/Actions/actions'
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/table/lib/css/table.css";
import DailogBox from './DailogBox';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const [openmodel, SetModel] = useState(false);
    const [edit, setEdit] = useState({ id: "", name: "", email: "" })

    const column = [
        { field: "id", headerName: "UserID", width: 100 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "email", headerName: "Email", width: 500 },
        { field: "Update", headerName: "Update", with: 100 },
        { field: "Delete", headerName: "Delete", with: 100 }
    ];

    const { userData, loading, error, message } = useSelector((state) => state.Data);
    console.log("userData", userData.data);
    const dispatch = useDispatch();
    const { fatchData, deleteData, addData, updateData } = bindActionCreators(apiDataActions, dispatch);
    useEffect(() => {
        fatchData();
    }, [])

    const handleDelete = (id) => {
        console.log("id", id);
        deleteData(id);
    }
    const onDataSubmit = (user) => {
        SetModel(false)
        updateData(user);
    }

    const onSubmit = (form) => {
        SetModel(false);
        addData(form);
    }

    useEffect(() => {
        // toast.promise(fatchData, {
        //     success: 'Data Is Fatched',
        //     error: message
        // })
    }, [loading])

    const renderCell = (key) => (rowIndex) => {
        if (key == "id" || key == "name" || key == "email")
            return <Cell key={rowIndex}>{userData.data[rowIndex][key]}</Cell>
        if (key == "Update")
            return <button onClick={() => setEdit(userData.data[rowIndex]) || SetModel(true)}> Update</button >
        if (key == "Delete")
            return <button onClick={() => handleDelete(userData.data[rowIndex].id)}>Delete</button>

    }
    return (
        <div>
            {loading ? <div>Loading</div> : ""}
            {error ? <div>error {message}</div> : ""}

            <div>
                <button onClick={() => SetModel(true)}>ADD</button>
            </div>
            <Table2 columnWidths={column.map(({ width }) => width)} numRows={userData.data.length}>
                {column.map(({ field, headerName }, i) => <Column key={i} name={headerName} cellRenderer={renderCell(field)} className="column" />)}
            </Table2>
            <DailogBox openmodel={openmodel} edit={edit} onDataSubmit={onDataSubmit} onSubmit={onSubmit} closeModel={() => SetModel(false)} />
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div >

    )
}
