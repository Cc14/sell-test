
//2016-07-13  20:22
// var date=1563873863784
// var fmt = 'yyyy-MM-dd hh-mm'
// date=new Date(date)
export function formatDate(date,fmt){
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1,(date.getFullYear()))
    }
    var o= {
        'M+' : date.getMonth() + 1,
        'd+' : date.getDate(),
        'h+' : date.getHours(),
        'm+' : date.getMinutes(),
        's+' : date.getSeconds(),
    }
    for (let k in o){
        if(new RegExp(`(${k})`).test(fmt)){
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1 ? str : padLeftZero(str)));
        }
    }
    
    return fmt
}
function padLeftZero(str){
    return ('00'+str).substr(str.length);
}
