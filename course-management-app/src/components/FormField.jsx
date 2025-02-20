import React from "react";
import { Field, ErrorMessage } from "formik";

const FormField = ({ label, name, type, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-lg font-semi-bold mt-[10px]">
        {label}
      </label>
      <Field
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="w-full h-[40px] border-1 border-[#000] pl-2 mt-2 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#1d314e] focus:border-transparent"
      />
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default FormField;
