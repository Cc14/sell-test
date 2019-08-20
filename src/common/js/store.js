export function saveToLocal(id,key,value){
    let seller = window.localStorage.__seller__//往localStroage中存储__seller__属性
    console.log(seller)
    if(!seller){
        seller = {}
        seller[id]={}
    }else{
       
        seller=JSON.parse(seller)  //把字符串解析成对象
        console.log(seller)
        if(!seller[id]){
            seller[id]={}
        }
    }
    seller[id][key]=value
    window.localStorage.__seller__=JSON.stringify(seller) //把对象转换成字符串
};
export function loadFromLocal(id,key,def){
    console.log(id)
    let seller = window.localStorage.__seller__
    if(!seller){
        return def
    }
    seller = JSON.parse(seller)[id]
    if(!seller){
        return def
    }
    let ret = seller[key]
    return ret || def
}