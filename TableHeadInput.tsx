import React, {type ChangeEvent, useState, useEffect} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import type {TableHeadInputProps} from './types';
import {NewInput} from '../NewInput';

export {type TableHeadInputProps};

export function TableHeadInput({debounceInterval = 600, value = '', onChange, ...props}: TableHeadInputProps) {
  const [inputValue, setInputValue] = useState(value);

  const onChangeDebounced = useDebouncedCallback((debounced: string) => {
    onChange?.(debounced);
  }, debounceInterval);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeDebounced(e.target.value);
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return <NewInput size="s" value={inputValue} variant="table" onChange={handleChange} {...props} />;
}
