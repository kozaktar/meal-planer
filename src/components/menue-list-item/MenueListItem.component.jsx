import React from 'react';
import {Link} from 'react-router-dom'
//import './MenueListItem.styles.scss';

const MenueListItem=({linkUrl, icon, children})=>(
    <li className="menue-item">
        <Link to={linkUrl} className="item-link">
        <i className={`fa ${icon}`}></i>
            <span className="nav-text">
            {children}
            </span>
        </Link>
    </li>
)
export default MenueListItem