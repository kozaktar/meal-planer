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
    imgDiv:{
        width: 300,
        height: 400,
        margin: 20
    },
    centered:{
        margin:'auto',
        display:'flex',
        flexDirection:'column'
    },
    img:{
        width:'100%',
        height:'100%'
    },
    deleteButton:{
      marginLeft: -20
    }
}))

const ImageUpload=({onDrop, removeImages, initialImage})=>{
        
    const [image, setImage]=useState(initialImage)
    const classes=useStyles();

    const processDisplayImage = ()=>{
        if(image && image.type==='Buffer') //if image isn't null and is a buffer object
            return `data:image;base64,${new Buffer(image).toString('base64')}`
    
        return image
    } 

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
            <div className={classes.imgDiv}>
                <img src={processDisplayImage()} className={classes.img}/>
                <Tooltip title="Delete Image" className={classes.deleteButton}>
                <IconButton aria-label="delete"  onClick={handleImageDelete}>
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