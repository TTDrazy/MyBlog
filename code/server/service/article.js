import db from "../db/modules/baseConnection";
import ArticleSQL from "../db/articleSQL";

const ArticleServer = {
    //获取所有文章的数据
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(ArticleSQL.queryAll, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },

    //根据文章 id 获取文章
    getById: id => {
        return new Promise((resolve, reject) => {
            if (!!id) {
                db.query(ArticleSQL.queryById(id), (err, result) => {
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

    //新增文章
    add: aticleInfo => {
        return new Promise((resolve, reject) => {
            let { title, content, date, classify_id } = aticleInfo;
            if (!!title && !!content && !!date && !!classify_id) {
                db.query(ArticleSQL.insert(aticleInfo), (err, result) => {
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
    //根据文章id 修改文章信息
    editById: aticleInfo => {
        return new Promise((resolve, reject) => {
            let { id, title, content, date, classify_id } = aticleInfo;
            if (!!id) {
                db.query(
                    ArticleSQL.update(id, title, content, date, classify_id),
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve("success!");
                        }
                    }
                );
            } else {
                reject("id 为空！");
            }
        });
    },

    //删除文章
    deleteById: id => {
        return new Promise((resolve, reject) => {
            if (!!id) {
                db.query(ArticleSQL.delete(id), (err, result) => {
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
module.exports = ArticleServer;
