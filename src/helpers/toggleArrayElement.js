export default function (element, array) {
  const i = array.indexOf(element);
  if (i === -1) {
    array.push(element);
  } else {
    array.splice(i, 1);
  }

  return array;
}
