import { EmailIcon } from "./icon/EmailIcon";
import { Moviez } from "./icon/icon";
import { PhoneIcon } from "./icon/phone";

export const Blue = () => {
  return (
    <footer className="w-full bg-[#4338CA] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-3 md:gap-8">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <div className="flex items-center gap-2">
              <Moviez />
              <p className="text-lg font-semibold">Movie Z</p>
            </div>
            <p className="text-xs sm:text-sm opacity-90">
              © 2024 Movie Z. All Rights Reserved.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <p className="text-sm font-semibold">Contact Information</p>

            <div className="flex items-start gap-2">
              <EmailIcon />
              <p className="text-xs sm:text-sm leading-relaxed">
                Email:
                <br />
                <span className="opacity-90">support@movieZ.com</span>
              </p>
            </div>

            <div className="flex items-start gap-2">
              <PhoneIcon />
              <p className="text-xs sm:text-sm leading-relaxed">
                Phone:
                <br />
                <span className="opacity-90">+976 (11) 123-4567</span>
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <p className="text-sm font-semibold">Follow us</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs sm:text-sm">
              <a href="#" className="hover:underline">
                Facebook
              </a>
              <a href="#" className="hover:underline">
                Instagram
              </a>
              <a href="#" className="hover:underline">
                Twitter
              </a>
              <a href="#" className="hover:underline">
                Youtube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
