
//2016-07-13  20:22
export function formatDate(date,fmt){
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1,(date.getFullYear()+''.substr(4-RegExp.$1.length)))
    }
    var o= {
        'M+' : date.getMonth() + 1,
        'd+' : date.getDate(),
        'h+' : date.getHours(),
        'm+' : date.getMinutes(),
        's+' : date.getSeconds(),
    }
}
