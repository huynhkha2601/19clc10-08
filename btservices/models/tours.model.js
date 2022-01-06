import db from "../utils/database.js";

export default {

    async findAll(){
        return db('tour');
    },
    findTop5HighestPriceTours(){
        return db('tour').orderBy('price','desc').limit(5).offset(0);
    },
    findTop5UpcomingTours(){
        return db('tour').where('datestart', '>=', new Date().toISOString())
            .orderBy('datestart','asc').limit(5).offset(0);
    },
    findTop5NewestTours(){
        return db('tour').where('datepublished', '>=', new Date().toISOString())
            .orderBy('datestart','desc').limit(5).offset(0);
    },
    async findNextTourID(){
        let tour = await db('tour').orderBy('tourid', 'desc').limit(1).select('tourid');
        if (tour.length === 0)
            return 1;
        return tour[0].tourid + 1;
    },
    async  findByID(id){
        const list = await db('tour').where('tourid',id);
        if(list.length === 0)
            return null;
        return list[0];
    },
    add(entity){
        return db('tour').insert(entity);
    },
    del(id){
        return db('tour').where('tourid',id).del();
    },
    patch(entity){
        const id = entity.userid;
        delete entity.userid;
        return db('tour').where('tourid',id).update(entity);
    }

}
