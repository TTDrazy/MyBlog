const ClassifySQL = {
    insert: (name)=>`INSERT INTO classify(name) VALUES('${name}')`,
    queryAll: `SELECT * FROM classify`,
    queryById: (id)=>`SELECT * FROM classify WHERE id =${id}`,
    update:({id,name})=>
        `UPDATE classify SET name= '${name}' WHERE id=${id}`,
    delete:(id)=>
    `DELETE FROM classify WHERE id=${id}`
};

module.exports = ClassifySQL;
