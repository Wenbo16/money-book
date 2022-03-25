/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

interface TabsProps {
  children: React.ReactNode;
  activeIndex: number;
  onTabChange: (i: number) => {};
}

export const Tabs = ({ children, activeIndex, onTabChange }: TabsProps) => {
  return (
    <ul className="nav nav-tabs nav-fill my-4">
      {React.Children.map(children, (child, index) => {
        const activeClassName =
          activeIndex === index ? 'nav-link active' : 'nav-link';
        return (
          <li className="nav-item">
            <a
              href="#"
              className={activeClassName}
              onClick={(event) => {
                onTabChange(index);
              }}
            >
              {child}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export const Tab = ({ children }: { children: React.ReactNode }) => (
  <> {children} </>
);
