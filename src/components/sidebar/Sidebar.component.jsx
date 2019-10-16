import React from 'react';
import './sideBar.styles.scss'
import MenueListItem from '../menue-list-item/MenueListItem.component';     


const SideBar=()=>{
    return (
    <nav className="main-menu">
            <ul>
                <MenueListItem linkUrl={'/myrecipebox/myrecipes'} icon={'fa-hamburger'} loc>My Recipies</MenueListItem>
                <MenueListItem linkUrl={'/myrecipebox/mygrocerylist'} icon={'fa-list'} loc>My Grocery List</MenueListItem>
            </ul>
            

        </nav>
    )
}
export default SideBar;