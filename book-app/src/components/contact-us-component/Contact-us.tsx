"use client";
import { toast } from "sonner";

export default function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Message has been sent");
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col h-full py-[90px]">
        <div className="w-[65%]">
          <div className="h-[50%] flex justify-start items-center w-full">
            <p className="text-[2rem] mb-[40px]">Contact Us</p>
          </div>
          <div className="flex justify-between h-[50%] w-full">
            <div className="w-[300px] mb-[20px]">
              <h2 className="text-[1.4rem] mb-[20px]">Via phone:</h2>
              <ul>
                <li className="mb-[10px]">
                  <div className="flex flex-col bg-[#f7f7f7] rounded-xl p-[15px]">
                    <p>Customer support</p>
                    <p>+1234567890</p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-col bg-[#f7f7f7] rounded-xl p-[15px]">
                    <p>Business questions</p>
                    <p>+0987654321</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-[514px]">
              <h2 className="text-[1.4rem] mb-[20px]">Via mail:</h2>
              <div className="bg-[#f7f7f7] rounded-xl p-[30px]">
                <form
                  onSubmit={handleSubmit}
                  method="post"
                  className="flex flex-col gap-8"
                >
                  <div className="flex gap-8">
                    <div className="flex flex-col">
                      <label htmlFor="first-name" className="mb-[5px]">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        className="rounded-xl py-[5px] px-[15px]"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="last-name" className="mb-[5px]">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="rounded-xl py-[5px] px-[15px]"
                        placeholder="Smith"
                        name="last-name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col">
                      <label htmlFor="email" className="mb-[5px]">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="rounded-xl py-[5px] px-[15px]"
                        placeholder="youremail@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col">
                      <label htmlFor="message" className="mb-[5px]">
                        Your message
                      </label>
                      <textarea
                        name="message"
                        className="rounded-xl py-[5px] px-[15px] resize-none h-[100px]"
                        placeholder="Write your message here"
                        required
                        rows={10}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col items-center">
                      <button
                        type="submit"
                        className="py-[5px] px-[15px] bg-white rounded-xl w-[150px]"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
