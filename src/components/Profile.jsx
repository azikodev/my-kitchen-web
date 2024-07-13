//react icons
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

// react hot toast
import { Toaster, toast } from 'sonner'


//firebase
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

//redux
import { useDispatch } from "react-redux";
import { logout } from "../app/userSlice";
import ThemeToggle from "./ThemeToggle";
import { addProduct, removeAll, changeAmount, calculateTotal } from "../app/cartSlice"
//rrd imports
import { Link } from "react-router-dom";

//react + hooks
import { useSelector } from "react-redux";

function Profile() {
  let user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const logOutProfile = async () => {
    try {
      await signOut(auth);
      toast.success("See you soon");
      dispatch(logout());
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      {" "}
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={user?.photoURL}
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li className="mb-[10px]">
            <Link to="/about" className=" btn btn-outline btn-primary">
              <button className=" flex items-center gap-2">
                Profile <CgProfile />
              </button>
            </Link>
          </li>
          <li> <button className="btn btn-outline btn-accent mb-[10px] p-0">
            <ThemeToggle />
          </button></li>
          <li>
            <button
              onClick={logOutProfile}
              className="btn btn-error btn-outline"
            >
              Logout
              <IoIosLogOut />
            </button>
          </li>
        </ul>
      </div>


    </div>
  );
}

export default Profile;
