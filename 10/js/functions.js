/* [2.33. Нужно больше функций] */
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

/* [5.16. Функции возвращаются] */
const isMeetingPossible = (workStart, workEnd, meetingStart, meetingLength) => {
  // деструктурирует массив строк типа '00:00' в переменные с числом минут с начала дня
  const [workStartInMinutes, workEndInMinutes, meetingStartInMinutes] = [workStart, workEnd, meetingStart]
    .map((string) => string.split(':').reduce((hours, minutes) => parseInt(hours, 10) * 60 + parseInt(minutes, 10)));
  const meetingEndInMinutes = meetingStartInMinutes + meetingLength;
  return workStartInMinutes <= meetingStartInMinutes && workEndInMinutes >= meetingEndInMinutes;
};

isMeetingPossible('08:00', '17:30', '14:00', 90);
isMeetingPossible('8:0', '10:0', '8:0', 120);
isMeetingPossible('08:00', '14:30', '14:00', 90);
isMeetingPossible('14:00', '17:30', '08:0', 90);
isMeetingPossible('8:00', '17:30', '08:00', 900);
