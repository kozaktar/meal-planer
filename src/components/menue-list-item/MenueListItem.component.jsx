import React from 'react';
import {Link} from 'react-router-dom'
//import './MenueListItem.styles.scss';
import {withRouter} from 'react-router-dom';

const MenueListItem=({linkUrl, icon, children, location})=>{
    console.log("Link uRl",linkUrl);
    console.log("match",location);
return(
    <li className={`menue-item ${linkUrl===location.pathname?'active':''}`} >
        <Link to={linkUrl} className="item-link">
        <i className={`fa ${icon}`}></i>
            <span className="nav-text">
            {children}
            </span>
        </Link>
    </li>
)
}
export default withRouter(MenueListItem)