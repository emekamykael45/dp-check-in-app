import React, { useState } from "react";

import NavBar from "../../components/navbar";
import Logo from "../../components/logo";
import FormInput from "../../components/form-input";
import Button from "../../components/button";

import { getGuestsAction, checkInGuestAction } from "../../api";

import { check } from "../../assets/img";

const CheckinPage = () => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [checkIn, setCheckIn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckIn = async (checkInValue) => {
    setIsSubmitting(true);

    await getGuestsAction({
      searchInput: code?.toLowerCase(),
    }).then((res) => {
      if (res?.guests?.data?.length > 0) {
        handleCheckInGuest({
          id: res?.guests?.data[0]?.id,
          data: {
            checked_in: checkInValue,
          },
        });
        setCheckIn(checkInValue);
      } else {
        setIsSubmitting(false);
      }
    });
  };

  const handleCheckInGuest = async (data) => {
    await checkInGuestAction(data).then((res) => {
      res.success === true && setStep(2);
    });

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setCode("");
    setStep(1);
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

            <div className="actions">
              <Button
                text="Check in"
                onClick={() => handleCheckIn(true)}
                disabled={isDisabled}
              />

              <Button
                className="btn_text"
                text="Check out"
                onClick={() => handleCheckIn(false)}
                disabled={isDisabled}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form_container success">
            <img src={check} alt="" />
            <p className="title">
              Guest {checkIn ? "check-in" : "check out"} successful!
            </p>

            <Button text="Finish" onClick={resetForm} disabled={isSubmitting} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default CheckinPage;
