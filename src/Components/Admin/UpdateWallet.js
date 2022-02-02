import React, { useState, useEffect } from "react";
import myaxios from "../utils/axios";
import { successToast } from "../utils/toast";
import Sidebar from "./Sidebar/Sidebar";

function UpdateWallet() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [balance, setBalance] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    myaxios
      .get("/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBalance = (id) => {
    setUser(id);
    myaxios
      .get(`/user/${id}`)
      .then((response) => {
        // console.log(response.data);
        setUserData(response.data);
        setBalance(response.data.balance);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    myaxios
      .put("/updateWallet", { user: user, balance: balance })
      .then((response) => {
        if (response.data.msg === "Wallet Updated") {
          successToast("Wallet Updated");
          setTimeout(() => {
            window.location = "/admin/updatewallet";
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(userData);
  const renderUsers = users.map((user) =>
    user.role !== "admin" ? <option value={user._id}>{user.regNo}</option> : ""
  );
  return (
    <Sidebar>
      <div className="my-5 mx-5 p-4">
        <div className="row">
          <div className="col"><h5>UPDATE WALLET</h5>
            <form>
              <div className="my-3">
                <label className="d-block fw-bold my-1">Reg No</label>
                <select
                  className="form-control"
                  onChange={(e) => handleBalance(e.target.value)}
                  name="regNo"
                  required
                >
                  {renderUsers}
                </select>
                <div className="my-3">
                  <label className="d-block fw-bold my-1">Quantity</label>
                  <input
                    className="form-control"
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    name="balance"
                    required
                  />
                </div>
              </div>
              <button
                className="btn bg-primary text-white fw-bold my-3"
                onClick={(e) => handleSubmit(e)}
              >
                Update Wallet
              </button>
            </form></div>
          <div className="col">{userData ? <table class="table border rounded table-bordered table-info table-striped">
            {/* <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead> */}
            <tbody>
              <tr>
                <td>Student Name</td>
                <td>
                  {userData.name ? userData.name : "unknown"}
                </td>
              </tr>
              <tr>
                <td>Student Depatment</td>
                <td>
                  {userData.dept ? userData.dept : "unknown"}
                </td>
              </tr>
              <tr>
                <td>Account balance</td>
                <td>
                  {userData.dept ? userData.balance : "unknown"}
                </td>
              </tr>
              <tr>
                <td>Reg No</td>
                <td>
                  {userData.regNo ? userData.regNo : "unknown"}
                </td>
              </tr>
            </tbody>
          </table> : null}</div>
        </div>

      </div>
    </Sidebar>
  );
}

export default UpdateWallet;
