
function selectLess () {
    let map = new Map()
    map.set('K1', ['北京', '上海', '天津'])
    map.set('K2', ['广州', '北京', '深圳'])
    map.set('K3', ['成都', '上海', '杭州'])
    map.set('K4', ['上海', '天津'])
    map.set('K5', ['杭州', "大连"])
    let areaAll = ['北京', '上海', '天津', '广州', '深圳', '成都', '杭州', "大连"]
    let selectAll = []
    let hasSome = []
    while (areaAll.length > 0) {
        let maxKey = null
        for (let [key, value] of map) {
            hasSome = areaAll.filter(item => {
                return value.includes(item)
            })
            if (maxKey === null || hasSome.length > map.get(maxKey).length) {
                maxKey = key
            }
        }
        selectAll.push(maxKey)
        for (let i = 0; i < map.get(maxKey).length; i++) {
            for (let j = 0; j < areaAll.length; j++) {
                if (map.get(maxKey)[i] === areaAll[j]) {
                    areaAll.splice(j, 1)
                    console.log(areaAll);
                    break
                }
            }
        }
        map.set(maxKey, [])
    }
    return selectAll
}

selectLess()
