const ArticleSQL = {
    insert: ({ title, content, date, classify_id }) =>
        `INSERT INTO article(title,content,date,classify_id) VALUES('${title}','${content}','${date}','${classify_id}')`,
    queryAll: `SELECT * FROM article`,
    //查询所有的文章数据并且带有相应的分类信息
    queryAllHasClassifyName: ` SELECT article.id,article.content,article.date,article.classify_id,classify.name AS classifyName 
    FROM article INNER JOIN classify WHERE article.classify_id = classify.id`,
    queryById: id => `SELECT * FROM article WHERE id =${id}`,
    //根据分类 id 查询所有的文章数据并且带有相应的分类信息
    queryArticleListByIdHasClassifyName: classifyId => `SELECT article.id,article.content,article.date,article.classify_id,classify.name AS classifyName 
    FROM article INNER JOIN classify WHERE (article.classify_id = classify.id  && classify.id = ${classifyId});`,
    //根据文章 id 查询所有的文章数据并且带有相应的分类信息
    queryByIdHasClassifyName: id => `SELECT article.id,article.content,article.date,article.classify_id,classify.name AS classifyName 
    FROM article INNER JOIN classify WHERE (article.classify_id = classify.id  && article.id = ${id});`,
    update: ({ id, title, content, date, classify_id }) =>
        `UPDATE article SET title='${title}', content='${content}', date='${date}', classify_id='${classify_id}' WHERE id=${id}`,
    delete: id => `DELETE FROM article WHERE id=${id}`
};

module.exports = ArticleSQL;
