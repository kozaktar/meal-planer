import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect'
import {selectUserShopingList} from '../../redux/shopingList/shopingList.selectors'
import {removeFromShopingList} from '../../redux/shopingList/shopingList.actions'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {updateShopingListStart} from '../../redux/shopingList/shopingList.actions';

Array.prototype.diff=function(array2){return this.filter(x=>!array2.includes(x))};

const styles={
    list:{
        marginLeft:'200px'
    }
}

class ShopingList extends React.Component{

    constructor(props){
        super();
        this.state=props.userShopingList.reduce((obj, item)=>{
            return {
                ...obj, [item]:false
            }
        }, {})
    }

    removeCompletedItems=()=>{
        const itemsToRemove=Object.keys(this.state).filter(item=>this.state[item])
        const newList=this.props.userShopingList.diff(itemsToRemove)
        this.props.removeFromList(newList)
        this.props.updateShopingList(newList)
    }
    
    handleChange=(event)=>{
        this.setState({
            ...this.state, [event.target.name]:event.target.checked
        })
    }

    render(){
        const {userShopingList}=this.props
        return(
        <div style={styles.list}>
            <FormGroup>
            {userShopingList.map(item=>(
                <FormControlLabel
                key={item}
                control={
                  <Checkbox
                    onChange={this.handleChange}
                    name={item}
                    color="primary"
                  />
                }
                label={item}
                style={{
                    textDecoration: this.state[item]? 'line-through': null
                }}
              />
            ))}
            </FormGroup>
            <Button variant="contained" size="small" color="primary" style={{marginLeft:'30px', marginTop:'10px'}} onClick={this.removeCompletedItems}>Remove</Button>
        </div>
        )
    }
}
const mapStateToProps=createStructuredSelector({
    userShopingList:selectUserShopingList
})

const mapDispatchToPros=dispatch=>(
    {
        removeFromList: (list)=>dispatch(removeFromShopingList(list)),
        updateShopingList:(list)=>dispatch(updateShopingListStart(list))
    }
)
export default connect(mapStateToProps, mapDispatchToPros)(ShopingList);
