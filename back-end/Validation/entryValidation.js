const checkUserValues = (req, res, next) => {
  if (req.body.username && req.body.password && req.body.email) {
    next();
  } else {
    res.status(400).json({
      error:
        "You are missing required keys. Please make sure you have: username, password, email",
    });
  }
};

const checkUserExtraEntries = (req, res, next) => {
  const validFields = ["username", "password", "email"];
  const keys = Object.keys(req.body);

  const extraFields = keys.filter((key) => !validFields.includes(key));

  if (extraFields.length > 0) {
    res.status(400).json({
      error: `You have extra keys: ${extraFields.join(", ")}.`,
    });
  } else {
    next();
  }
};

const checkTransactionValues = (req, res, next) => {
  if (
    req.body.transaction_name &&
    req.body.transaction_type &&
    req.body.transaction_amount &&
    req.body.transaction_date
  ) {
    next();
  } else {
    res.status(400).json({
      error:
        "You are missing required keys. Please make sure you have: name, type, amount and date.",
    });
  }
};

const checkTransactionExtraEntries = (req, res, next) => {
  const validFields = [
    "transaction_name",
    "transaction_type",
    "transaction_amount",
    "transaction_date",
    "transaction_category",
    "transaction_note",
  ];
  const keys = Object.keys(req.body);

  const extraFields = keys.filter((key) => !validFields.includes(key));

  if (extraFields.length > 0) {
    res.status(400).json({
      error: `You have extra keys: ${extraFields.join(", ")}.`,
    });
  } else {
    next();
  }
};

const checkAccountValues = (req, res, next) => {
  if (
    req.body.account_name &&
    req.body.account_type &&
    req.body.account_balance
  ) {
    next();
  } else {
    res.status(400).json({
      error:
        "You are missing required keys. Please make sure you have: name, type and balance.",
    });
  }
};

const checkAccountExtraEntries = (req, res, next) => {
  const validFields = [
    "account_name",
    "account_type",
    "account_balance",
    "account_note",
  ];
  const keys = Object.keys(req.body);

  const extraFields = keys.filter((key) => !validFields.includes(key));

  if (extraFields.length > 0) {
    res.status(400).json({
      error: `You have extra keys: ${extraFields.join(", ")}.`,
    });
  } else {
    next();
  }
};

module.exports = {
  checkUserValues,
  checkUserExtraEntries,
  checkTransactionValues,
  checkTransactionExtraEntries,
  checkAccountValues,
  checkAccountExtraEntries,
};
