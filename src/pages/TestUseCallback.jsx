import React from 'react';

export default function TestUseCallback() {
  // function CountButton({ label, onClick, count }) {
  //   console.log(label + ' rerender')
  //   return <button onClick={onClick}>{count}</button>;
  // }

  const CountButton = React.memo(function CountButton({
    label,
    onClick,
    count,
  }) {
    console.log(label + ' rerender');
    return <button onClick={onClick}>{count}</button>;
  });

  function DualCounter() {
    const [count1, setCount1] = React.useState(0);
    const increment1 = React.useCallback(() => setCount1((c) => c + 1), []);

    const [count2, setCount2] = React.useState(0);
    const increment2 = React.useCallback(() => setCount2((c) => c + 1), []);

    return (
      <>
        <CountButton label="CountButton1" count={count1} onClick={increment1} />
        <CountButton label="CountButton2" count={count2} onClick={increment2} />
      </>
    );
  }

  return <DualCounter></DualCounter>;
}
