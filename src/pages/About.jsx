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
            <div className="flex gap-5 items-center justify-center md:flex-row flex-col ">
                <div className="">
                    <img
                        className="size-52 rounded-full md:ml-24 md:mt-12 lg:m-0 w-20 h-20"
                        src={user.photoURL}
                        alt=""
                    />
                </div>
                <div className="pt-10 flex flex-col gap-3 items-center justify-center">
                    <div className=" shadow  lg:flex-row flex-col flex ">
                        <div className="stat ">
                            {/* <div className="stat-figure text-primary"></div> */}
                            <div className="stat-title">Name:</div>
                            <div className="stat-value text-clip">{user.displayName}</div>
                            <div className="stat-desc  font-bold text-xs pt-2">
                                Email:
                            </div>
                            <div className=" text-clip">{user.email}</div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default About;