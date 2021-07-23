
export default function getDateTime(){
    
    var date = new Date();
    
    var minutes = date.getMinutes();
    var hours = date.getHours();

    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    return{ 
        time:`${String(hours).length<2?"0"+hours:hours}:${String(minutes).length<2?"0"+minutes:minutes}`,
        date:`${String(day).length<2?"0"+day:day}/${String(month).length<2?"0"+month:month}/${year}`
    }
  }