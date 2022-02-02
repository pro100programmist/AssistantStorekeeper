import axios from 'axios';
import { React, useState, useEffect } from 'react'
import './warehouse.css'
import { useHistory } from 'react-router-dom'

export default function Warehouse() {

    const [warehouses, setWarehouses] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get("/warehouses").then(response => setWarehouses(response.data));
    }, [])

    return <div className='workItem'>
        <div className='textTitle'>Склады</div>
        <div>
            {warehouses.map((item, index) => {
                return (
                    <div onClick={() => { history.push("/warehouse/" + item.IdWarehouses) }} key={"warehouse_" + index} className='warehouseItemBlock'>
                        <div className='warehouseItemNumber inputLabel'>{index + 1})</div>
                        <div>{item.Name}</div>
                    </div>)
            })}
        </div>
    </div>;
}
