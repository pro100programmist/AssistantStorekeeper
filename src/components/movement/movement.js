import axios from 'axios';
import { React, useState, useEffect } from 'react';
import Addmovement from './addmovement';
import "./movement.css"

export default function Movement() {

    const [movements, setMovements] = useState([]);

    useEffect(() => (axios.get("/movements").then(response => response.data).then(data => setMovements(data))), [])

    return <div className='workItem'>
        <div className='textTitle'>Перемещения</div>
        <Addmovement movements={movements} setMovements={setMovements}/>
        <div>
            {
                movements.map((item, index) => {
                    return (
                        <div key={"movement_" + index} className='movementItemsBlock'>
                            <div className='inputLabel movementItems'>{movements.length - index})</div>
                            <div className='movementItems'>
                                <div className='inputLabel'>Кто переместил</div>
                                <div>{item.WhoMovement}</div>
                            </div>
                            <div className='movementItems'>
                                <div className='inputLabel'>Когда</div>
                                <div>{item.DateTime}</div>
                            </div>
                            <div className='movementItems'>
                                <div className='inputLabel'>Откуда</div>
                                <div>{item.WarehouseStart}</div>
                            </div>
                            <div className='movementItems'>
                                <div className='inputLabel'>Куда</div>
                                <div>{item.WarehouseEnd}</div>
                            </div>
                            <div>
                                <div className='inputLabel'>Позиции:</div>
                                {
                                    item.Items.map((mitem, mindex)=>{
                                        return(
                                            <div key={"mindex_"+mindex} className='addMovementRow'>
                                                <div className='movementItemsL'>{mitem.Name}</div>
                                                <div>({mitem.Count})</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    )
                })
            }
        </div>
    </div>;
}
