import React from 'react'
import Warehouse from './warehouse/warehouse'
import { Route } from 'react-router-dom'
import Menu from './menu/menu'
import Nomenclature from './nomenclature/nomenclature';
import WarehouseDetails from './warehouse/warehousedetails';
import Movement from './movement/movement';

export default function Work() {
  return <div>
            <Route path='/' component={Menu} />
            <Route exact path='/warehouse' component={Warehouse} />
            <Route exact path='/warehouse/:whid' component={WarehouseDetails} />
            <Route exact path='/nomenclature' component={Nomenclature} />
            <Route exact path='/movements' component={Movement} />
    </div>;
}
