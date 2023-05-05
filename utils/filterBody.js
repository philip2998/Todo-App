const filterBody = (object, ...allowedFields) => {
  const newObject = {};
  Object.keys(object).forEach(el => {
    if (allowedFields.includes(el)) newObject[el] = object[el];
  });
  return newObject;
};

export default filterBody;
