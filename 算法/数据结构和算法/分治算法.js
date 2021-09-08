//解决汉诺塔问题，将一个问题分成相同的子问题

function hanoiTower (num, a, b, c) {
    if (num === 1) console.log('第' + num + '个数：' + a + '到' + c)
    else {
        hanoiTower(num - 1, a, c, b)
        console.log('第' + num + '个数：' + a + '到' + c)
        hanoiTower(num - 1, b, a, c)
    }
}

hanoiTower(2, 'A', 'B', 'C')
