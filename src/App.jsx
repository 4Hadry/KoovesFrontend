import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import ProductDetail from "./pages/ProductDetail";
import Shipping from "./pages/Shipping";
import Loader from "./pages/Loader";
import Orders from "./pages/Orders.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import { userExist, userNotExist } from "./redux/reducer/userReducer.js";
import { getUser } from "./redux/api/userApi.js";
import ProtectedRoutes from "./components/ProtectRoutes.jsx";

// Pages
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
// const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const CheckOut = lazy(() => import("./pages/CheckOut.jsx"));

// Dashboard Routes

const Dashboard = lazy(() => import("./pages/admin/dashboard.jsx"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
// const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
// const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
// const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(() =>
  import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(() =>
  import("./pages/admin/management/transactionmanagement")
);

const App = () => {
  const { user, loading } = useSelector((state) => {
    return state.userReducer;
  });
  console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log(user);
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        dispatch(userNotExist());
      }
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <BrowserRouter>
        <Navbar user={user} />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route
              path="/login"
              element={
                <ProtectedRoutes isAuthenticated={user ? false : true}>
                  <SignUp />
                </ProtectedRoutes>
              }
            />
            <Route path="/productDtails" element={<ProductDetail />} />
            {/* Logged In Roures  */}
            <Route
              element={
                <ProtectedRoutes isAuthenticated={user ? true : false} />
              }
            >
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/pay" element={<CheckOut />} />
              <Route path="/order" element={<Orders />} />
            </Route>
            // Admin routes
            <Route
              element={
                <ProtectedRoutes
                  isAuthenticated={true}
                  adminOnly={true}
                  admin={user?.role === "admin" ? true : false}
                />
              }
            >
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/product" element={<Products />} />
              <Route path="/admin/customer" element={<Customers />} />
              <Route path="/admin/transaction" element={<Transaction />} />
              {/* Charts */}
              <Route path="/admin/chart/bar" element={<Barcharts />} />
              <Route path="/admin/chart/pie" element={<Piecharts />} />
              <Route path="/admin/chart/line" element={<Linecharts />} />
              {/* Apps */}
              {/* <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} /> */}

              {/* Management */}
              <Route path="/admin/product/new" element={<NewProduct />} />

              <Route
                path="/admin/product/:id"
                element={<ProductManagement />}
              />

              <Route
                path="/admin/transaction/:id"
                element={<TransactionManagement />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
