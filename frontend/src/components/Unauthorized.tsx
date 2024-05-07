

const Unauthorized = () => {
  return (
    <div className="h-full w-full m-auto flex justify-center">
      <div className=" text-center font-semibold text-xl">
        <h2>Sorry, You are not Authorized</h2>
        <h2>To view this page.</h2>
        <h2>It's only for Admin</h2>
      </div>
    </div>
  );
};

export default Unauthorized;
