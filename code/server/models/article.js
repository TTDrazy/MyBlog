class ArticleModel {
    constructor(id, title, content, date, classify_id) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.classify_id = classify_id;
    }
    toObject=()=> {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            date: this.date,
            classify_id: this.classify_id
        };
    }
}
module.exports = ArticleModel;
