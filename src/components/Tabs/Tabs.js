import React, {useState} from 'react'
import PropTypes from 'prop-types'

export const Tabs = ({ children, activeIndex, onTabChange }) => {
    return (
        <ul className="nav nav-tabs nav-fill my-4">
            {React.Children.map(children, (child, index) => {
                const activeClassName = ( activeIndex === index) ? 'nav-link active' : 'nav-link'
                return (
                    <li className="nav-item">
                        <a
                            href="#"
                            className={activeClassName}
                            onClick={(event) => {onTabChange(index)}}  
                        >
                            {child}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}

Tabs.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    onTabChange: PropTypes.func.isRequired,
}

export const Tab = ({ children }) => <> {children} </>