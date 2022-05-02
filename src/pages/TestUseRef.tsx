import React, { useRef, useState, useLayoutEffect } from 'react';

export default function TestUseRef() {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(count);

  const onClickHandler = () => {
    setTimeout(() => {
      alert('latest: ' + countRef.current);
    }, 2000);
  };

  useLayoutEffect(() => {
    countRef.current = count;
  });

  return (
    <div>
      <p>count: {count}</p>
      <p>countRef: {countRef.current}</p>
      <button onClick={() => setCount((count) => count + 1)}>Click me</button>
      <button onClick={onClickHandler}>Alert</button>
    </div>
  );
}
