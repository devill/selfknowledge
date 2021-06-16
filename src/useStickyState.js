import {useState} from 'react';


function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
      const stickyValue = window.localStorage.getItem("SelfKnowledge_" + key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    return [value, (newValue) => {
      window.localStorage.setItem("SelfKnowledge_" + key, JSON.stringify(newValue));
      return setValue(newValue);
    }];
}

export default useStickyState