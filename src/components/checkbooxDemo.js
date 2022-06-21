import React, { useEffect, useState } from "react";

let defaultValues = {
  JS: false,
  TS: true,
  GO: false
};
export default function CheckboxDemo() {
  const [checkboxValues, setCheckboxValues] = useState(defaultValues);
  let temp = [];

  useEffect(() => {
    temp.push();
    temp.push(checkboxValues);
  }, [checkboxValues]);
  console.log("temp:", temp);
  // console.log("checkboxValues: ", checkboxValues);
  return (
    <div className="App">
      <h3>Hello CodeSandbox</h3>
      <input type="checkbox" checked={checkboxValues.JS}
        onChange={(e) => {
          setCheckboxValues({ ...checkboxValues, JS: !checkboxValues.JS });
        }}
      />
      JS
      <br />
      <input type="checkbox" checked={checkboxValues.TS}
        onChange={(e) => {
          setCheckboxValues({ ...checkboxValues, TS: !checkboxValues.TS });
        }}
      />
      TS
      <br />
      <input type="checkbox" checked={checkboxValues.GO}
        onChange={(e) => {
          setCheckboxValues({ ...checkboxValues, GO: !checkboxValues.GO });
        }}
      />
      GO
      <br />
    </div>
  );
}
