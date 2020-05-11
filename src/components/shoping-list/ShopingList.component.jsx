import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect'
import {selectUserShopingList} from '../../redux/shopingList/shopingList.selectors'
import {removeFromShopingList} from '../../redux/shopingList/shopingList.actions'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
                    checked={this.state.item}
                    onChange={this.handleChange}
                    name={item}
                    color="primary"
                  />
                }
                label={item}
              />
            ))}
            </FormGroup>
        </div>
        )
    }
}
const mapStateToProps=createStructuredSelector({
    userShopingList:selectUserShopingList
})

const mapDispatchToPros=dispatch=>(
    {
        removeFromList: (list)=>dispatch(removeFromShopingList(list))
    }
)
export default connect(mapStateToProps, mapDispatchToPros)(ShopingList);
