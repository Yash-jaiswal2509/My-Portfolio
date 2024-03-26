import {
  ArrowDownIcon,
  ArrowRightCircle,
  MailIcon,
  PhoneCall,
  Star,
} from "lucide-react";
import { Button } from "./ui/button";

const Contact = () => {
  return (
    <div className=" flex p-5 gap-2 flex-1">
      <div className="p-10 w-full bg-gray-400/10 dark:bg-gray-900/60 rounded-xl shadow-md dark:shadow-white/20">
        <h1 className="flex mb-1 items-center text-6xl font-semibold">
          Hi
          <p className="text-3xl">✋🏻</p>
          <p className="text-xl italic underline">Let's Get in Touch</p>
        </h1>
        <h1 className="text-3xl flex items-end gap-1 font-semibold my-1">
          Reach directly
          <ArrowDownIcon size={32} strokeWidth={3} />
        </h1>
        <h1 className="flex gap-2 items-center">
          or <p className="font-mono text-lg">Fill the form</p>
        </h1>
        <div className=" flex flex-col gap-5 my-2">
          <div className="p-2 flex gap-2 text-lg bg-gray-400/20 dark:bg-slate-700 rounded-md dark:hover:bg-slate-800">
            <Star color="gold" fill="gold" size={40} />
            <p>
              Please!!, reach out to discuss interviews or potential
              collaborations your inquiries will receive swift attention.
            </p>
          </div>
          <div className="p-2 flex gap-2 text-lg bg-gray-400/20 dark:bg-slate-700 rounded-md dark:hover:bg-slate-800">
            <Star color="gold" fill="gold" size={40} />
            <p>
              If you want to share your thoughts and inquiries contact via the
              form, your feedback is essential.
            </p>
          </div>
          <div className="p-2 flex gap-2 text-lg bg-gray-400/20 dark:bg-slate-700 rounded-md dark:hover:bg-slate-800">
            <Star color="gold" fill="gold" size={40} />
            <p>
              I balance collaboration and independent work effectively when needed, while working autonomously to meet goals.
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

      <div className="p-8 w-full flex flex-col gap-1 bg-gray-400/10 dark:bg-gray-900/60 rounded-xl shadow-md dark:shadow-white/20">
        <h1 className="text-4xl text-nowrap text-center font-semibold ">
          Form
        </h1>
        <label className="flex flex-col gap-1">
          <span className=" text-lg font-bold">
            Full Name<span className=" text-red-600">*</span>
          </span>
          <input
            type="text"
            placeholder="Enter you name"
            className=" outline-0 border-2 rounded-md p-2 bg-gray-200 dark:bg-gray-950"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className=" text-lg font-bold">
            Phone number<span className=" text-red-600">*</span>
          </span>
          <input
            type="text"
            placeholder="Enter you phone number"
            className=" outline-0 border-2 rounded-md p-2 bg-gray-200 dark:bg-gray-950"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className=" text-lg font-bold">
            Subject<span className=" text-red-600">*</span>
          </span>
          <input
            type="text"
            placeholder="E.g. Project"
            className=" outline-0 border-2 rounded-md p-2 bg-gray-200 dark:bg-gray-950"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className=" text-lg font-bold">
            Message<span className=" text-red-600">*</span>
          </span>
          <textarea
            rows={8}
            placeholder="Enter your message/feedback"
            className=" outline-0 border-2
            rounded-md p-2 bg-gray-200 dark:bg-gray-950"
            style={{ resize: "none" }}
          ></textarea>
        </label>
        <Button className="mt-4 text-lg font-bold flex gap-1 items-center">
          Submit Form <ArrowRightCircle />
        </Button>
      </div>
    </div>
  );
};

export default Contact;
