const crypto = require("crypto");

function generateProductCode(name) {
  const hash = crypto.createHash("md5").update(name).digest("hex").slice(0, 8);

  const findIncreasingSubstring = (str) => {
    let longest = "";
    let temp = "";
    for (let i = 0; i < str.length - 1; i++) {
      if (str[i] < str[i + 1]) {
        temp += str[i];
      } else {
        temp += str[i];
        if (temp.length > longest.length) longest = temp;
        temp = "";
      }
    }
    temp += str[str.length - 1];
    if (temp.length > longest.length) longest = temp;
    return longest;
  };

  const substring = findIncreasingSubstring(name.toLowerCase());
  const startIndex = name.toLowerCase().indexOf(substring);
  const endIndex = startIndex + substring.length - 1;

  return `${hash}-${startIndex}${substring}${endIndex}`;
}

module.exports = generateProductCode;