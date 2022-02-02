import React from 'react';
import { NavLink } from 'react-router-dom';
import './menu.css'

export default function Menu() {
  return <div id="Menu">
      <NavLink className="MenuItem" to={"/warehouse"}>Склады</NavLink>
      <NavLink className="MenuItem" to={"/nomenclature"}>Номенклатуры</NavLink>
      <NavLink className="MenuItem" to={"/movements"}>Перемещения</NavLink>
  </div>;
}
