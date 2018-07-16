import React from "react";
import IntegerModal from "../components/bv-modal/integerModal";
import StringModal from "../components/bv-modal/stringModal";
import LookupModal from "../components/bv-modal/lookupModal";
import DurationModal from "../components/bv-modal/durationModal";
import BooleanModal from "../components/bv-modal/booleanModal";
import DateTimeModal from "../components/bv-modal/dateTimeModal";

const ShowModal = (props) => {
  let ret;
  switch (props.criteria_type) {
    case "integer":
      ret = <IntegerModal {...props} />;
      break;
    case "string":
      ret = <StringModal {...props} />;
      break;
    case "lookup":
      ret = <LookupModal {...props} />;
      break;
    case "duration":
      ret = <DurationModal {...props} />;
      break;
    case "boolean":
      ret = <BooleanModal {...props} />;
      break;
    case "datetime":
      ret = <DateTimeModal {...props} />;
      break;
    default:
      ret = <IntegerModal {...props} />;
  }
  return ret;
};

export default ShowModal;
