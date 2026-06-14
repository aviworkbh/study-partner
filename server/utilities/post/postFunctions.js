


const testMatched = (days) => {
    let matched = 1;
    days.forEach(day => {
        if (day > 0) {
            matched = -1;
        }
    });
    return matched;
}

module.exports = {
    testMatched,
}