import express from "express";
let router = express.Router();
import ClassifyServer from "../service/classify";
import ClassifyModel from "../models/classify";

//获取所有分类的数据
router.get("/", async (req, res, next) => {
    let data = await ClassifyServer.getAll();
    let result = new ClassifyModel(data).toObject();
    res.send(result);
});

//根据分类 id 获取分类
router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    if (!!id) {
        const data = await ClassifyServer.getById(id);
        const result = new ClassifyModel(data).toObject();
        res.send(result);
    } else {
        res.send("查询失败！");
    }
});

//新增分类
router.post("/", async (req, res, next) => {
    const { name } = req.body;
    if (!!name) {
        const dataModel = new ClassifyModel(0, name).toObject();
        const result = await ClassifyServer.add(dataModel);
        res.send(result);
    } else {
        res.send("添加失败！");
    }
});

//根据分类id 修改分类信息
router.put("/", async (req, res, next) => {
    const { id, name } = req.body;
    if (!!id && !!name) {
        const dataModel = new ClassifyModel({
            id,
            name
        }).toObject();
        const result = await ClassifyServer.editById(dataModel);
        res.send(result);
    } else {
        res.send("修改失败！");
    }
});

//删除分类
router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    if (!!id) {
        const result = await ClassifyServer.deleteById(id);
        res.send(result);
    } else {
        res.send("删除失败！");
    }
});

module.exports = router;
