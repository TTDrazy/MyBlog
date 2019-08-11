import db from "./baseConnection";

export default class dbHelper {
    async query(SQL, resultInfo) {
        return new Promise((resolve, reject) => {
            db.query(SQL, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (!!resultInfo) {
                        if (resultInfo == "need articleId") {
                            const articleId = result.insertId;
                            resolve({ 'articleId': articleId });
                        }else if(resultInfo == "need classifyId"){
                            const classifyId = result.insertId;
                            resolve({ 'classifyId': classifyId });
                        } else {
                            resolve(resultInfo);
                        }
                    } else {
                        resolve(result);
                    }
                }
            });
        });
    }
}
