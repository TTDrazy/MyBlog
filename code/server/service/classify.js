import dbHelper from "../db/modules/dbHelper";
import ClassifySQL from "../db/classifySQL";
import Result from "./result";

export default class ClassifyServer {
    //获取所有分类的数据
    getAll = () => {
        let result = new Result();
        result.message = new dbHelper().query(ClassifySQL.queryAll);
        return result;
    }; 

    //根据分类 id 获取分类
    getById = id => {
        let result = new Result();
        if (!id) {
            result.message = "分类 id 为空，获取失败！";
        } else {
            result.message = new dbHelper().query(ClassifySQL.queryById(id));
        }
        return result;
    };

    //新增分类
    add = ({ name }) =>{
        let result = new Result();
        if (!name) {
            result.message = "分类名称为空，新增失败！";
        } else {
            result.message = new dbHelper().query(ClassifySQL.insert(name), "need classifyId");
        }
        return result;
    };

        

    //根据分类id 修改分类信息
    editById = classifyInfo =>{
        let result = new Result();
        if (!classifyInfo.id) {
            result.message = "分类 id 为空，修改失败！";
        } else if (!classifyInfo.name) {
            result.message = "分类名称为空，修改失败！";
        } else {
            result.message = new dbHelper().query(
                ClassifySQL.update(classifyInfo),
                classifyInfo
            );
        }
        return result;
    };

    //删除分类
    deleteById = id =>{
        let result = new Result();
        if (!id) {
            result.message = "分类 id 为空，删除失败！";
        } else {
            result.message = new dbHelper().query(ClassifySQL.delete(id), { classifyId: id });
        }
        return result;
    };
        
}
