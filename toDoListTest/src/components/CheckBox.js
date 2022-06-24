import React, { useState } from "react";

function CheckBox() {
  const [checked, setChecked] = useState([]);
  //start single checkbox checked value
  const [check, setCheck] = useState();
  //end
  const checkList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  var isChecked = (item) => {
    checked.includes(item);
  };

  return (
    <div className="app">
      <div className="checkList">
        <div className="title">Your CheckList:</div>
        <div className="list-container">
          {checkList.map((item, index) => (
            <div key={index}>
              <input
                value={item}
                type="checkbox"
                onChange={handleCheck}
                //start single checkbox
                // checked={check === item}
                //end
              />
              &nbsp; &nbsp;
              <span className={isChecked(item)}>{item}</span>
              &nbsp; &nbsp;
              <br />
              {`Hi Today Is: ${checked.filter((i) => i == item)}`}
              {/* start single checkbox */}
              {/* {`Hi Today Is: ${checked === item ? checked : ""}`} */}
              {/* end */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CheckBox;
