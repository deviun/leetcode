function countCharacters(words, chars) {
  const charsArr = chars.split('');
  let resultCount = 0;

  words.forEach((word) => {
    const foundCharIndexes = new Set([]);

    for (const wchr of word) {
      let charIndex = '';
      const foundChar = charsArr.find((c, i) => {
        charIndex = `${wchr}.${i}`;
        return c === wchr && !foundCharIndexes.has(charIndex);
      });
      if (foundChar) {
        foundCharIndexes.add(charIndex);
      } else {
        break;
      }
    }

    if (foundCharIndexes.size === word.length) {
      resultCount += word.length;
    }
  });

  return resultCount;
}

module.exports = () => {
  const res = countCharacters(['hello', 'world', 'leetcode'], 'welldonehoneyr');
  console.log(res);
};
