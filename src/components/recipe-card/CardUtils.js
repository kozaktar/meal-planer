/**
 * Function to truncate text (to be used to ensure that all recipe cards are the same size)
 * @param  {[String]} arg1 text to be truncated
 * @param  {[Int]} arg2 desired final length of the string
 * @return {[String]}      truncated string
 */
export const truncateString=(str, length)=>{
    if(str.length<=length)
        return str
    else
        return str.split('').splice(0,length).join('')+'...'
}