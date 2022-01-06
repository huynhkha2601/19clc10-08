import db from "../utils/database.js";

export default {
    async findAllLocations(){
        return db('location');
    },
    async findByName(lname){
        return db('location').where('lname', '%' + lname + '%');
    },
    async  findByID(id){
        const list = await db('location').where('lid',id);
        if(list.length === 0)
            return null;
        return list[0];
    },
    async  checkAccount(lname){
        const list = await db('location').where('lname',lname);
        if(list.length === 0)
            return false;
        return true;
    },
    add(entity){
        return db('location').insert(entity);
    },
    del(id){
        return db('location').where('lid',id).del();
    },
    patch(entity){
        const id = entity.lid;
        delete entity.lid;
        return db('location').where('lid',id).update(entity);
    }
}
