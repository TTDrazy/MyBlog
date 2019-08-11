import express from "express";
let router = express.Router();
import ClassifyServer from "../service/classify";
import ClassifyModel from "../models/classify";

//获取所有分类的数据
router.get("/", async (req, res, next) => {
    let data = await new ClassifyServer().getAll().message;
    let result = [];
    data.map(item => {
        let dataItem = new ClassifyModel(item);
        result.push(dataItem);
    });
    res.send(result);
});

//根据分类 id 获取分类
router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    let data = await new ClassifyServer().getById(id).message;
    let result = [];
    data.map(item => {
        let dataItem = new ClassifyModel(item);
        result.push(dataItem);
    });
    res.send(result);
});

//新增分类
router.post("/", async (req, res, next) => {
    const { name } = req.body;

    const dataModel = new ClassifyModel({ id: 0, name });
    const result = await new ClassifyServer().add(dataModel).message;
    res.send(result);
});

//根据分类id 修改分类信息
router.put("/", async (req, res, next) => {
    const { id, name } = req.body;
    const dataModel = new ClassifyModel({
        id,
        name
    });
    const result = await new ClassifyServer().editById(dataModel).message;
    res.send(result);
});

//删除分类
router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    let result = await new ClassifyServer().deleteById(id).message;
    res.send(result);
});

module.exports = router;
