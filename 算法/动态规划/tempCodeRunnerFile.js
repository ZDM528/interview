const n = s.length;
    let count = 0;
    for (let i = 0; i < 2 * n - 1; i++) {
        let left = i / 2;
        let right = i / 2 + i % 2;
        while (left >= 0 && right < n && s[left] == s[right]) {
            left--
            right++;
            count++;
        }
    }

    return count;