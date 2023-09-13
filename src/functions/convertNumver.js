 const convertNumber = (number) => {
  let numberWithComma = number.toLocaleString();
  let numberArr = numberWithComma.split(",");
  if (numberArr.length === 5) {
    //trillions

    return numberArr[0] + "." + numberArr[1].slice(0, 2) + "T";
  } else if (numberArr.length === 4) {
    //billions
    return numberArr[0] + "." + numberArr[1].slice(0, 2) + "B";
  } else if (numberArr === 3) {
    //millions
    return numberArr[0] + "." + numberArr[1].slice(0, 2) + "M";
  } else if (numberArr === 2) {
    //thounds
    return numberArr[0] + "." + numberArr[1].slice(0, 2) + "K";
  } else {
    //hundred

    return numberArr[0] + "." + numberArr[1].slice(0, 2) + "H";
  }
};
export default convertNumber
