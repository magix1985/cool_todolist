import React from 'react';
import s from './Header.module.css'

const Header = (aaa) => {
  return (
    <header className={s.main}>
      {aaa.children}
    </header>
  );
}

export default Header;
