import React, { Component } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import { Link } from "react-router-dom";
import "./style.css";

const menu = [
  {
    id: 1,
    title: "Home",
    link: "/home",
    // submenu: [
    //     {
    //         id: 11,
    //         title: 'Home style 1',
    //         link: '/home'
    //     },
    //     {
    //         id: 12,
    //         title: 'Home style 2',
    //         link: '/home2'
    //     },
    // ]
  },

  {
    id: 2,
    title: "About",
    link: "/about",
  },
  // {
  //     id: 3,
  //     title: 'Shop',
  //     link: '/shop',
  // },

  {
    id: 3,
    title: "Categories",
    link: "/",
    submenu: [
      {
        id: 31,
        title: "Dairy Products",
        link: "/shop?category=dairy_products",
      },
      {
        id: 32,
        title: "Vegetables",
        link: "/shop?category=vegetables",
      },
      {
        id: 33,
        title: "Sweets",
        link: "/shop?category=sweets",
      },

      // {
      //     id: 49,
      //     title: 'Error 404',
      //     link: '/404'
      // },
      // {
      //     id: 491,
      //     title: 'Login',
      //     link: '/login'
      // },
      // {
      //     id: 492,
      //     title: 'Register',
      //     link: '/register'
      // },
    ],
  },
  // {
  //     id: 6,
  //     title: 'Product',
  //     link: '/',
  //     submenu: [
  //         {
  //             id: 41,
  //             title: 'Product',
  //             link: '/shop'
  //         },
  //         {
  //             id: 45,
  //             title: 'Product Single',
  //             link: '/product-single/1'
  //         },

  //     ]
  // },
  {
    id: 4,
    title: "Subscription",
    link: "/",
    submenu: [
      {
        id: 41,
        title: "Prdoucts",
        link: "/subscription",
      },
      {
        id: 42,
        title: "My Subscriptions",
        link: "//my-subscription",
      },
      {
        id: 43,
        title: "Pause Subscription",
        link: "/setup-Vacation",
      },
    ],
  },

  // {
  //     id: 5,
  //     title: 'Blog',
  //     link: '/blog',
  //     // submenu: [
  //     //     {
  //     //         id: 51,
  //     //         title: 'Blog',
  //     //         link: '/blog'
  //     //     },
  //     //     {
  //     //         id: 52,
  //     //         title: 'Blog Left sidebar',
  //     //         link: '/blog-left-sidebar'
  //     //     },
  //     //     {
  //     //         id: 53,
  //     //         title: 'Blog full width',
  //     //         link: '/blog-fullwidth'
  //     //     },
  //     //     {
  //     //         id: 54,
  //     //         title: 'Blog single',
  //     //         link: '/blog-single/1'
  //     //     },
  //     //     {
  //     //         id: 55,
  //     //         title: 'Blog single Left sidebar',
  //     //         link: '/blog-single-left-sidebar/1'
  //     //     },
  //     //     {
  //     //         id: 56,
  //     //         title: 'Blog single Left sidebar',
  //     //         link: '/blog-single-fullwidth/1'
  //     //     },
  //     // ]
  // },
  {
    id: 5,
    title: "Contact",
    link: "/contact",
  },
  // {
  //     id: 9,
  //     title: 'Favourites',
  //     link: '/about',
  // },
  {
    id: 6,
    title: "Order history",
    link: "/order-history",
  },
  {
    id: 7,
    title: "Login",
    link: "/login",
  },
  {
    id: 8,
    title: "LogOut",
    // link: "/login",
    submenu: [
      {
        id: 81,
        title: "sure, LogOut",
      },
      {
        id: 82,
        title: "Go back",
      },
    ],
  },
];

export default class MobileMenu extends Component {
  state = {
    isMenuShow: false,
    isOpen: 0,
    menus: [],
  };
  componentDidMount() {
    let userLogged = localStorage.getItem("loggedUserId");
    if (userLogged) {
      let menus = menu.filter((item) => item.id !== 7);
      this.setState({ ...this.state, menus: [...menus] });
    } else {
      let menus = menu.filter((item) => item.id !== 8);
      this.setState({ ...this.state, menus: [...menus] });
    }

    window.addEventListener("storage", (e) => {
      let userLogged = localStorage.getItem("loggedUserId");
      if (userLogged) {
        let menus = menu.filter((item) => item.id !== 7);
        this.setState({ ...this.state, menus: [...menus] });
      } else {
        let menus = menu.filter((item) => item.id !== 8);
        this.setState({ ...this.state, menus: [...menus] });
      }
    });
  }
  logout() {
    const res = localStorage.removeItem("loggedUserId");
    window.dispatchEvent(new Event("storage"));
  }

  menuHandler = () => {
    this.setState({
      isMenuShow: !this.state.isMenuShow,
    });
  };

  setIsOpen = (id) => () => {
    this.setState({
      isOpen: id === this.state.isOpen ? 0 : id,
    });
  };

  render() {
    const { isMenuShow, isOpen, menus } = this.state;

    return (
      <div>
        <div className={`mobileMenu ${isMenuShow ? "show" : ""}`}>
          <div className="menu-close">
            <div className="clox" onClick={this.menuHandler}>
              <i className="ti-close"></i>
            </div>
          </div>
          <ul className="responsivemenu">
            {menus.map((item) => {
              return (
                <li key={item.id}>
                  {item.submenu ? (
                    <p onClick={this.setIsOpen(item.id)}>
                      {item.title}
                      {item.submenu && (
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                      )}
                    </p>
                  ) : item.id === 8 ? (
                    <p onClick={this.setIsOpen(item.id)}>{item.title}</p>
                  ) : (
                    <Link to={item.link}>{item.title}</Link>
                  )}
                  {item.submenu ? (
                    <Collapse isOpen={item.id === isOpen}>
                      <Card>
                        <CardBody>
                          <ul>
                            {item.submenu.map((submenu) => (
                              <li key={submenu.id}>
                                {submenu.id !== 81 && submenu.id !== 82 && (
                                  <Link
                                    className="active"
                                    onClick={this.menuHandler}
                                    to={submenu.link}
                                  >
                                    {submenu.title}
                                  </Link>
                                )}
                                {submenu.id == 81 && (
                                  <p onClick={() => this.logout()}>
                                    {submenu.title}
                                  </p>
                                )}
                                {submenu.id == 82 && (
                                  <p
                                    onClick={() => {
                                      this.menuHandler();
                                      this.setState({ isOpen: 0 });
                                    }}
                                  >
                                    {submenu.title}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </CardBody>
                      </Card>
                    </Collapse>
                  ) : (
                    ""
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="showmenu" onClick={this.menuHandler}>
          <button type="button" className="navbar-toggler open-btn">
            <span className="icon-bar first-angle"></span>
            <span className="icon-bar middle-angle"></span>
            <span className="icon-bar last-angle"></span>
          </button>
        </div>
      </div>
    );
  }
}
