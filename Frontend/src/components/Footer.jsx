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

        <form onSubmit={handleSubmi} className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 w-full px-4">
          <label className="text-white font-medium text-lg whitespace-nowrap">Email:</label>
          <input
            type="email"
            placeholder="Email *"
            className="border border-purple-300/50 bg-white/10 text-white placeholder-purple-200 px-4 py-2 rounded w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:bg-white/20 transition-all text-base"
            required
          />
          <label className="flex items-center text-sm gap-2 select-none cursor-pointer text-white whitespace-nowrap">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
              required
            />
            <span>Yes, I agree. *</span>
          </label>
          <Button
            type="submit"
            className="w-full md:w-auto bg-white hover:bg-purple-100 text-purple-900 font-bold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-base whitespace-nowrap"
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