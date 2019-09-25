import Axios from "axios";

class ClassifyApi {
    //获取所有分类的数据
    getAll = async () => {
        let response = await Axios.get(`http://localhost:4000/classify`);
        return await response.data;
    };

    //根据分类 id 获取分类
    getById = async id => {
        let response = await Axios.get(`http://localhost:4000/classify/${id}`);
        return await response.data[0];
    };

    //新增分类
    addArticle = async ({ name }) => {
        let response = await Axios.post("http://localhost:4000/classify", {
            name
        });
        return await response.data;
    };

    //根据分类id 修改分类信息
    editArticleById = async ({ id, name }) => {
        let response = await Axios.put("http://localhost:4000/classify", {
            id,
            name
        });
        return await response.data;
    };

    //删除分类
    deleteById = async classifyId => {
        let response = await Axios.delete(
            `http://localhost:4000/classify/${classifyId}`
        );
        return await response.data;
    };
}
export default ClassifyApi;
