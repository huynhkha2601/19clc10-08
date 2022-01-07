import db from "../utils/database.js";

export default {
    async findAll(){
        return db('register');
    },
    async findByUserID(userid){
        return db('register').where('userid', userid);
    },
    async findByID(rId){
        const list = await db('register').where('rId',rId);
        if(list.length === 0)
            return null;
        return list[0];
    },
    add(entity){
        return db('register').insert(entity);
    },
    del(rId){
        return db('register').where('rId',rId).del();
    },
    patch(entity){
        const id = entity.rId;
        delete entity.rId;
        return db('register').where('lid',id).update(entity);
    }

}
