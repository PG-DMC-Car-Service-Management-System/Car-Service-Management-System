
import React from "react";
import { NavLink, useLocation, Navigate, Routes, Route } from "react-router-dom";

import ServicesPage from "./pages/ServicesPage.jsx";
import CustomersPage from "./pages/CustomersPage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import CreateBookingPage from "./pages/CreateBookingPage.jsx";
import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx";

export default function App() {
  const location = useLocation();

  const hideNavPaths = ["/login", "/registration"];
  const shouldHideNav = hideNavPaths.includes(location.pathname);

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div>
      {!shouldHideNav && (
        <nav className="nav">
          <div className="nav-inner">
            <strong>Car Service</strong>
            {/* <NavLink to="/" end>Services</NavLink> */}
            <NavLink to="/services" end>Services</NavLink>
            <NavLink to="/customers">Customers</NavLink>
            <NavLink to="/bookings">Bookings</NavLink>
            <NavLink to="/bookings/new">New Booking</NavLink>
          </div>
        </nav>
      )}
      <main className="container">
        <Routes>
          {/* Default route: redirect to login if not logged in, else to services */}
          <Route path="/" element={<Navigate to={isLoggedIn ? "/services" : "/login"} replace />} />

          <Route path="/login" element={isLoggedIn ? <Navigate to="/services" replace /> : <Login />} />
          <Route path="/registration" element={isLoggedIn ? <Navigate to="/services" replace /> : <Registration />} />

          <Route path="/services" element={isLoggedIn ? <ServicesPage /> : <Navigate to="/login" replace />} />
          <Route path="/customers" element={isLoggedIn ? <CustomersPage /> : <Navigate to="/login" replace />} />
          <Route path="/bookings" element={isLoggedIn ? <BookingsPage /> : <Navigate to="/login" replace />} />
          <Route path="/bookings/new" element={isLoggedIn ? <CreateBookingPage /> : <Navigate to="/login" replace />} />
        
        </Routes>
      </main>
    </div>
  );
}



// import React from "react"
// import { NavLink, useLocation, Navigate, Routes, Route, BrowserRouter as Router } from "react-router-dom";

// import ServicesPage from "./pages/ServicesPage.jsx"
// import CustomersPage from "./pages/CustomersPage.jsx"
// import BookingsPage from "./pages/BookingsPage.jsx"
// import CreateBookingPage from "./pages/CreateBookingPage.jsx"
// import Login from "./components/Login.jsx"
// import Registration from "./components/Registration.jsx"

// //import { BrowserRouter as Router } from "react-router-dom";
// //const location = useLocation();
// // const hideNavPaths = ["/login", "/registration"]
// //   const shouldHideNav = hideNavPaths.includes(location.pathname)
// // const isLoggedIn = !!localStorage.getItem("token") // or "user" if you prefer


// export default function App() {

//   const location = useLocation();
//   const hideNavPaths = ["/login", "/registration"]
//   const shouldHideNav = hideNavPaths.includes(location.pathname)
  
//   const isLoggedIn = !!localStorage.getItem("token") // or "user" if you prefer

//   return (
//     <Router>
//     <div>
      
//      {!shouldHideNav && (
//         <nav className="nav">
//           <div className="nav-inner">
//             <strong>Car Service</strong>
//             <NavLink to="/" end>Services</NavLink>
//             <NavLink to="/customers">Customers</NavLink>
//             <NavLink to="/bookings">Bookings</NavLink>
//             <NavLink to="/bookings/new">New Booking</NavLink>
//           </div>
//         </nav>
//       )}
//       <main className="container">
//         <Routes>

//           {/* <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/registration" element={<Registration />} />
//            */}

//            <Route
//             path="/" element={isLoggedIn ? <ServicesPage /> : <Navigate to="/login" replace />}
//           />
//           <Route
//             path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
//           />
//           <Route
//             path="/registration" element={isLoggedIn ? <Navigate to="/" replace /> : <Registration />}
//           />

//           {/* <Route path="/" element={<ServicesPage />} /> */}
//           {/* <Route path="/customers" element={<CustomersPage />} />
//           <Route path="/bookings" element={<BookingsPage />} />
//           <Route path="/bookings/new" element={<CreateBookingPage />} /> */}

//           <Route path="/customers" element={isLoggedIn ? <CustomersPage /> : <Navigate to="/login" replace />} />
//           <Route path="/bookings" element={isLoggedIn ? <BookingsPage /> : <Navigate to="/login" replace />} />
//           <Route path="/bookings/new" element={isLoggedIn ? <CreateBookingPage /> : <Navigate to="/login" replace />} />

//         </Routes>
//       </main>
//      </div>
//     </Router>
//   )
// }
