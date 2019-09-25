import React from 'react';
import './sideBar.styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import MenueListItem from '../menue-list-item/MenueListItem.component';

const SideBar=()=>(
    <nav className="main-menu">
        <i class="fa fa-bars"></i>
            <ul>
                <MenueListItem linkUrl={'#'} icon={'fa-hamburger fa-6x'} >My Recipies</MenueListItem>
            </ul>

        </nav>
)
export default SideBar;