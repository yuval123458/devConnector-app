import React, { Fragment } from "react";
import "./App.css";
import Landing from "./components/layout/Landing";
import NavBar from "./components/layout/NavBar";
import { Route, Routes } from "react-router-dom";
import Alert from "./components/layout/Alert";
import useHttp from "./hooks/useHttp";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import LoadingSpinner from "./components/layout/LoadingSpinner";
import { initializeApp } from "firebase/app";

const Post = React.lazy(() => import("./components/post/Post"));
const Posts = React.lazy(() => import("./components/posts/Posts"));
const Profile = React.lazy(() => import("./components/profile/Profile"));
const Profiles = React.lazy(() => import("./profiles/Profiles"));
const AddEducation = React.lazy(() =>
  import("./components/profile-forms/AddEducation")
);
const AddExperience = React.lazy(() =>
  import("./components/profile-forms/AddExperience")
);
const EditProfile = React.lazy(() =>
  import("./components/profile-forms/EditProfile")
);
const CreateProfile = React.lazy(() =>
  import("./components/profile-forms/CreateProfile")
);
const ProtectedRoute = React.lazy(() =>
  import("./components/layout/ProtectedRoute")
);
const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"));
const Login = React.lazy(() => import("./components/auth/Login"));
const Register = React.lazy(() => import("./components/auth/Register"));

const firebaseConfig = {
  apiKey: "AIzaSyCi7paNGaFAra0lOgM3SiWoOiDNwJJy4X4",
  authDomain: "devconnector-yuval.firebaseapp.com",
  projectId: "devconnector-yuval",
  storageBucket: "devconnector-yuval.appspot.com",
  messagingSenderId: "704180240444",
  appId: "1:704180240444:web:e5f85cbf78242f4fc1c339",
};

const app = initializeApp(firebaseConfig);

const App = () => {
  const { setAuthUser } = useHttp();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (localStorage.token) {
      setAuthUser();
    }
  }, [setAuthUser]);

  return (
    <Fragment>
      <NavBar />
      <section className="container">
        <Suspense fallback={<LoadingSpinner />}>
          <Alert />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute to={"/login"} isAuth={isAuth} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute to={"/login"} isAuth={isAuth} />}>
              <Route path="/create-profile" element={<CreateProfile />} />
            </Route>
            <Route element={<ProtectedRoute to={"/login"} isAuth={isAuth} />}>
              <Route path="/edit-profile" element={<EditProfile />} />
            </Route>
            <Route element={<ProtectedRoute to={"/login"} isAuth={isAuth} />}>
              <Route path="/add-experience" element={<AddExperience />} />
            </Route>
            <Route element={<ProtectedRoute to={"/login"} isAuth={isAuth} />}>
              <Route path="/add-education" element={<AddEducation />} />
            </Route>
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route element={<ProtectedRoute to={"/login"} isAuth={isAuth} />}>
              <Route path="/posts" element={<Posts />} />
            </Route>
            <Route element={<ProtectedRoute to={"/login"} isAuth={isAuth} />}>
              <Route path="/posts/:postId" element={<Post />} />
            </Route>
            <Route path="*" element={<Landing />} />
          </Routes>
        </Suspense>
      </section>
    </Fragment>
  );
};
export default App;
