import Navbar from "../component/Navbar";
import Image from "next/image";
import cover from "../public/cover.png";
export default function Home() {
  return (
    <div className=" justify-center items-center ">
      <div>
        <Navbar />
      </div>

      <div className="container m-auto relative max-w-7xl h-[100vh] bg-red-50  flex flex-row justity-center text-center ">
        <div className="bg-red-50 h-fit w-fit absolute top-20 ">
          <Image src={cover} alt="cover" />
        </div>
      </div>
    </div>
  );
}
