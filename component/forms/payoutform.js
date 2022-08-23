//
import { Button } from "antd";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/index";
import axios from "axios";
import { toast } from "react-toastify";

//

//

const payout = () => {
  const userDetails = {};

  const [bankDetails, setBankDetails] = useState({
    name: "",
    email: "",
    accountType: "",
    accountNumber: "",
    bankName: "",
  });
  const handleBankDetails = (p) => {
    setBankDetails({ ...bankDetails, [p.target.name]: p.target.value });
  };

  const handleSubmitDetails = async (p) => {
    //
    p.preventDefault();
    try {
      const { data } = await axios.post("/api/payout", bankDetails);

      toast(bankDetails.name);
      toast(data);
      window.location.href = "/payhedo/callback";
    } catch (err) {
      toast(err.response.data);
    }
  };

  useEffect((p) => {
    userDetails = JSON.parse(window.localStorage.getItem("user"));
    setBankDetails({
      ...bankDetails,
      name: userDetails.name,
      email: userDetails.email,
    });
  }, []);
  return (
    <>
      <>
        <div className="bg-dnager ">
          <form onSubmit={handleSubmitDetails} className="form-group">
            <input
              type="text"
              name="name"
              className="form-control mb-2  "
              placeholder="Name"
              value={bankDetails.name}
              onChange={handleBankDetails}
              disabled
            />
            <input
              type="email"
              disabled
              name="email"
              className="form-control mb-2  "
              placeholder="Email"
              value={bankDetails.email}
              onChange={handleBankDetails}
            />

            <input
              type="text"
              name="accountType"
              className="form-control mb-2  "
              placeholder="Account Type"
              value={bankDetails.accountType}
              onChange={handleBankDetails}
            />

            <input
              type="text"
              name="accountNumber"
              className="form-control mb-2  "
              placeholder="Account Number"
              value={bankDetails.accountNumber}
              onChange={handleBankDetails}
            />

            <input
              type="text"
              name="bankName"
              className="form-control mb-2  "
              placeholder="Bank Name"
              value={bankDetails.bankName}
              onChange={handleBankDetails}
            />

            <button
              className="ant-btn btn-primary  ant-btn-block mb-2  "
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </>
    </>
  );
};

export default payout;
