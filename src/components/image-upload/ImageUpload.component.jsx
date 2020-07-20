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
        margin: 20,
        position:'relative',
        [theme.breakpoints.down('sm')]:{
            //maxWidth:'50vw',
            maxHeight:'200px',
            marginBottom:30,
            marginLeft:'auto',
            marginRight: 'auto'
        }
    },
    centered:{
        margin:'auto',
        display:'flex',
        flexDirection:'column'
    },
    img:{
        width:'100%',
        height:'100%',
        [theme.breakpoints.down('sm')]:{
            maxHeight:'200px'
        }
    },
    deleteButtonHelperText:{
      position:"absolute",
      top:'3%',
      right:'5%',
    },
    deleteButton:{
        backgroundColor:'hsla(229, 0%, 43%, 0.55)', 
        "&:hover":{backgroundColor:'black'}
    },
    deleteIcon:{
        color:'white'
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
                <img src={processDisplayImage()} className={classes.img} alt=''/>
                <Tooltip title="Delete Image" className={classes.deleteButtonHelperText}>
                <IconButton aria-label="delete"  onClick={handleImageDelete} className={classes.deleteButton} size='small'>
                 <DeleteIcon fontSize="small" className={classes.deleteIcon} />
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