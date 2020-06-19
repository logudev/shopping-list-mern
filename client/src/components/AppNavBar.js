import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  NavbarBrand,
} from "reactstrap";

export const AppNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    console.log("Hamburger clicked");
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand>Shopping List</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto">
              <NavItem>
                <NavLink
                  href="https://github.com/logudev/shopping-list-mern"
                  target="_blank"
                >
                  Github
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
