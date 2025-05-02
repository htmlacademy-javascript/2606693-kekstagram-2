const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const filteredString = string.toLowerCase().replaceAll(' ', '');
  return filteredString === [...filteredString].reverse().join('');
};

const extractNumbers = (income) => {
  const filteredString = [...String(income)]
    .filter((char) => !Number.isNaN(parseInt(char, 10)))
    .join('');
  return parseInt(filteredString, 10);
};

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

isPalindrome('Лёша на полке клопа нашёл ');
isPalindrome('Я не палиндром');

extractNumbers('2023 год');
extractNumbers('ECMAScript 2022');
extractNumbers('1 кефир, 0.5 батона  ');
extractNumbers('агент 007');
extractNumbers('а я томат');
extractNumbers(2023);
extractNumbers(-1);
extractNumbers(1.5);
