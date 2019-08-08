import db from "../db/modules/baseConnection";
import ClassifySQL from "../db/classifySQL";

const ClassifyServer = {
    //获取所有分类的数据
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(ClassifySQL.queryAll, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    //根据分类 id 获取分类
    getById: id => {
        return new Promise((resolve, reject) => {
            if (!!id) {
                db.query(ClassifySQL.queryById(id), (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            } else {
                reject("id为空！");
            }
        });
    },

    //新增分类
    add: ({name}) => {
        return new Promise((resolve, reject) => {
            if (!!name) {
                db.query(ClassifySQL.insert(name), (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve("success!");
                    }
                });
            } else {
                reject("传参有空！");
            }
        });
    },

    //根据分类id 修改分类信息
    editById: classifyInfo => {
        return new Promise((resolve, reject) => {
            let { id, name } = classifyInfo;
            if (!!id) {
                db.query(ClassifySQL.update(id, name), (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve("success!");
                    }
                });
            } else {
                reject("id 为空！");
            }
        });
    },

    //删除分类
    deleteById: id => {
        return new Promise((resolve, reject) => {
            if (!!id) {
                db.query(ClassifySQL.delete(id), (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve("success!");
                    }
                });
            } else {
                reject("id为空！");
            }
        });
    }
};
module.exports = ClassifyServer;
