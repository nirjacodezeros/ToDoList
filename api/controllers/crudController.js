const mongoose = require("mongoose");
const { SuccessResponse } = require("../responces/SuccessResponse");
const { UnauthorizedResponse } = require("../responces/UnauthorizedResponse");
const { ErrorResponse } = require("../responces/ErrorResponse");
const crudSchema = require("../modals/crudModal");

function addNewItem(req, res) {
  try {
    let newAction = new crudSchema(req.body);
    newAction.save((err, action) => {
      if (err) {
        ErrorResponse(res, err);
      } else {
        SuccessResponse(res, "successfully_added", action);
      }
    });
  } catch (err) {
    ErrorResponse(res, err.message, "");
  }
}

function getItem(req, res) {
  try {
    crudSchema.find((err, action) => {
      if (err) {
        ErrorResponse(res, err);
      } else {
        SuccessResponse(res, "get_sucessfully", action);
      }
    });
  } catch (err) {
    ErrorResponse(res, err.message, "");
  }
}

function getItemId(req, res) {
  try {
    let query = {
      _id: mongoose.Types.ObjectId(req.params.id),
    };
    crudSchema.findOne(query, (err, action) => {
      if (err) {
        ErrorResponse(res, err);
      } else {
        SuccessResponse(res, "get_sucessfully", action);
      }
    });
  } catch (err) {
    ErrorResponse(res, err.message, "");
  }
}

function updateItem(req, res) {
  try {
    crudSchema.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, action) => {
        if (err) {
          ErrorResponse(res, err);
        } else {
          SuccessResponse(res, "successfully_updated", action);
        }
      }
    );
  } catch (err) {
    ErrorResponse(res, err.message, "");
  }
}

function deleteItem(req, res) {
  try {
    crudSchema.remove({ _id: req.params.id }, (err, action) => {
      if (err) {
        ErrorResponse(res, err);
      } else {
        SuccessResponse(
          res,
          "successfully_deleted",
          action
        );
      }
    });
  } catch (err) {
    ErrorResponse(res, err.message, "");
  }
}

module.exports = { getItem, addNewItem, getItemId, updateItem , deleteItem};
