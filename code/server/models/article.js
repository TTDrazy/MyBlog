class ArticleModel {
    constructor({id, title, content, date, classify_id,classifyName=''}) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.classify_id = classify_id;
        this.classifyName = classifyName;
    }
}
module.exports = ArticleModel;
