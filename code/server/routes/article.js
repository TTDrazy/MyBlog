import express from "express";
let router = express.Router();
import ArticleServer from "../service/article";
import ArticleModel from "../models/article";

//获取所有文章的数据
router.get("/", async (req, res, next) => {
    let data = await ArticleServer.getAll();
    let result = new ArticleModel(data).toObject();
    res.send(result);
});

//根据文章 id 获取文章
router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    if (!!id) {
        const data = await ArticleServer.getById(id);
        const result = new ArticleModel(data).toObject();
        res.send(result);
    } else {
        res.send("查询失败！");
    }
});

//新增文章
router.post("/", async (req, res, next) => {
    const { title, content, date, classify_id } = req.body;
    if (!!title && !!content && !!date && !!classify_id) {
        const dataModel = new ArticleModel(
            0,
            title,
            content,
            date,
            classify_id
        ).toObject();
        const result = await ArticleServer.add(dataModel);
        res.send(result);
    } else {
        res.send("添加失败！");
    }
});

//根据文章id 修改文章信息
router.put("/", async (req, res, next) => {
    const { id, title, content, date, classify_id } = req.body;
    if (!!id && !!title && !!content && !!date && !!classify_id) {
        const dataModel = new ArticleModel({
            id,
            title,
            content,
            date,
            classify_id
        }).toObject();
        const result = await ArticleServer.editById(dataModel);
        res.send(result);
    } else {
        res.send("修改失败！");
    }
});

//删除文章
router.delete('/:id',async(req,res,next)=>{
    const id = req.params.id;
    if (!!id) {
        const result = await ArticleServer.deleteById(id);
        res.send(result);
    } else {
        res.send("删除失败！");
    }
  })

module.exports = router;
