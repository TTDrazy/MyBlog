class ArticleModel {
    constructor({id, title, content, date, classify_id}) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.classify_id = classify_id;
    }
}
module.exports = ArticleModel;
