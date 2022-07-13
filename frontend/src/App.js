import React, { Fragment } from "react";
import "./App.css";
import Landing from "./components/layout/Landing";
import NavBar from "./components/layout/NavBar";
import { Route, Routes } from "react-router-dom";
// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import useHttp from "./hooks/useHttp";
import { useEffect } from "react";
// import Dashboard from "./components/dashboard/Dashboard";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import LoadingSpinner from "./components/layout/LoadingSpinner";
// import ProtectedRoute from "./components/layout/ProtectedRoute";
// import CreateProfile from "./components/profile-forms/CreateProfile";
// import EditProfile from "./components/profile-forms/EditProfile";
// import AddExperience from "./components/profile-forms/AddExperience";
// import AddEducation from "./components/profile-forms/AddEducation";
// import Profiles from "./profiles/Profiles";
// import Profile from "./components/profile/Profile";
// import Posts from "./components/posts/Posts";
// import Post from "./components/post/Post";

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
