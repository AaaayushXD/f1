import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers, userRemoved } from "../reducers/UserSlice.jsx";
import { Loader, Pulse } from "../loading/LoadingComponent.jsx";
import { UserCircle, X } from "lucide-react";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/Auth.jsx";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(false);

  const users = useSelector(selectAllUsers);
  const user = users[0].user;
  const userName = user.displayName || user.email.split("@")[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logOut, removeAcc } = useAuth();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const deleteAcc = async () => {
    dispatch(userRemoved());
    await removeAcc();
    navigate("/login");
  };

  const logOutFunction = async () => {
    dispatch(userRemoved());
    await logOut();
    navigate("/login");
  };
  return (
    <>
      <div className="relative flex flex-col items-center justify-center w-full h-full p-8 text-white">
        <h1 className="p-5 text-5xl text-red-600">Profile</h1>
        {loading ? (
          <div className="w-full min-h-[60vh] flex justify-center items-center">
            <Loader loading={loading} />
          </div>
        ) : (
          <div>
            {users ? (
              <div className="max-w-[600px] md:w-[900px] bg-[#1d1d1da8] rounded-xl">
                <div className="flex items-center justify-center py-5 overflow-hidden rounded-full">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={userName}
                      className="rounded-full max-h-[100px]"
                    />
                  ) : (
                    <div className="h-[60px] mb-4">
                      <UserCircle size={80} />
                    </div>
                  )}
                </div>
                <div className="mb-4 border border-red-600 border-dashed"></div>
                <div className="flex gap-4 px-4 py-2 mb-5">
                  <p className="text-md text-[#8d8c8c] justify-center items-center flex">
                    Name:{" "}
                  </p>
                  <p className="flex items-center justify-center text-xl">
                    {userName}
                  </p>
                </div>
                <div className="flex gap-4 px-4 py-2 mb-5">
                  <p className="text-md text-[#8d8c8c] justify-center items-center flex">
                    Email:{" "}
                  </p>
                  <p className="flex items-center justify-center text-xl">
                    {user.email}
                  </p>
                </div>
                <div className="mb-4 border border-red-600 border-dashed"></div>
                <h4 className="p-3 text-2xl text-red-500">Danger Zone</h4>
                <div>
                  <div className="grid items-center grid-cols-2 gap-4 p-4 justify-items-center">
                    <div className="text-[#c0c0c0]">
                      Do you want to Log out?{" "}
                    </div>
                    <button
                      type="button"
                      className="w-full py-3 text-2xl border border-red-600 rounded-xl max-w-[300px] hover:bg-[#fd3737]"
                      onClick={logOutFunction}
                    >
                      Log Out
                    </button>
                  </div>
                  <div className="grid items-center grid-cols-2 gap-4 p-4 mb-8 justify-items-center">
                    <div className="text-[#c0c0c0]">
                      Are you sure you want to delete your account ?
                    </div>
                    <button
                      type="button"
                      className="w-full py-3 text-2xl border border-red-600 rounded-xl max-w-[300px] hover:bg-[#fd3737]"
                      onClick={() => setPrompt(true)}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Pulse loading={true} />
              </div>
            )}{" "}
          </div>
        )}
        {prompt && (
          <div
            className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-green-400"
            id="deletePrompt"
          >
            <div className="flex items-center justify-center rounded-xl bg-[#2b2b2b] w-[500px] h-[300px] z-10  flex-col p-5 relative">
              <div className="flex flex-wrap items-center justify-center p-4 mb-6">
                <p className="w-full text-2xl text-[#afaaaa]">
                  Are you sure you want to delete your Account?
                </p>
              </div>
              <div className="flex items-center w-full gap-6 justify-evenly">
                <button
                  type="button"
                  className="p-3 text-xl border border-red-600 rounded-xl hover:bg-[#ff697d] "
                  onClick={() => setPrompt(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="p-3 text-xl border border-red-600 rounded-xl hover:bg-[#ff697d] "
                  onClick={deleteAcc}
                >
                  Delete Account
                </button>
              </div>
              <div
                className="absolute top-[20px] right-[30px] cursor-pointer"
                onClick={() => setPrompt(false)}
              >
                <X size={30} color="red" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;

export const ProfileSection = () => {
  return (
    <>
      <NavBar />
      <div className="mb-6 border-2 border-red-600 border-red"></div>
      <div className="w-full h-full">
        <Profile />
      </div>
      <div className="mt-6 border-2 border-red-600"></div>
      <Footer />
    </>
  );
};
