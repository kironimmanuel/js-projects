export default selection => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(`Check "${selection}", element does not exist`);
};
