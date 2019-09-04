import {observable, action} from 'mobx';

const adminInfo = {
        name : 'mayige',
        password : '201201kx@'
    }
class AdminStore{
    
    @observable isAdmin = false;

    @action
    JudgeIsAdmin=(adminName,adminPassword)=>{
        const {name,password} = adminInfo;
        if(adminName === name && adminPassword === password){
            this.isAdmin = true;
        }
    }

    @action
    GetIsAdmin(){
        return this.isAdmin;
    }
}
export default AdminStore;