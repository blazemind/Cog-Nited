import { angleDown, angleUp } from "../assets";
import styles, { layout } from "../style";
import MarkDown from "./Markdown";

export const RecipeCard = ({
  icon,
  title,
  content,
  isExpanded,
  toggleExpansion,
}) => {
  return (
    <div
      className={`flex flex-col m-1 p-2 w-full justify-center rounded-[20px] feature-card cursor-pointer hover:scale-105 hover:transition-transform duration-300
        }`}
      onClick={toggleExpansion}
    >
      <div className="flex flex-row w-full justify-between items-center">
        <div
          className={`xs:w-[64px] w-[40px] xs:h-[64px] h-[40px] rounded-full ${styles.flexCenter} bg-blue-gradient`}
        >
          <img
            src={icon}
            alt="star"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
        <h4 className="font-poppins font-semibold text-gradient xs:text-[18px] text-[14px]">
          {title}
        </h4>
        <button type="button" className=" opacity-80  ">
          <img
            src={isExpanded ? angleUp : angleDown}
            alt="angle-down"
            className="xs:w-[23px] w-[12px] xs:h-[23px] h-[12px] object-contain"
          />
        </button>
      </div>
      <div className="bg-blue-gradient rounded-xl xs:m-3">
        {isExpanded && <MarkDown markdown={content} />}
      </div>
    </div>
  );
};
