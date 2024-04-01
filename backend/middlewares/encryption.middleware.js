const express = require("express");
const bcrypt = require("bcrypt");
const user = require("../models/user.model");

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
