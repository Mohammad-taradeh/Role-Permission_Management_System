import express from "express";
import isEmail from "validator/lib/isEmail.js";
import { Profile } from "../db/entities/Profile.js";

const validateProfile = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const values = ["firstName", "lastName", "dateOfBirth"];
  const profile = req.body;
  const errorList: any = [];
  // const errorList = values.map(key => !user[key] && `${key} is Required!`).filter(Boolean);
  values.forEach((key) => {
    if (!profile[key]) {
      return errorList.push(`${key} is Required to create Profile!`);
    }
  });
  let dob = new Date(profile.dateOfBirth);

  if (!dob.valueOf()) {
    errorList.push("Enter the date as mm/dd//yyyy");
  }
  
  if (errorList.length) {
    res.status(400).send(errorList);
  } else {
    req.body.dateOfBirth = dob;
    next();
  }
};

export { validateProfile };
