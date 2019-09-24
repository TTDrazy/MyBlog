import ArticleSQL from "../db/articleSQL";
import dbHelper from "../db/modules/dbHelper";
import Result from "./result";

export default class ArticleServer {
    //获取所有文章的数据
    getAll = () => {
        let result = new Result();
        result.message = new dbHelper().query(ArticleSQL.queryAll);
        return result;
    };

    //获取所有文章的数据并包含分类名称
    getAllHasClassifyName = ()=>{
      let result = new Result();
      result.message = new dbHelper().query(ArticleSQL.queryAllHasClassifyName);
      return result; 
    }
    
    //根据文章 id 获取文章
    getById = id => {
        let result = new Result();
        if (!id) {
            result.message = "文章 id 为空，获取失败！";
        } else {
            result.message = new dbHelper().query(ArticleSQL.queryById(id));
        }
        return result;
    };

    //根据文章 id 查询所有的文章数据并且带有相应的分类信息
    getByIdHasClassifyName = id =>{
        let result = new Result();
        if (!id) {
            result.message = "文章 id 为空，获取失败！";
        } else {
            result.message = new dbHelper().query(ArticleSQL.queryByIdHasClassifyName(id));
        }
        return result;
    }

    //根据分类 id 查询所有的文章数据并且带有相应的分类信息
    getListByIdHasClassifyName = classifyId =>{
        let result = new Result();
        if (!classifyId) {
            result.message = "分类 id 为空，获取失败！";
        } else {
            result.message = new dbHelper().query(ArticleSQL.queryArticleListByIdHasClassifyName(classifyId));
        }
        return result;
    }

    //新增文章
    add = articleInfo => {
        let result = new Result();
        if (!articleInfo.title) {
            result.message = "标题为空，新增失败！";
        } else if (!articleInfo.content) {
            result.message = "内容为空，新增失败！";
        } else if (!articleInfo.date) {
            result.message = "日期为空，新增失败！";
        } else if (!articleInfo.classify_id) {
            result.message = "分类 id 为空，新增失败！";
        } else {
            result.message = new dbHelper().query(
                ArticleSQL.insert(articleInfo),
                "need articleId"
            );
        }
        return result;
    };

    //根据文章id 修改文章信息
    editById = articleInfo => {
        let result = new Result();
        if (!articleInfo.id) {
            result.message = "文章 id 为空，修改失败！";
        } else if (!articleInfo.title) {
            result.message = "标题为空，修改失败！";
        } else if (!articleInfo.content) {
            result.message = "内容为空，修改失败！";
        } else if (!articleInfo.date) {
            result.message = "日期为空，修改失败！";
        } else if (!articleInfo.classify_id) {
            result.message = "分类 id 为空，修改失败！";
        } else {
            result.message = new dbHelper().query(
                ArticleSQL.update(articleInfo),
                articleInfo
            );
        }
        return result;
    };
    //删除文章
    deleteById = id => {
        let result = new Result();
        if (!id) {
            result.message = "文章 id 为空，删除失败！";
        } else {
            result.message = new dbHelper().query(ArticleSQL.delete(id), {
                articleId: id
            });
        }
        return result;
    };
}
