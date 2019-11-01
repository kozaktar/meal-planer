import React, {useState, Fragment} from 'react'
import { makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import  {ReactComponent as Cloud} from '../../assets/cloud-computing.svg';
import Dropzone from 'react-dropzone';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles(theme => ({
    box: {
     border:'dashed 3px #E0E0E0',
     width: 300,
     height: 400,
     margin: 20,
     padding:10,
     display:'flex',
     overflow:'auto'
    },
    cloudImg:{
        maxWidth:50,
        maxHeight:50,
        margin:'auto'
    },
    img:{
        width: 300,
        height: 400,
        margin: 20,
        padding:10,
        display:'flex',
        overflow:'auto'
    },
    centered:{
        margin:'auto',
        display:'flex',
        flexDirection:'column'
    },
    deleteIcon:{
        margin:10
    }
}))

const ImageUpload=({onDrop, removeImages})=>{

    const [image, setImage]=useState(null)
    const classes=useStyles();

    const handleUpload=(acceptedFiles)=>{
        setImage(URL.createObjectURL(acceptedFiles[0]));
        onDrop(acceptedFiles);
    }

    const handleImageDelete=()=>{
        removeImages();
        setImage(null);
    }
    
    return( 
        <Fragment>
            {image?
            <div>
                <img src={image} className={classes.img}/>
                <Tooltip title="Delete Image">
                <IconButton aria-label="delete" className={classes.margin} className={classes.deleteIcon} onClick={handleImageDelete}>
                 <DeleteIcon fontSize="small" />
                </IconButton>
                </Tooltip>
            </div>
            :(
        <Dropzone onDrop={handleUpload}> 
        {({getRootProps, getInputProps}) => ( 
            <div {...getRootProps()} className={classes.box}>
            <div   className={classes.centered}>
                <Cloud className={classes.cloudImg}/>
            <input {...getInputProps()} accept="image/*"/>
              <p>Drop image to upload</p>
              <p>or <u>browse</u></p>   
            </div>
            </div>
          )}
        </Dropzone> 
        )}
    
        
    
    </Fragment>
    )
}

export default ImageUpload;