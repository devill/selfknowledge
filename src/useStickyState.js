import React, {useState, useEffect} from 'react';


function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem("SelfKnowledge_" + key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    React.useEffect(() => {
      window.localStorage.setItem("SelfKnowledge_" + key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

export default useStickyState