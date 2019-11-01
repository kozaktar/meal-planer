import React, {useState, Fragment} from 'react'
import { makeStyles} from '@material-ui/core/styles';
import  {ReactComponent as Cloud} from '../../assets/cloud-computing.svg';
import Dropzone from 'react-dropzone';

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
    }
}))

const ImageUpload=({onDrop})=>{

    const [image, setImage]=useState(null)
    const classes=useStyles();

    const handleUpload=(acceptedFiles)=>{
        setImage(URL.createObjectURL(acceptedFiles[0]));
        onDrop(acceptedFiles);
    }
    
    return( 
        <Fragment>
            {image?<img src={image} className={classes.img}></img>:(
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