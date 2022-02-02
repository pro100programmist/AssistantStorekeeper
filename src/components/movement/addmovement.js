import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'

export default function Addmovement({ movements, setMovements }) {

    const [movementOptions, setMovementOptions] = useState();

    const [addItemsNomenclature, setAddItemsNomenclature] = useState(0);
    const [addItemsCount, setAddItemsCount] = useState(1);
    const [buttonHidden, setButtonHidden] = useState(false);
    const [validAdd, setValidAdd] = useState(false);

    const [addMovement, setAddMovement] = useState({ start: 0, end: 0, items: [] });

    useEffect(() => (
        axios.get("/movementsoptions").then(response => response.data).then(data => setMovementOptions(data))
    ), [])

    useEffect(() => (
        addMovement.items.find(x => x.nomenclatureId === addItemsNomenclature) === undefined
            ? setButtonHidden(false)
            : setButtonHidden(true)
    ), [addItemsNomenclature])

    const addItems = () => {
        addMovement.items.push({ nomenclatureId: parseInt(addItemsNomenclature), nomenclature: movementOptions.Nomenclature.find(x => x.Id === parseInt(addItemsNomenclature)).Name, count: addItemsCount });
        setAddMovement({ ...addMovement, items: addMovement.items });
        setAddItemsNomenclature(0);
        setAddItemsCount(1);
    }

    const removeItems = (value) => {
        addMovement.items.splice(addMovement.items.findIndex(x => x.nomenclatureId === value), 1);
        setAddMovement({ ...addMovement, items: addMovement.items });
    }

    const createMovement = () => {
        if (addMovement.end === 0 || addMovement.items.length === 0) { setValidAdd(true); return; }
        axios.post("/addmovement", addMovement).then(response => { movements.splice(0, 0, response.data); setMovements([...movements]); setAddMovement({ start: 0, end: 0, items: [] })})
    }

    return <div id='Addmovement'>
        <div className={'validText' + (validAdd ? "" : " hidden")}>Для перемещения требуется выбрать склад назначения и добавить хотя бы одно номенклатуру</div>
        <div className='addMovementRow'>
            <div className='addMovementItemBlock'>
                <div className='inputLabel'>Откуда</div>
                <select className='inputCustom movementInput' onChange={e => setAddMovement({ ...addMovement, start: parseInt(e.target.value) })} value={addMovement.start}>
                    <option value={0}>Из вне</option>
                    {
                        movementOptions && movementOptions.Warehouses ?
                            movementOptions.Warehouses.map(item => {
                                return (
                                    <option key={"whp_" + item.Id} value={item.Id}>{item.Name}</option>)
                            })
                            : null
                    }
                </select>
            </div>
            <div className='addMovementItemBlock'>
                <div className='inputLabel'>Куда</div>
                <select className='inputCustom movementInput' onChange={e => { setAddMovement({ ...addMovement, end: parseInt(e.target.value) }); setValidAdd(false); }} value={addMovement.end}>
                    <option value={0} hidden>-</option>
                    {
                        movementOptions && movementOptions.Warehouses ?
                            movementOptions.Warehouses.map(item => {
                                return (
                                    <option key={"whs_" + item.Id} value={item.Id}>{item.Name}</option>
                                )
                            })
                            : null
                    }
                </select>
            </div>
        </div>
        <div className='addMovementRow'>
            <div className='addMovementItemBlock'>
                <div className='inputLabel'>Номенклатура</div>
                <select className='inputCustom movementInput' onChange={e => setAddItemsNomenclature(e.target.value)} value={addItemsNomenclature}>
                    <option value={0} hidden>-</option>
                    {
                        movementOptions && movementOptions.Nomenclature ?
                            movementOptions.Nomenclature.map(item => {
                                return (
                                    <option key={"whn_" + item.Id} value={item.Id}>{item.Name}</option>
                                )
                            })
                            : null
                    }
                </select>
            </div>
            <div className='addMovementItemBlock'>
                <div className='inputLabel'>Кол-во</div>
                <input type="number" min={1} value={addItemsCount} onChange={e => setAddItemsCount(parseInt(e.target.value))} className='inputCustom movementInput' />
            </div>
            <div className={'addMovementItemBlock' + (buttonHidden || addItemsNomenclature === 0 || isNaN(parseFloat(addItemsCount)) || addItemsCount < 1 ? " hidden" : "")} id='AddMovementItemAddBlock'>
                <div id='AddMovementItemAddButton' onClick={() => { setValidAdd(false); addItems(); }}>Добавить</div>
            </div>
        </div>
        <div>
            {addMovement.items.map((item, index) => {
                return (<div key={"ami_" + index} className="addMovementRow addMovementItems">
                    <div>{item.nomenclature}</div>
                    <div>({item.count})</div>
                    <AiOutlineDelete onClick={() => removeItems(item.nomenclatureId)} className='deleteIcon' />
                </div>)
            })}
        </div>
        <div id='MovementButtonBlock'>
            <div id='MovementButton' onClick={() => createMovement()}>Перемещение</div>
        </div>
    </div >;
}
