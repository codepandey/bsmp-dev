import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import Homepage from "../HomePage";
import Homepage2 from "../HomePage2";
import AboutPage from "../AboutPage";
import ShopPage from "../ShopPage";
import ProductDetailsPage from "../ProductDetailsPage";
import CheckoutPage from "../CheckoutPage";
import OrderRecived from "../OrderRecived";
import CartPage from "../CartPage";
import WishlistPage from "../WishlistPage";
import OrderHistory from "../OrderHistory";
import ProjectSinglePage from "../ProjectSinglePage";
import ProjectPage from "../ProjectPage";
import BlogPage from "../BlogPage";
import BlogPageLeft from "../BlogPageLeft";
import BlogPageFullwidth from "../BlogPageFullwidth";
import BlogDetails from "../BlogDetails";
import BlogDetailsLeftSiide from "../BlogDetailsLeftSiide";
import BlogDetailsFull from "../BlogDetailsFull";
import ErrorPage from "../ErrorPage";
import ContactPage from "../ContactPage";
import LoginPage from "../LoginPage";
import SignUpPage from "../SignUpPage";
import ForgotPassword from "../ForgotPassword";
import VacationSetupPage from "../VacationSetupPage";
import MySubscription from "../MySubscription";
import AuthenticatedRoute from "../../config/AuthenticatedRoute";
import UnauthenticatedRoute from "../../config/UnAuthenticatedRoute";
import { AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";

const AllRoute = () => {
  // const location = useLocation();
  // console.log(location);
  return (
    <div className="App">
      <Router>
        {/* <Navbar hClass={"header-style-1"} /> */}
        <SwitchRoute />
      </Router>
    </div>
  );
};

const SwitchRoute = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && (
        <Navbar location={location.pathname} hClass={"header-style-1"} />
      )}
      {/* <AnimatePresence exitBeforeEnter> */}
      <Switch key={location.pathname} location={location}>
        <Route exact path="/" component={Homepage} />
        <Route path="/home" component={Homepage} />       
        <Route path="/home2" component={Homepage2} />
        <Route path="/about" component={AboutPage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/product-single/:id" component={ProductDetailsPage} />
        <Route
          path="/checkout"
          component={() => (
            <AuthenticatedRoute>
              <CheckoutPage />
            </AuthenticatedRoute>
          )}
        />
        <Route path="/order_received" component={OrderRecived} />
        <Route path="/cart" component={CartPage} />
        <Route path="/wishlist" component={WishlistPage} />
        <Route
          path="/order-history"
          component={() => (
            <AuthenticatedRoute>
              <OrderHistory />
            </AuthenticatedRoute>
          )}
        />
        {/* <Route path="/project-single" component={ProjectSinglePage} /> */}
        <Route path="/subscription" component={ProjectPage} />
        <Route
          path="/my-subscription"
          component={() => (
            <AuthenticatedRoute>
              <MySubscription />
            </AuthenticatedRoute>
          )}
        />
        {/* <Route path="/404" component={ErrorPage} /> */}
        <Route path="/contact" component={ContactPage} />
        {/* <Route path="/blog" component={BlogPage} /> */}
        {/* <Route path="/blog-left-sidebar" component={BlogPageLeft} /> */}
        {/* <Route path="/blog-fullwidth" component={BlogPageFullwidth} /> */}
        {/* <Route path="/blog-single/:id" component={BlogDetails} /> */}
        {/* <Route
            path="/blog-single-left-sidebar/:id"
            component={BlogDetailsLeftSiide}
          />
          <Route
            path="/blog-single-fullwidth/:id"
            component={BlogDetailsFull}
          /> */}
        <Route
          path="/login"
          component={() => (
            <UnauthenticatedRoute>
              <LoginPage />
            </UnauthenticatedRoute>
          )}
        />
        <Route path="/register" component={SignUpPage} />
        {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
        <Route
          path="/setup-vacation"
          component={() => (
            <AuthenticatedRoute>
              <VacationSetupPage />
            </AuthenticatedRoute>
          )}
        />
      </Switch>
      {/* </AnimatePresence> */}
    </>
  );
};

export default AllRoute;
