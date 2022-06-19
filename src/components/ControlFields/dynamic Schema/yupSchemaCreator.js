import * as yup from "yup";

export function createYupSchema(schema, config) {
  const { name, input_type, validations = [], columns } = config;
  if (!yup[input_type]) {
    return schema;
  }

  let validator = yup[input_type]();
  columns.validations.forEach((validation) => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    validator = validator[type](...params);
  });
  schema[name] = validator;

  return schema;
}
