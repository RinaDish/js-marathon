const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

const phoneNumber = '+71234567890';

const getAmountOfA = (string) => string.match(/(?:А|а)/g).length; //The behavior of /[Aa]/g is not expected. So strange =<

const getRow = (firstRow, secondRow) => (firstRow == null || secondRow == null)
    ? alert('The string(s) is not proper') || null
    : Math.max(getAmountOfA(firstRow), getAmountOfA(secondRow));

const formatPhone = (n) => (/^\+[0-9]{11}$/.test(n))
    ? `+${n[1]} (${n[2]}${n[3]}${n[4]}) ${n[5]}${n[6]}${n[7]}-${n[8]}${n[9]}-${n[10]}${n[11]}`
    : alert('The number is not proper') || null;

console.log(getRow(firstRow, secondRow)); //First task
console.log(formatPhone(phoneNumber)); //Second task
