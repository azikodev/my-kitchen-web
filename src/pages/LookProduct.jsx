//react icons
import { IoIosGitNetwork } from "react-icons/io";

import buildingIMG from "../assets/undraw_building_websites_i78t.svg"
import { Link } from "react-router-dom";
function LookProduct() {
    return (
        <div className='max-container [w-1200px] m-auto flex  flex-col items-center justify-center h-full '>
            <img src={buildingIMG} alt="build img" className="w-[300px] m-auto" />
            <div className='text-center text-3xl flex items-center justify-center gap-4'>
                <span>Bu sahifa tez orada qo'shiladi</span>
                <IoIosGitNetwork />
            </div>
            <Link to="/"><button className="btn btn-accent mt-10">Asosiy sahifaga qaytish</button></Link>
        </div>
    )
}

export default LookProduct;