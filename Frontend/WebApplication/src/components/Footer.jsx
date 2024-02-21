import styles from "../style";
import { logo } from "../assets";
import { footerLinks, socialMedia, footerText, footerTagLine } from "../constants";

const Footer = () => (
  <section className={`${styles.paddingY} flex-col relative inset-x-0 bottom-0`}>
    <div className="flex flex-col sm:flex-row items-center " >
      <div>
        <img
          src={logo}
          alt="logo"
          className=" w-40 object-contain"
        />
      </div>
      <div className=" align-center text-gradient xs:text-[16px] text-[12px]">
        <p>
          {footerTagLine}
        </p>
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        { footerLinks.length > 0 && footerLinks.map((footerlink) => (
          <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
            <h4 className="font-poppins font-medium xs:text-[16px] text-[12px] leading-[27px] text-white">
              {footerlink.title}
            </h4>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center xs:text-[16px] text-[12px] leading-[27px] text-white">
        {footerText}
      </p>

      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Footer;