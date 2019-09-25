import express from "express";
let router = express.Router();
import ArticleServer from "../service/article";
import ArticleModel from "../models/article";

//获取所有文章的数据
router.get("/", async (req, res) => {
    let data = await new ArticleServer().getAll().message;
    let result = [];
    data.map(item => {
        let dataItem = new ArticleModel(item);
        result.push(dataItem);
    });
    res.send(result);
});
//获取所有文章的数据并包含分类名称
router.get("/hasClassifyName", async (req, res) => {
    let data = await new ArticleServer().getAllHasClassifyName().message;
    let result = [];
    data.map(item => {
        let dataItem = new ArticleModel(item);
        result.push(dataItem);
    });
    res.send(result);
});

//根据文章 id 获取文章
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    let data = await new ArticleServer().getById(id).message;
    let result = [];
    data.map(item => {
        let dataItem = new ArticleModel(item);
        result.push(dataItem);
    });
    res.send(result);
});

//根据文章 id 查询对应文章数据并且带有相应的分类信息
router.get("/ById/:id", async (req, res) => {
    const id = req.params.id;
    let data = await new ArticleServer().getByIdHasClassifyName(id).message;
    let result = [];
    data.map(item => {
        let dataItem = new ArticleModel(item);
        result.push(dataItem);
    });
    res.send(result);
});

//根据分类 id 查询所有的文章数据并且带有相应的分类信息
router.get("/ByClassify/:classifyId", async (req, res) => {
    const classifyId = req.params.classifyId;
    let data = await new ArticleServer().getListByIdHasClassifyName(classifyId)
        .message;
    let result = [];
    data.map(item => {
        let dataItem = new ArticleModel(item);
        result.push(dataItem);
    });
    res.send(result);
});

//新增文章
router.post("/", async (req, res) => {
    const { title, content, date, classify_id } = req.body;
    const dataModel = new ArticleModel({
        id: 0,
        title,
        content,
        date,
        classify_id
    });
    const result = await new ArticleServer().add(dataModel).message;
    res.send(result);
});

//根据文章id 修改文章信息
router.put("/", async (req, res) => {
    const { id, title, content, date, classify_id } = req.body;
    const dataModel = new ArticleModel({
        id,
        title,
        content,
        date,
        classify_id
    });
    const result = await new ArticleServer().editById(dataModel).message;
    res.send(result);
});

//删除文章
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    let result = await new ArticleServer().deleteById(id).message;
    res.send(result);
});

module.exports = router;
