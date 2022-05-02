import React from 'react';
import styled from '@emotion/styled';
import { IonIcon } from 'react-svg-ionicons';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <BottomNav className="bottomNav">
      <Wrapper className="wrapper">
        <NavItem className="navItem">
          <NavLink to="/">
            <IonIcon
              className="bottomNavIcon"
              name="home"
              fontSize="20px"
              color="#b1b1b1"
            />
            <span className="bottomNavLabel">首页</span>
          </NavLink>
        </NavItem>
        <NavItem className="navItem">
          <NavLink to="/stats">
            <IonIcon
              className="bottomNavIcon"
              name="stats"
              fontSize="20px"
              color="#b1b1b1"
            />
            <span className="bottomNavLabel">图表</span>
          </NavLink>
        </NavItem>
        <NavItem className="navItem">
          <NavLink to="/create">
            <IonIcon
              className="bottomNavIcon"
              name="add-circle"
              fontSize="40px"
              color="#a3c7be"
            />
          </NavLink>
        </NavItem>

        <NavItem className="navItem">
          <NavLink to="/map">
            <IonIcon
              className="bottomNavIcon"
              name="map"
              fontSize="20px"
              color="#b1b1b1"
            />
            <span className="bottomNavLabel">地图</span>
          </NavLink>
        </NavItem>
        <NavItem className="navItem">
          <NavLink to="/map">
            <IonIcon
              className="bottomNavIcon"
              name="more"
              fontSize="20px"
              color="#b1b1b1"
            />
            <span className="bottomNavLabel">更多</span>
          </NavLink>
        </NavItem>
      </Wrapper>
    </BottomNav>
  );
}

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 1110px;
  height: 60px;
  border-top: #b7b7b7 1px solid;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.ul`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  justify-content: space-around;
`;

const NavItem = styled.li`
  flex: 1;
  outline: 0;
  &:focus {
    a {
      background-color: #f0f5ff;
      border: 2px solid rgb(61, 85, 221);
    }
  }

  &.clicked {
    a {
      background-color: transparent;
      border: 2px solid transparent;

      &:hover {
        background-color: #f0f5ff;
      }
    }
  }
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
  text-decoration: none;
  &:hover {
    color: inherit;
    background-color: #f0f5ff;
  }

  &:focus {
    background-color: #f0f5ff;
    border: 2px solid rgb(61, 85, 221);
  }
`;
