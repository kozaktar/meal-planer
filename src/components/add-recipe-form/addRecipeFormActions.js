export const updateTitle=(payload)=>(
    {
      type:'updateTitle',
      payload
    }
  )
  
export const updateDescription=(payload)=>(
    {
      type:'updateDescription',
      payload
    }
  )
  
export const updatePortions=(payload)=>(
    {
      type:'updatePortions',
      payload
    }
  )
  
export const updatePrepTime=(payload)=>(
    {
      type:'updatePrepTime',
      payload
    }
  )
  
export const updateDirections=(payload, idx)=>(
    {
      type:'updateDirections',
      payload,
      idx
    }
  )
  
export const addDirections=()=>(
    {
      type:'addDirections'
    }  
  )
  
export const removeDirections=(idx)=>{
    
    return (
    {
      type:'removeDirections',
      payload:idx
    }
  )}

export const updateIngredients=(payload, idx)=>(
    {
      type:'updateIngredients',
      payload,
      idx
    }
  )
  
export const removeIngredients=(idx)=>{
    return (
    {
      type:'removeIngredients',
      payload:idx
    }
  )}
  
export const addIngredients=()=>(
    {
      type:'addIngredients'
    }  
  )
  
export const addImage=(image)=>(
    {
      type:'addImage',
      payload:image
    }  
  )
  
export const removeImage=()=>(
    {
      type:'removeImage'
    }  
  )
  
export const updateVisibility=(payload)=>(
    {
      type:'updateVisibility',
      payload
    }
  )
  