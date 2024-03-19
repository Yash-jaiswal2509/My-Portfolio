import { useForm, SubmitHandler } from "react-hook-form";
import { UserDocument } from "../../../backend/src/shared/types";

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDocument>();
  return (
    <div className="flex items-center justify-center">
      <h1></h1>
      <form></form>
    </div>
  );
};

export default Register;
