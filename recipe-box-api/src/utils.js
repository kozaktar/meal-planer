function removeDuplicate(arr) {
    const unique={}
   for(let i=0; i<arr.length; i++){
        unique[arr[i]._id]=arr[i]
   }

   return Object.values(unique);
}

module.exports=removeDuplicate