import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function WarehouseDetails() {

    const [remains, setRemains] = useState({ WarehouseName: "", Items: [] })
    const [startD, setStartD] = useState()
    const [endD, setEndD] = useState()
    const { whid } = useParams();

    useEffect(() => { axios.post("/remains", { IdWarehouses: parseInt(whid) }).then(response => response.data).then(data => setRemains(data)) }, [])

    const filter = () =>{
        axios.post("/remains", { IdWarehouses: parseInt(whid), DateTimeStart:startD, DateTimeEnd: endD }).then(response => response.data).then(data => setRemains(data))
    }
    
    return <div className='workItem'>
        <div className='textTitle'>Остатки на складе:</div>
        <div id='RemainsFilterBlock'>
            <div className='remainsFilterItemBlock'>
                <div className='inputLabel'>Начало период</div>
                <input value={startD} onChange={e=>setStartD(e.target.value)} className='inputCustom' type="datetime-local" />
            </div>
            <div className='remainsFilterItemBlock'>
                <div className='inputLabel'>Конец период</div>
                <input value={endD} onChange={e=>setEndD(e.target.value)} className='inputCustom' type="datetime-local" />
            </div>
            <div id='FilterButtonBlock'>
            <div onClick={()=>filter()} id='FilterButton'>Показать</div>
            </div>
        </div>
        <div className='textTitle'>{remains.WarehouseName}</div>
        <div>
            {
                remains.Items.map((item, index) => {
                    return (<div className='remainsItemBlock' key={"remains_" + index}>
                        <div className='remainsItem inputLabel'>
                            {index + 1})
                        </div>
                        <div className='remainsItem'>
                            <div className='inputLabel'>Наименование:</div>
                            <div className='remainsText'>{item.Name}</div>
                        </div>
                        <div className='remainsItem'>
                            <div className='inputLabel'>Кол-во:</div>
                            <div className='remainsText'>{item.Count}</div>
                        </div>
                    </div>)
                })
            }
        </div>
    </div>;
}
