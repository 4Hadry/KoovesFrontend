import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import {
  useAllUsersQuery,
  useDeleteUsrMutation,
} from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { Skeleton } from "../Loader";
import { responseToast } from "../../utils/features";

const columns = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state) => state.userReducer);

  const { isLoading, data, isError, error } = useAllUsersQuery(user?._id);

  const [rows, setRows] = useState([]);

  const [deleteUser] = useDeleteUsrMutation();
  const deleteHandler = async (userId) => {
    if (!userId || !user?._id) {
      toast.error("Invalid userId or adminId");
      return;
    }

    try {
      const res = await deleteUser({ userId, adminId: user._id });
      responseToast(res, null, "");
    } catch (err) {
      toast.error("Error deleting user");
    }
  };

  if (isError) toast.error(error.data.message);

  useEffect(() => {
    if (data)
      setRows(
        data.users.map((i) => ({
          avatar: <img className="rounded-full" src={i.photo} alt={i.name} />,
          name: i.name,
          email: i.email,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
  }, [data]);

  const Table = TableHOC(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
    </div>
  );
};

export default Customers;
