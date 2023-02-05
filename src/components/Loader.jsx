import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-[#0077FF] flex items-center justify-center">
      <div className="w-[1300px] h-[800px] bg-[#002550] flex items-center justify-center">
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
    </div>
  );
};

export default Loader;
