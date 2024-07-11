import { signOut } from "firebase/auth";
import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import toast from "react-hot-toast";

const Header = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const logOutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign out Faild");
    }
  };

  return (
    <nav className=" bg-white fixed top-0 w-full z-40">
      <div className="flex justify-end gap-6 items-stretch p-5">
        <Link
          to={"/"}
          onClick={() => setIsOpen(false)}
          className=" text-lg font-medium "
        >
          HOME
        </Link>
        <Link
          to={"/search"}
          onClick={() => setIsOpen(false)}
          className="text-color2 text-lg font-medium"
        >
          <FaSearch />
        </Link>
        <Link
          to={"/cart"}
          onClick={() => setIsOpen(false)}
          className="text-color2 text-lg font-medium"
        >
          <FaShoppingBag />
        </Link>
        {user?._id ? (
          <>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-color2 text-lg font-medium mr-4"
            >
              <FaUser />
            </button>
            {isOpen && (
              <div className="dialog border border-gray-300 rounded p-2 w-24 absolute left-auto top-8">
                <div className="flex flex-col items-start space-y-1">
                  {user.role === "admin" && (
                    <Link
                      to={"/admin/dashboard"}
                      onClick={() => setIsOpen(false)}
                      className="text-color2 text-sm font-medium"
                    >
                      Admin
                    </Link>
                  )}

                  <Link
                    to={"/order"}
                    onClick={() => setIsOpen(false)}
                    className="text-color2 text-sm font-medium"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={logOutHandler}
                    className="text-color2 text-sm font-medium"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Link
            to={"/login"}
            onClick={() => setIsOpen(false)}
            className="text-color2 text-lg font-medium"
          >
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
