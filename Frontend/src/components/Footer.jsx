import React from "react";
import Button from "./Button";
import Label from "./Label";

const Footer = () => {
  const handleSubmi = async () => {
        alert("thank you for following");
      }
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 px-4 text-white" style={{backgroundColor:'#783fa4'}}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Follow Us In Other
        </h2>

        <form onSubmit={handleSubmi} className="flex md:flex-row items-center justify-center gap-4 mb-6">
           
            <Label name="Email"/>
          <input
            type="email"
            placeholder="Email *"
            className="border border-gray-400 px-4 py-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-2"
              required
            />
            Yes, I agree. *
          </label>
          <Button
            type="submit"
            className=" text-white px-6 py-2 rounded hover:bg-blue-200 transition"
            name="Follow"
          />
         
        </form>
        <div className="flex flex-col md:flex-row justify-center gap-4 text-sm text-white mb-4">
          <a href="#" className="hover:underline">FAQ</a>
          <span>|</span>
          <a href="#" className="hover:underline">Terms & Conditions</a>
        </div>
        <p className="text-xs text-white mt-2">
          © Global Kitchen
        </p>
      </div>
      
    </footer>
  );
};

export default Footer;