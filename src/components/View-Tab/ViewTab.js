import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';
import { LIST_VIEW, CHART_VIEW } from '../../utility';

const generateLinkClass = (current, view) => {
  return current === view ? 'nav-link active' : 'nav-link';
};
const ViewTab = ({ activeTab, onTabChange }) => (
  <ul className="nav nav-tabs nav-fill my-4">
    <li className="nav-item">
      <a
        className={generateLinkClass(activeTab, LIST_VIEW)}
        href="#"
        onClick={(event) => {
          onTabChange(LIST_VIEW);
        }}
      ></a>
    </li>
  </ul>
);

ViewTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};
export default ViewTab;
