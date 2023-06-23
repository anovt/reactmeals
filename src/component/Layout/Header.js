import { Fragment } from "react";
import  MealsLogo  from "../../assets/meals.jpg";
import classes  from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
      </header>

      <div>
        <img src={MealsLogo} alt="logo" className={classes['main-image']}></img>
      </div>
    </Fragment>
  );
};

export default Header;
