class Classify{
    constructor(id,name){
        this.id=id,
        this.name=name
    }
    toObject=()=>{
        return{
            id:this.id,
            name:this.name
        }
    }
}
module.exports = Classify;