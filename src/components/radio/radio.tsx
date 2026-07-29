'use client';

import { useRadio, useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';
import { createContext, useContext, useRef } from 'react';

const RadioContext = createContext(null);

export function RadioGroup(props) {
  const { children, label, description, errorMessage, validationState } = props;
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps, descriptionProps, errorMessageProps } =
    useRadioGroup(props, state);

  return (
    <div {...radioGroupProps} className="my-2">
      <span
        {...labelProps}
        className="font-semibold text-slate-800 dark:text-slate-200"
      >
        {label}
      </span>
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
      {description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {description}
        </div>
      )}
      {errorMessage && validationState === 'invalid' && (
        <div {...errorMessageProps} style={{ color: 'red', fontSize: 12 }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export function Radio(props) {
  const { children } = props;
  const state = useContext(RadioContext);
  const ref = useRef(null);
  const { inputProps } = useRadio(props, state, ref);

  return (
    <label className="mt-2 flex items-center">
      <input {...inputProps} ref={ref} className="size-4" />
      <p className="pl-2">{children}</p>
    </label>
  );
}
