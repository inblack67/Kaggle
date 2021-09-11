import * as yup from 'yup';

export const fetchCountryInputSchema = yup
  .object()
  .shape({
    id: yup
      .number()
      .required('id is required')
      .typeError('id must be a number'),
  });

export const fetchCountriesInputSchema = yup.object().shape({
  startYear: yup.number().typeError('startYear must be a number'),
  endYear: yup.number().typeError('endYear must be a number'),
  category: yup.string().typeError('category must be a string'),
});

export const fetchCountryInputValidation = (input: any) => {
  const validationRes = fetchCountryInputSchema.validate(input);
  return validationRes;
};

export const fetchCountriesInputValidation = (input: any) => {
  const validationRes = fetchCountriesInputSchema.validate(input);
  return validationRes;
};
