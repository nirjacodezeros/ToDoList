import axios from "axios";
import { useState } from "react";

let defaultValues = {
  Apple: false,
  Banana: false,
  Tea: false,
  Coffee: false,
};

export default function NewFormDemo() {
  const [sample, setSample] = useState([defaultValues]);
  const [formData, setFormData] = useState({ sample });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("formdata:", formData);
    axios
      .post("https://jsonplaceholder.typicode.com/posts", formdata)
      .then((response) => {
        console.log("r.......", response);
        navigate("/");
      })
      .catch((err) => {
        console.log("err.......", err);
      });
  }
  return (
    <div className="App">
      <h3>Hello CodeSandbox</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">Firstname:</label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, firstname: e.target.value });
              }}
              type="text"
              name="firstname"
              placeholder="Firstname"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="lastname">Lastname:</label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, lastname: e.target.value });
              }}
              type="text"
              name="lastname"
              placeholder="Lastname"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <select
              name="country"
              onChange={(e) => {
                setFormData({ ...formData, country: e.target.value });
              }}
            >
              <option value=""></option>
              <option value="india">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="canada">Canada</option>
            </select>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <label className="form-check-label">
              <input
                type="radio"
                name="status"
                value="Active"
                onChange={(e) => {
                  setFormData({ ...formData, status: e.target.value });
                }}
                checked
              />
              Active
            </label>
            <label htmlFor="status" className="form-check-label">
              <input
                type="radio"
                name="status"
                value="Inactive"
                onChange={(e) => {
                  setFormData({ ...formData, status: e.target.value });
                }}
              />
              Inactive
            </label>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="checkitem">CheckBox:</label>
            {sample.map((ele, index) => {
              return (
                <>
                  {Object.keys(ele).map((key) => {
                    return (
                      <>
                        <input
                          type="checkbox"
                          checked={ele[key]}
                          onChange={(e) => {
                            var temp = [...sample];
                            temp.map((ele) => {
                              ele[key] = !ele[key];
                            });
                            setSample(temp);
                          }}
                        />
                        {key}
                        <br />
                      </>
                    );
                  })}
                  <br />
                </>
              );
            })}
          </div>
          <div>
            <input
              type="file"
              name="image"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  image: URL.createObjectURL(e.target.files[0]),
                });
              }}
            />
            <img src={formData.image} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
