import Axios from "axios";

class ArticleApi {
    //获取所有文章的数据
    getAll = async () => {
        let response = await Axios.get(`http://localhost:4000/article`);
        return await response.data;
    };
    //获取所有文章的数据并包含分类名称
    getAllHasClassifyName = async () => {
        let response = await Axios.get(
            `http://localhost:4000/article/hasClassifyName`
        );
        return await response.data;
    };

    //根据文章 id 来获取对应文章
    getById = async articleId => {
        let response = await Axios.get(`http://localhost:4000/article/${articleId}`);
        return await response.data[0];
    };

    //根据文章 id 查询对应文章数据并且带有相应的分类信息
    getByIdHasClassifyName = async articleId => {
        let response = await Axios.get(
            `http://localhost:4000/article/ById/${articleId}`
        );
        return await response.data[0];
    };

    //根据分类 id 查询所有的文章数据并且带有相应的分类信息
    getListByIdHasClassifyName = async classifyId => {
        let response = await Axios.get(
            `http://localhost:4000/article/ByClassify/${classifyId}`
        );
        return await response.data;
    };

    //新增文章
    addArticle = async ({ title, content, date, classify_id }) => {
        let response = await Axios.post("http://localhost:4000/article", {
            title,
            content,
            date,
            classify_id
        });
        return await response.data;
    };

    //根据文章 id 修改文章信息
    editArticleById = async ({ id, title, content, date, classify_id }) => {
        let response = await Axios.put("http://localhost:4000/article", {
            id,
            title,
            content,
            date,
            classify_id
        });
        return await response.data;
    };

    //根据文章 id 删除文章
    deleteById = async articleId => {
        let response = await Axios.delete(`http://localhost:4000/article/${articleId}`);
        return await response.data;
    };
}
export default ArticleApi;
