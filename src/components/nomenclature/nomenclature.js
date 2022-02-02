import { React, useState, useEffect } from 'react';
import axios from 'axios';
import './nomenclature.css'

export default function Nomenclature() {

    const [nomenclatures, setNomenclatures] = useState([]);

    useEffect(() => {
        axios.get("/nomenclature").then(response => setNomenclatures(response.data))
    }, [])

    return <div className='workItem'>
        <div className='textTitle'>Номенклатуры</div>
        <div>
            {nomenclatures.map((item, index) => {
                return (<div key={"nomenclature_"+index} className="nomenclatureItemBlock">
                    <div className='nomenclatureItemNumber inputLabel'>{index + 1})</div>
                    <div>{item.Name}</div>
                </div>)
            })}
        </div>
    </div>;
}
