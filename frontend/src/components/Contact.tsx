import {
  ArrowDownIcon,
  ArrowRightCircle,
  MailIcon,
  PhoneCall,
  Star,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  type FromData = {
    fullName: string;
    email: string;
    subject: string;
    message: string;
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FromData>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChangeHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("subject", data.subject);
    formData.append("message", data.message);
    formData.append("access_key", import.meta.env.VITE_FORM_ACCESS_KEY);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      toast.success("Mail sent successfully", {
        closeButton: true,
      });
    }
    setLoading(false);
    setData({ fullName: "", email: "", subject: "", message: "" });
  };

  return (
    <div className=" flex lg:flex-row flex-col p-2 sm:p-5 gap-2 flex-1">
      <div className="sm:p-10 p-2 w-full bg-gray-400/10 dark:bg-gray-900/25 rounded-xl shadow-md dark:shadow-white/20">
        <h1 className="flex mb-1 items-center text-4xl sm:text-6xl font-semibold">
          Hi
          <p className="sm:text-3xl text-xl">✋🏻</p>
          <p className="sm:text-xl text-base italic underline">
            Let's Get in Touch
          </p>
        </h1>
        <h1 className="sm:text-3xl text-xl flex items-end gap-1 font-semibold my-1">
          Reach directly
          <ArrowDownIcon className=" sm:w-8 w-6 sm:h-8 h-6" strokeWidth={3} />
        </h1>
        <h1 className="flex gap-2 items-center">
          or <p className="font-mono text-lg">Fill the form</p>
        </h1>
        <div className=" flex flex-col gap-5 my-2">
          <div className="p-2 flex gap-2 text-base lg:text-lg bg-gray-400/20 dark:bg-slate-700/60 rounded-md dark:hover:bg-slate-800">
            <Star color="gold" fill="gold" size={40} />
            <p>
              Please!!, reach out to discuss interviews or potential
              collaborations your inquiries will receive swift attention.
            </p>
          </div>
          <div className="p-2 flex gap-2 text-base lg:text-lg bg-gray-400/20 dark:bg-slate-700/60 rounded-md dark:hover:bg-slate-800">
            <Star color="gold" fill="gold" size={40} />
            <p>
              If you want to share your thoughts and inquiries contact via the
              form, your feedback is essential.
            </p>
          </div>
          <div className="p-2 flex gap-2 text-base lg:text-lg bg-gray-400/20 dark:bg-slate-700/60 rounded-md dark:hover:bg-slate-800">
            <Star color="gold" fill="gold" size={40} />
            <p>
              I balance collaboration and independent work effectively when
              needed, while working autonomously to meet goals.
            </p>
          </div>
        </div>
        <div className="mt-5">
          <a href="mailto:yashjaiswal2509@gmail.com">
            <span className="my-2 flex text-lg items-center gap-2">
              <MailIcon />
              yashjaiswal2509@gmail.com
            </span>
          </a>
          <a href="tel:+917851073155">
            <span className="my-2 flex text-lg items-center gap-2">
              <PhoneCall />
              +91 7851073155
            </span>
          </a>
        </div>
      </div>

      <span className=" h-full flex flex-col items-center">
        <span className="w-[2px] h-full bg-gray-500 rounded-full"></span>
        or
        <span className="w-[2px] h-full bg-gray-500 rounded-full"></span>
      </span>

      {/* ******************Contact Form******************* */}
      <form
        onSubmit={onSubmit}
        className="sm:p-8 p-4 w-full flex flex-col gap-1 bg-gray-400/10 dark:bg-gray-900/25 rounded-xl shadow-md dark:shadow-white/20"
      >
        <h1 className="text-4xl text-nowrap text-center font-semibold ">
          Form
        </h1>
        <label className="flex flex-col gap-1">
          <span className=" text-lg font-bold">
            Full Name<span className=" text-red-600">*</span>
          </span>
          <input
            name="fullName"
            type="text"
            placeholder="Enter you name"
            value={data.fullName}
            onChange={onChangeHandler}
            className=" outline-0 border-2 rounded-md p-2 bg-gray-200 dark:bg-gray-950/60"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className=" text-lg font-bold">
            Email<span className=" text-red-600">*</span>
          </span>
          <input
            name="email"
            type="email"
            placeholder="example123@gmail.com"
            value={data.email}
            onChange={onChangeHandler}
            className=" outline-0 border-2 rounded-md p-2 bg-gray-200 dark:bg-gray-950/60"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className=" text-lg font-bold">
            Subject<span className=" text-red-600">*</span>
          </span>
          <input
            name="subject"
            type="text"
            placeholder="E.g. Project"
            value={data.subject}
            onChange={onChangeHandler}
            className=" outline-0 border-2 rounded-md p-2 bg-gray-200 dark:bg-gray-950/60"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className=" text-lg font-bold">
            Message<span className=" text-red-600">*</span>
          </span>
          <textarea
            name="message"
            rows={8}
            placeholder="Enter your message/feedback"
            value={data.message}
            onChange={onChangeHandler}
            className=" outline-0 border-2
            rounded-md p-2 bg-gray-200 dark:bg-gray-950/60"
            style={{ resize: "none" }}
          ></textarea>
        </label>
        <Button
          type="submit"
          variant="outline"
          className="mt-4 text-lg font-bold flex gap-1 items-center"
        >
          {loading ? "Submitting..." : "Submit Form"} <ArrowRightCircle />
        </Button>
      </form>
    </div>
  );
};

export default Contact;
