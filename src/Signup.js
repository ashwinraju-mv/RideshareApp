import { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const [firstname, firstnamechange] = useState("");
  const [lastname, lastnamechange] = useState("");
  const [phonenumber, phonenumberchange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [role, rolechange] = useState("");
  const [licencenumber, licencenumberchange] = useState("");

  const Validate = () => {
    let isproceed = true;
    let errormessage = "Mandatory Field(s) are to be filled:\n";

    if (firstname === null || firstname.trim() === "") {
      isproceed = false;
      errormessage += "\nFirst Name;";
    }
    if (lastname === null || lastname.trim() === "") {
      isproceed = false;
      errormessage += "\nLast Name;";
    }
    if (phonenumber === null || phonenumber.trim() === "") {
      isproceed = false;
      errormessage += "\nPhone Number;";
    }
    if (email === null || email.trim() === "") {
      isproceed = false;
      errormessage += "\nEmail ID;";
    }
    if (password === null || password.trim() === "") {
      isproceed = false;
      errormessage += "\nPassword";
    } else if (password.trim().length < 8) {
      isproceed = false;
      errormessage += "\nPassword should be at least 8 characters long";
    } else if (!/[A-Z]/.test(password)) {
      isproceed = false;
      errormessage += "\nPassword should contain at least one uppercase letter";
    }
    if (role === "driver" && (licencenumber === "" || licencenumber.trim() === "")) {
        isproceed = false;
        errormessage += "\nLicense Number";
      }
  
    if (!isproceed) {
      toast.warning(errormessage);
    }
    return isproceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let signupobj = { firstname, lastname, phonenumber, email, password };
    if (Validate()) {
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(signupobj),
      })
        .then((res) => {
          toast.success("Registered successfully.");
        })
        .catch((err) => {
          toast.error("Failed:" + err.message);
        });
    }
  };

  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>RideShare-SignUp</h1>
              <p>Please provide the required information below:</p>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <div>
                      <label>
                        First Name<span className="errmsg">*</span>
                      </label>
                      <input
                        value={firstname}
                        onChange={(e) => firstnamechange(e.target.value)}
                        type="text"
                        className="form-control"
                      ></input>
                    </div>
                    <div>
                      <label>
                        Last Name<span className="errmsg">*</span>
                      </label>
                      <input
                        value={lastname}
                        onChange={(e) => lastnamechange(e.target.value)}
                        type="text"
                        className="form-control"
                      ></input>
                    </div>

                    <div>
                      <label>Role:</label>
                      <select
                        value={role}
                        onChange={(e) => rolechange (e.target.value)}
                        className="form-control"
                      >
                        <option value="passenger">Passenger</option>
                        <option value="driver">Driver</option>
                      </select>
                    </div>
                    {role === "driver" && (
                      <div>
                        <label>
                          License Number<span className="errmsg">*</span>
                        </label>
                        <input
                          value={licencenumber}
                          onChange={(e) => licencenumberchange (e.target.value)}
                          type="text"
                          className="form-control"
                        ></input>
                      </div>
                    )}
                    <div>
                      <label>
                        Phone Number<span className="errmsg">*</span>
                      </label>
                      <input
                        value={phonenumber}
                        onChange={(e) => phonenumberchange(e.target.value)}
                        type="tel"
                        className="form-control"
                      ></input>
                    </div>
                    <div>
                      <label>
                        Email ID<span className="errmsg">*</span>
                      </label>
                      <input
                        value={email}
                        onChange={(e) => emailchange(e.target.value)}
                        type="email"
                        className="form-control"
                      ></input>
                    </div>
                    <div>
                      <label>
                        Password<span className="errmsg">*</span>
                      </label>
                      <input
                        value={password}
                        onChange={(e) => passwordchange(e.target.value)}
                        type="password"
                        className="form-control"
                      ></input>
                    </div>
                    {password.trim().length > 0 && (
                      <div>
                        {password.trim().length < 8 && (
                          <ul>
                            <li>
                              Password length should be at least 8 characters
                              long
                            </li>
                          </ul>
                        )}
                        {!/[A-Z]/.test(password) && (
                          <ul>
                            <li>
                              Password should contain at least one uppercase
                              letter
                            </li>
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                SignUp
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
