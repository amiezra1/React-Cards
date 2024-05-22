import Joi from "joi";

import { validateEmailLogin, validatePasswordLogin } from "./loginValidation";

const firstSchema = Joi.object({
  first: Joi.string().min(2).max(256).required(),
});
const middleSchema = Joi.object({
  middle: Joi.string().min(2).max(256).allow(""),
});
const lastSchema = Joi.object({
  last: Joi.string().min(2).max(256).required(),
});
const phoneSchema = Joi.object({
  phone: Joi.string().min(2).max(256).required(),
});
const urlSchema = Joi.object({
  url: Joi.string().min(2).max(256).allow(""),
});
const altSchema = Joi.object({
  alt: Joi.string().min(2).max(256).allow(""),
});
const stateSchema = Joi.object({
  state: Joi.string().min(2).max(256).allow(""),
});
const countrySchema = Joi.object({
  country: Joi.string().min(2).max(256).required(),
});
const citySchema = Joi.object({
  city: Joi.string().min(2).max(256).required(),
});
const streetSchema = Joi.object({
  street: Joi.string().min(2).max(256).required(),
});
const houseNumberSchema = Joi.object({
  houseNumber: Joi.number().min(2).max(10000000).required(),
});
const zipSchema = Joi.object({
  zip: Joi.number().min(2).max(100000000).required(),
});
const businessSchema = Joi.object({
  business: Joi.boolean(),
});

const validateFirstSchema = (first) => firstSchema.validate(first);
const validateMiddleSchema = (middle) => middleSchema.validate(middle);
const validateLastSchema = (last) => lastSchema.validate(last);
const validatePhoneSchema = (phone) => phoneSchema.validate(phone);
const validateUrlSchema = (url) => urlSchema.validate(url);
const validateAltSchema = (alt) => altSchema.validate(alt);
const validateStateSchema = (state) => stateSchema.validate(state);
const validateCountrySchema = (country) => countrySchema.validate(country);
const validateCitySchema = (city) => citySchema.validate(city);
const validateStreetSchema = (street) => streetSchema.validate(street);
const validateHouseNumberSchema = (houseNumber) =>
  houseNumberSchema.validate(houseNumber);
const validateZipSchema = (zip) => zipSchema.validate(zip);
const validateBusinessSchema = (business) => businessSchema.validate(business);

const validateSchema = {
  first: validateFirstSchema,
  middle: validateMiddleSchema,
  last: validateLastSchema,
  phone: validatePhoneSchema,
  email: validateEmailLogin,
  password: validatePasswordLogin,
  url: validateUrlSchema,
  alt: validateAltSchema,
  state: validateStateSchema,
  country: validateCountrySchema,
  city: validateCitySchema,
  street: validateStreetSchema,
  houseNumber: validateHouseNumberSchema,
  zip: validateZipSchema,
  business: validateBusinessSchema,
};

export default validateSchema;
