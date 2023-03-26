import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
      <div className="fixed inset-0 w-full h-screen z-50 overflow-hidden bg-gray-500 opacity-95 flex flex-col items-center justify-center">
        <ThreeCircles
          outerCircleColor="#4F46E5"
          innerCircleColor="#4F46E5"
          middleCircleColor="#4F46E5"
        />
      </div>
    </>
  );
};

export default Loader;
