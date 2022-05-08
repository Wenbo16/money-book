/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from 'react';
import { makeMonthDoubleDigit, range } from '../../utils/utility';

interface MonthPickerProps {
  year: number;
  month: number;
  onChange: (year: number, month: number) => {};
}

const MonthPicker = ({ year, month, onChange }: MonthPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(year);

  const monthRange = range(12, 1);
  const yearRange = range(9, -4).map((number) => number + year);
  const monthPickerEl = useRef<any>(null);

  // 点击下拉外部也可以关闭
  useEffect(() => {
    document.addEventListener('click', onClickOutsideSpace, false);
    return () => {
      document.removeEventListener('click', onClickOutsideSpace, false);
    };
  });

  const onClickOutsideSpace = (event: any) => {
    if (monthPickerEl?.current?.contains(event.target)) {
      return;
    }
    setIsOpen(false);
  };

  const selectYear = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    yearNumber: number
  ) => {
    event.preventDefault();
    setSelectedYear(yearNumber);
  };

  const selectMonth = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    monthNumber: number
  ) => {
    event.preventDefault();
    setIsOpen(false);
    onChange(selectedYear, monthNumber);
  };

  return (
    <div className="dropdown month-picker-component" ref={monthPickerEl}>
      <p>选择月份</p>
      <button
        className="btn btn-lg btn-secondary dropdown-toggle"
        onClick={(event) => {
          event.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        {`${year}年 ${makeMonthDoubleDigit(month)}月`}
      </button>
      {isOpen && (
        <div className="dropdown-menu" style={{ display: 'block' }}>
          <div className="row">
            <div className="col border-right years-range">
              {yearRange.map((yearNumber, index) => (
                <a
                  key={index}
                  role="button"
                  onClick={(event) => {
                    selectYear(event, yearNumber);
                  }}
                  className={
                    yearNumber === selectedYear
                      ? 'dropdown-item active text-white'
                      : 'dropdown-item'
                  }
                >
                  {yearNumber} 年
                </a>
              ))}
            </div>
            <div className="col months-range">
              {monthRange.map((monthNumber, index) => (
                <a
                  key={index}
                  role="button"
                  onClick={(event) => {
                    selectMonth(event, monthNumber);
                  }}
                  className={
                    monthNumber === month
                      ? 'dropdown-item active text-white'
                      : 'dropdown-item'
                  }
                >
                  {makeMonthDoubleDigit(monthNumber)} 月
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthPicker;
