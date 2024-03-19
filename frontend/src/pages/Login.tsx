import { SparklesCore } from "@/components/ui/sparkles";

const Login = () => {
  return (
    <div className="p-10 mx-auto 2xl:max-w-screen-2xl">
      <div className="h-full relative w-full flex flex-col overflow-hidden rounded-md shadow-lg">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="white"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={80}
            className="w-full h-full"
            particleColor="#000"
          />
        </div>
        <div className="z-20 relative p-10 flex flex-col">
          <h1 className="text-2xl">Login page</h1>
          <div className="flex-row">
            <div>
                <img src="/assets/login-register.png" className="" alt="" />
            </div>
            <div>
              <form>
                <input type="text" placeholder="Hi" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
