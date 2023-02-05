import { ThreeDots } from "react-loader-spinner";

const Loader = ({ isChild }) => {
  return (
    <div
      className={`${
        isChild ? "w-full h-full" : "w-[1300px] h-[800px]"
      } bg-[#002550] flex items-center justify-center`}
    >
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#0077FF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
