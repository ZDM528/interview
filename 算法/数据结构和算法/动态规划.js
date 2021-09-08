
function bag (p, w, v) {
    let dp = new Array(p.length + 1).fill(0).map(() => new Array(v + 1).fill(0))
    for (let i = 1; i <= p.length; i++) {
        for (let j = 1; j <= v; j++) {
            if (w[i] <= j) {
                dp[i][j] = Math.max(dp[i - 1][j], p[i] + dp[i - 1][v - w[i]])
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }
    console.log(dp)
}

bag([3, 4, 5, 6], [2, 3, 4, 5], 8)