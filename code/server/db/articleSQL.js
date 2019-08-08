const ArticleSQL = {
    insert: ({ title, content, date, classify_id }) =>
        `INSERT INTO article(title,content,date,classify_id) VALUES('${title}','${content}','${date}','${classify_id}')`,
    queryAll: `SELECT * FROM article`,
    queryById: id => `SELECT * FROM article WHERE id =${id}`,
    update: ({ id, title, content, date, classify_id }) =>
        `UPDATE article SET title='${title}', content='${content}', date='${date}', classify_id='${classify_id}' WHERE id=${id}`,
    delete: id => `DELETE FROM article WHERE id=${id}`,
};

module.exports = ArticleSQL;
