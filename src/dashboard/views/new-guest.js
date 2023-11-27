import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import NavBar from "../../components/navbar";
import Logo from "../../components/logo";
import FormInput from "../../components/form-input";
import Button from "../../components/button";

import { check } from "../../assets/img";

// import { loginUserAction } from "../../api";

import {
  textFormValidation,
  numberFormValidation,
} from "../../utils/functions";

const NewGuestPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const history = useHistory();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (data) => {
    setIsSubmitting(true);

    console.log(data);
    setStep(2);

    setIsSubmitting(false);
  };

  return (
    <React.Fragment>
      <NavBar />

      <div className="page_container add_guest_page_container">
        <Logo />

        {step === 1 && (
          <div className="form_container">
            <form className="form">
              <p className="title">Add New Guest</p>

              <FormInput
                type="text"
                placeholder="Enter full name"
                readOnly={isSubmitting}
                errorMessage={errors?.name?.message}
                inputRef={{
                  ...register("name", textFormValidation(true)),
                }}
              />
              <FormInput
                type="number"
                placeholder="Enter phone number"
                readOnly={isSubmitting}
                errorMessage={errors?.phone?.message}
                inputRef={{
                  ...register("phone", numberFormValidation(true, 8, 11)),
                }}
              />

              <div className="actions">
                <Button
                  text="Add guest"
                  type="submit"
                  onClick={handleSubmit((data) => submitForm(data))}
                  loading={isSubmitting}
                  disabled={!isValid || isSubmitting}
                />
                <Button
                  className="btn_text"
                  text="Cancel"
                  onClick={() => history.push("/guests")}
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="form_container success">
            <img src={check} alt="" />
            <p className="title">Registration successful!</p>

            <div className="code_block">
              <p className="label">Code:</p>
              <p className="value">C98P</p>
            </div>

            <Button
              text="Finish"
              onClick={() => history.push("/guests")}
              disabled={isSubmitting}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default NewGuestPage;
