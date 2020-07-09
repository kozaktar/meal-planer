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

//find the difference between 2 arrays
Array.prototype.diff=function(array2){return this.filter(x=>!array2.includes(x))};

const styles={
    rootStyle:{
        marginLeft:'20px', 
        marginTop:'20px',
        
    },
    listStyle:{
        borderStyle:'dotted',
        width:200,
        minHeight:300,
        margin:'auto',
        marginTop:10
    }
}

class ShopingList extends React.Component{

    constructor(props){
        super();
        this.state={
            shopingList: props.userShopingList.reduce((obj, item)=>{
                return {
                    ...obj, [item]:false
                }
            }, {})
        }
    }

    checkIfAnySelected=()=>{
        for(let prop in this.state.shopingList){
            if(this.state.shopingList[prop]){
                return true
            }
        }
    }

    removeCompletedItems=()=>{
        const itemsToRemove=Object.keys(this.state.shopingList).filter(item=>this.state.shopingList[item])
        const newList=this.props.userShopingList.diff(itemsToRemove)
        this.props.removeFromList(newList)
        this.props.updateShopingList(newList)
        //update the state
        const newState=Object.assign({},this.state.shopingList)
        itemsToRemove.forEach(item=>delete newState[item])

        this.setState({
            shopingList:newState
        })
        
    }
    
    handleChange=(event)=>{
        const list=this.state.shopingList
        list[event.target.name]=event.target.checked
        this.setState({
            shopingList:list
        })
    }

    render(){
        const {userShopingList}=this.props
        return(
        <div>
            <FormGroup style={styles.listStyle}>
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
                    textDecoration: this.state.shopingList[item]? 'line-through': null
                }}
              />
            ))}
            
            </FormGroup>
        <div style={{textAlign:'center', marginTop:10}}>
            {
                <Button variant="contained" size="small" color="primary" onClick={this.removeCompletedItems} disabled={!this.checkIfAnySelected()}>Remove</Button>
            }
            </div>
           
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
