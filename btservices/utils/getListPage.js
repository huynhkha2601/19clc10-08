export function getListPage(curPage, pageNum) {

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
}


export function getListSearchPage(curPage, pageNum,key) {

    let listPages = [];
    let i = curPage - 2;
    let endPage = curPage + 2;
    if (i <= 0) {
        i = 1;
        endPage += 2;
    } else if (i >= 3) {
        listPages.push({
            value: 1, isCur: false, url: '/search/' + i + '?' + key
        });
        listPages.push({
            value: "...", isCur: false, url: '/search/' + i + '?' + key
        })
    } else if (i == 2) {
        listPages.push({
            value: 1, isCur: false, url: '/search/' + i + '?' + key
        });
    }
    for (i; i < endPage + 1; i++) {
        if (i > pageNum)
            break;
        listPages.push({
            value: i, isCur: i === curPage, url: '/search/' + i + '?' + key
        })
    }
    if (i === pageNum) {
        listPages.push({
            value: i, isCur: false, url: '/search/' + i + '?' + key
        });
    }
    if (i <= pageNum - 1) {
        listPages.push({
            value: "...", isCur: false, url: '/search/' + i + '?' + key
        });
        listPages.push({
            value: pageNum, isCur: false, url: '/search/' + i + '?' + key
        });
    }
    return listPages;
}
