const PrepareCounter = ({ seconds }) => {
  return (
    <div className="absolute w-full h-full bg-black/75 m-0 p-0 top-[0%] flex justify-center items-center transition-all">
      <div className="animate-ping text-white text-6xl font-semibold drop-shadow-2xl">
        {seconds}
      </div>
    </div>
  );
};

export default PrepareCounter;
