import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types'
import { padLeft, range } from '../../utility'

const MonthPicker = ({year, month, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(year);

    const monthRange = range(12, 1)
    const yearRange = range(9, -4).map(number => number + year)
    const monthPickerEl = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClick, false)
        return () => {
            document.removeEventListener('click', handleClick, false)
        };
    });

    const handleClick = (event) => {
        if (monthPickerEl.current.contains(event.target)) {
          return;
        }
        setIsOpen(false);
    }

    const toggleDropdown = (event) => {
        event.preventDefault()
        setIsOpen(!isOpen)
    }

    const selectYear = (event, yearNumber) => {
        event.preventDefault()
        setSelectedYear(yearNumber)
    }

    const selectMonth = (event, monthNumber) => {
        event.preventDefault()
        setIsOpen(false)
        onChange(selectedYear, monthNumber)
    }

    return (
        <div className="dropdown month-picker-component" ref={monthPickerEl}>
          <p>选择月份</p>
          <button 
            className="btn btn-lg btn-secondary dropdown-toggle"
            onClick={toggleDropdown}
          >
            {`${year}年 ${padLeft(month)}月`}
          </button>
          { isOpen && 
            <div className="dropdown-menu" style={{display: 'block'}}>
              <div className="row">
                <div className="col border-right years-range">
                  { yearRange.map((yearNumber, index) => 
                    <a key={index}
                      role="button"
                      onClick={(event) => {selectYear(event, yearNumber)}} 
                      className={(yearNumber === selectedYear) ? "dropdown-item active text-white" : "dropdown-item"}>
                      {yearNumber} 年
                    </a>  
                  )}
                </div>
                <div className="col months-range">
                { monthRange.map((monthNumber, index) => 
                    <a key={index}
                      role="button"
                      onClick={(event) => {selectMonth(event, monthNumber)}}
                      className={(monthNumber === month) ? "dropdown-item active text-white": "dropdown-item"}>
                      {padLeft(monthNumber)} 月
                    </a>
                  )}
                </div>
              </div>
            </div>
          }
        </div>
      )

}


MonthPicker.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default MonthPicker