export default {
    
    getListPage(curPage, pageNum){

        let listPages = [];
        let i = curPage - 2;
        let endPage = curPage + 2;
        if (i <= 0) {
            i = 1;
            endPage += 2;
        } else if (i >= 3) {
            listPages.push({
                value: 1, isCur: false
            });
            listPages.push({
                value: "...", isCur: false
            })
        } else if (i == 2) {
            listPages.push({
                value: 1, isCur: false
            });
        }
        for (i; i < endPage + 1; i++) {
            if (i > pageNum)
                break;
            listPages.push({
                value: i, isCur: i === curPage
            })
        }
        if (i === pageNum) {
            listPages.push({
                value: i, isCur: false
            });
        }
        if (i <= pageNum - 1) {
            listPages.push({
                value: "...", isCur: false
            });
            listPages.push({
                value: pageNum, isCur: false
            });
        }
        return listPages;
    },
    
    getListSearchPage(curPage, pageNum, key)
    {

        let listPages = [];
        let i = curPage - 2;
        let endPage = curPage + 2;
        if (i <= 0) {
            i = 1;
            endPage += 2;
        } else if (i >= 3) {
            listPages.push({
                value: 1, isCur: false, url: 'tours/bySearch/byTourname/' + i +'?key='+ key
            });
            listPages.push({
                value: "...", isCur: false, url: 'tours/bySearch/byTourname/' + i +'?key='+ key
            })
        } else if (i == 2) {
            listPages.push({
                value: 1, isCur: false, url: 'tours/bySearch/byTourname/' + i +'?key='+ key
            });
        }
        for (i; i < endPage + 1; i++) {
            if (i > pageNum)
                break;
            listPages.push({
                value: i, isCur: i === curPage, url: 'tours/bySearch/byTourname/' + i +'?key='+ key
            })
        }
        if (i === pageNum) {
            listPages.push({
                value: i, isCur: false, url: 'tours/bySearch/byTourname/' + i +'?key='+ key
            });
        }
        if (i <= pageNum - 1) {
            listPages.push({
                value: "...", isCur: false, url: 'tours/bySearch/byTourname/' + i +'?key='+ key
            });
            listPages.push({
                value: pageNum, isCur: false, url: 'tours/bySearch/byTourname/' + i +'?key='+ key
            });
        }
        return listPages;
    },
    
    getListSearchByNamePage(curPage, pageNum, key)
    {

        let listPages = [];
        let i = curPage - 2;
        let endPage = curPage + 2;
        if (i <= 0) {
            i = 1;
            endPage += 2;
        } else if (i >= 3) {
            listPages.push({
                value: 1, isCur: false, url: '/tours/bySearch/byTourname/' + i +'?key='+ key
            });
            listPages.push({
                value: "...", isCur: false, url: '/tours/bySearch/byTourname/' + i +'?key='+ key
            })
        } else if (i == 2) {
            listPages.push({
                value: 1, isCur: false, url: '/tours/bySearch/byTourname/' + i +'?key='+ key
            });
        }
        for (i; i < endPage + 1; i++) {
            if (i > pageNum)
                break;
            listPages.push({
                value: i, isCur: i === curPage, url: '/tours/bySearch/byTourname/' + i +'?key='+ key
            })
        }
        if (i === pageNum) {
            listPages.push({
                value: i, isCur: false, url: '/tours/bySearch/byTourname/' + i +'?key='+ key
            });
        }
        if (i <= pageNum - 1) {
            listPages.push({
                value: "...", isCur: false, url: '/tours/bySearch/byTourname/' + i +'?key='+ key
            });
            listPages.push({
                value: pageNum, isCur: false, url: '/tours/bySearch/byTourname/' + i +'?key='+ key
            });
        }
        return listPages;
    },
    
    getListSearchByDatePage(curPage, pageNum, key)
    {

        let listPages = [];
        let i = curPage - 2;
        let endPage = curPage + 2;
        if (i <= 0) {
            i = 1;
            endPage += 2;
        } else if (i >= 3) {
            listPages.push({
                value: 1, isCur: false, url: 'tours/bySearch/byDate/' + i +'?key='+ key
            });
            listPages.push({
                value: "...", isCur: false, url: 'tours/bySearch/byDate/' + i +'?key='+ key
            })
        } else if (i == 2) {
            listPages.push({
                value: 1, isCur: false, url: 'tours/bySearch/byDate/' + i +'?key='+ key
            });
        }
        for (i; i < endPage + 1; i++) {
            if (i > pageNum)
                break;
            listPages.push({
                value: i, isCur: i === curPage, url: 'tours/bySearch/byDate/' + i +'?key='+ key
            })
        }
        if (i === pageNum) {
            listPages.push({
                value: i, isCur: false, url: 'tours/bySearch/byDate/' + i +'?key='+ key
            });
        }
        if (i <= pageNum - 1) {
            listPages.push({
                value: "...", isCur: false, url: 'tours/bySearch/byDate/' + i +'?key='+ key
            });
            listPages.push({
                value: pageNum, isCur: false, url: 'tours/bySearch/byDate/' + i +'?key='+ key
            });
        }
        return listPages;
    },
    
    getListSearchByLocPage(curPage, pageNum, key)
    {

        let listPages = [];
        let i = curPage - 2;
        let endPage = curPage + 2;
        if (i <= 0) {
            i = 1;
            endPage += 2;
        } else if (i >= 3) {
            listPages.push({
                value: 1, isCur: false, url: '/tours/byLoc/'+key+'?page=' + i
            });
            listPages.push({
                value: "...", isCur: false, url: '/tours/byLoc/'+key+'?page=' + i
            })
        } else if (i == 2) {
            listPages.push({
                value: 1, isCur: false, url: '/tours/byLoc/'+key+'?page=' + i
            });
        }
        for (i; i < endPage + 1; i++) {
            if (i > pageNum)
                break;
            listPages.push({
                value: i, isCur: i === curPage, url: '/tours/byLoc/'+key+'?page=' + i
            })
        }
        if (i === pageNum) {
            listPages.push({
                value: i, isCur: false, url: '/tours/byLoc/'+key+'?page=' + i
            });
        }
        if (i <= pageNum - 1) {
            listPages.push({
                value: "...", isCur: false, url: '/tours/byLoc/'+key+'?page=' + i
            });
            listPages.push({
                value: pageNum, isCur: false, url: '/tours/byLoc/'+key+'?page=' + i
            });
        }
        return listPages;
    }
,
    getListSearchByPricePage(curPage, pageNum, key)
    {

        let listPages = [];
        let i = curPage - 2;
        let endPage = curPage + 2;
        if (i <= 0) {
            i = 1;
            endPage += 2;
        } else if (i >= 3) {
            listPages.push({
                value: 1, isCur: false, url: '/tours/bySearch/byPrice/' + i +'?key='+ key
            });
            listPages.push({
                value: "...", isCur: false, url:'/tours/bySearch/byPrice/' + i +'?key='+ key
            })
        } else if (i == 2) {
            listPages.push({
                value: 1, isCur: false, url:'/tours/bySearch/byPrice/' + i +'?key='+ key
            });
        }
        for (i; i < endPage + 1; i++) {
            if (i > pageNum)
                break;
            listPages.push({
                value: i, isCur: i === curPage, url: '/tours/bySearch/byPrice/' + i +'?key='+ key
            })
        }
        if (i === pageNum) {
            listPages.push({
                value: i, isCur: false, url: '/tours/bySearch/byPrice/' + i +'?key='+ key
            });
        }
        if (i <= pageNum - 1) {
            listPages.push({
                value: "...", isCur: false, url: '/tours/bySearch/byPrice/' + i +'?key='+ key
            });
            listPages.push({
                value: pageNum, isCur: false, url:'/tours/bySearch/byPrice/' + i +'?key='+ key
            });
        }
        return listPages;
    }


}