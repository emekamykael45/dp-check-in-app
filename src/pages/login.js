import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Logo from "../components/logo";
import FormInput from "../components/form-input";
import Button from "../components/button";

import { loginUserAction } from "../api";

import {
  getUserDetails,
  emailFormValidation,
  passwordFormValidation,
} from "../utils/functions";

import { eye, eyeSlash } from "../assets/img";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = getUserDetails();

  useEffect(() => {
    window.scroll(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = async (data) => {
    setIsSubmitting(true);
    await loginUserAction(data);
    setIsSubmitting(false);
  };

  if (user?.uid && !isSubmitting) return <>{window.location.assign("/home")}</>;

  return (
    <div className="page_container login_page">
      <div className="form_container">
        <form className="form">
          <Logo />

          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            readOnly={isSubmitting}
            errorMessage={errors?.email?.message}
            inputRef={{
              ...register("email", emailFormValidation(true)),
            }}
          />
          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            readOnly={isSubmitting}
            errorMessage={errors?.password?.message}
            inputRef={{
              ...register("password", passwordFormValidation(true)),
            }}
            icon={showPassword ? eyeSlash : eye}
            iconClick={() => setShowPassword(!showPassword)}
          />

          <div className="actions">
            <Button
              text="Login"
              type="submit"
              onClick={handleSubmit((data) => submitForm(data))}
              loading={isSubmitting}
              disabled={!isValid || isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
