import db from "../utils/database.js";

export default {
    async findQuantityByDate(date){
        let sl = await db('tour').where('datestart', '>=', new Date().toISOString())
            .whereRaw('datestart like \'%'+date +'%\'').count('* as sl');
        return sl[0].sl;
    },
    findToursByDateWithOffset(date,offset){
        return db('tour').where('datestart', '>=', new Date().toISOString())
            .whereRaw('datestart like \'%'+date +'%\'').limit(15).offset(offset);
    },
    async findQuantityByPrice(price){
        let sl = await db('tour').where('datestart', '>=', new Date().toISOString())
            .where('price', price).count('* as sl');
        return sl[0].sl;
    },
    findToursByPriceWithOffset(price,offset){
        return db('tour').where('datestart', '>=', new Date().toISOString())
            .where('price', price).limit(15).offset(offset);
    },
    async findQuantityByName(name){
        let sl = await db('tour').where('datestart', '>=', new Date().toISOString())
            .whereRaw('tourname like \'%'+name +'%\'').count('* as sl');
        return sl[0].sl;
    },
    findToursByNameWithOffset(name,offset){
        return db('tour').where('datestart', '>=', new Date().toISOString())
            .whereRaw('tourname like \'%'+name +'%\'').limit(15).offset(offset);
    },
    async findQuantityByLocations(lid){
        let sl = await db('tour').where('datestart', '>=', new Date().toISOString())
            .where('location', lid).count('* as sl');
        return sl[0].sl;
    },
    findToursByLocationWithOffset(lid,offset){
        return db('tour').where('datestart', '>=', new Date().toISOString())
            .where('location', lid).limit(15).offset(offset);
    },
    // async findQuantityWithKey(key){
    //     let sl = await db('tour').where('datestart', '>=', new Date().toISOString())
    //         .where('fullname', '%' + key + '%').count('* as sl');
    //     return sl[0].sl;
    // },
    findToursWithKeyWithOffset(key, offset){
        return db('tour').where('datestart', '>=', new Date().toISOString())
            .where('fullname', '%' + key + '%').limit(15).offset(offset);
    },
    async findQuantity(){
        let sl = await db('tour').where('datestart', '>=', new Date().toISOString())
            .count('* as sl');
        console.log(sl);
        return sl[0].sl;
    },
    findAll(){
        return db('tour');
    },
    async findToursByUserID(agencyid){
        return db('tour').where('agencyid', agencyid);
    },
    findNewestToursWithOffset(offset){
        return db('tour').where('datestart', '>=', new Date().toISOString())
            .orderBy('datepublished','desc').limit(15).offset(offset);
    }
    ,
    findHighestPriceToursWithOffset(offset){
        return db('tour').where('datestart', '>=', new Date().toISOString())
            .orderBy('price','desc').limit(15).offset(offset);
    },
    findUpcomingToursWithOffset(offset){
        return db('tour').where('datestart', '>=', new Date().toISOString())
            .orderBy('datestart','asc').limit(15).offset(offset);
    },
    findTop5HighestPriceTours(){
        return db('tour').where('datestart', '>=', new Date().toISOString())
            .orderBy('price','desc').limit(5).offset(0);
    },
    findTop5UpcomingTours(){
        return db('tour').where('datestart', '>=', new Date().toISOString())
            .orderBy('datestart','asc').limit(5).offset(0);
    },
    findTop5NewestTours(){
        return db('tour').where('datestart', '>=', new Date().toISOString())
            .orderBy('datepublished','desc').limit(5).offset(0);
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
        const id = entity.tourid;
        delete entity.tourid;
        return db('tour').where('tourid',id).update(entity);
    }

}
