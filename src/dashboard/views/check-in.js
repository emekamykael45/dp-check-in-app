import React, { useState } from "react";

import NavBar from "../../components/navbar";
import Logo from "../../components/logo";
import FormInput from "../../components/form-input";
import Button from "../../components/button";
import { check } from "../../assets/img";

const CheckinPage = () => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckIn = async () => {
    setIsSubmitting(true);

    setStep(2);

    setIsSubmitting(false);
  };

  const isDisabled = code?.length < 4 || code?.length > 4 || isSubmitting;

  return (
    <React.Fragment>
      <NavBar />

      <div className="page_container checkin_page_container">
        <Logo />

        {step === 1 && (
          <div className="form_container">
            <p className="title">Check-in Guest</p>

            <FormInput
              placeholder="Code"
              type="text"
              onChange={(e) => setCode(e?.target?.value)}
              readOnly={isSubmitting}
            />

            <Button
              text="Check in"
              onClick={handleCheckIn}
              disabled={isDisabled}
            />
          </div>
        )}

        {step === 2 && (
          <div className="form_container success">
            <img src={check} alt="" />
            <p className="title">Guest check-in successful!</p>

            <Button
              text="Finish"
              onClick={() => setStep(1)}
              disabled={isSubmitting}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default CheckinPage;
