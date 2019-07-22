import { useRef, useEffect } from 'react';

const useConsoleLog = (value, name) => {
  const ref = useRef();

  useEffect(() => {
    console.log(`${name} changed from ${ref.current} to ${value}`);

    ref.current = value;
  }, [value]);
};

export default useConsoleLog;
