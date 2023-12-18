function shuffleQuestions(qidList) {
    for (let i = qidList.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap qidList[i] and qidList[j]
        [qidList[i], qidList[j]] = [qidList[j], qidList[i]];
    }
    return qidList;
}

module.exports = shuffleQuestions;
