import { useSelector } from "react-redux";

function About() {
  let user = useSelector((state) => state.user.user);
  let lastLoginAt = user.createdAt;
  const lastLoginDate = new Date(parseInt(lastLoginAt));
  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(parseInt(timestamp));
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return date.toLocaleString(undefined, options);
  };

  const formattedDate = formatDate(user.createdAt);
  const datePart = formattedDate.split(",")[0];
  const timePart = formattedDate.split(",")[1];

  if (user) {
    return (
      <div className="align-content my-10 pb-10 flex gap-5 items-start justify-center md:flex-row flex-col ">
        <div className="">
          <img
            className="size-52 rounded-full md:ml-24 md:mt-12 lg:m-0"
            src={user.photoURL}
            alt=""
          />
        </div>
        <div className="pt-10 flex flex-col gap-3 items-center justify-center ">
          <div className="stats shadow max-w-xl lg:flex-row flex-col flex glass mx-auto">
            <div className="stat ">
              <div className="stat-figure text-primary"></div>
              <div className="stat-title text-[20px]">Name</div>
              <div className="stat-value text-green-400">{user.displayName}</div>
              <div className="stat-desc  font-bold text-xs pt-2">
                <span className="text-2xl">Email: </span><span className="text-xl">{user.email}</span>
              </div>
            </div>
            {" "}
          </div>
        </div>
      </div>
    );
  }
}

export default About;