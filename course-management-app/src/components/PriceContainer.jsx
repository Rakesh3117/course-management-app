import { TiTick } from "react-icons/ti";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";

const PricePlanes = [
  {
    id: 1,
    name: "Personal Plan",
    tagLine: "For You",
    teamMembers: "Individual",
    cost: "$200 per Month",
    benefits: [
      "Access to 12,000+ top courses",
      "Certification prep",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
      "Advanced analytics and insights",
    ],
  },
  {
    id: 2,
    name: "Team Plan",
    tagLine: "For Your Team",
    teamMembers: "2 to 20 People",
    cost: "$300 per month per user",
    benefits: [
      "Access to 15,000+ top courses",
      "Certification prep",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
      "Advanced analytics and insights",
      "Dedicated customer success team",
      "International course collection featuring 15 languages",
    ],
  },
  {
    id: 3,
    name: "Enterprise Plan",
    tagLine: "For Your Whole Organization",
    teamMembers: "More than 20 People",
    cost: "$500 per month per user",
    benefits: [
      "Access to 27,000+ top courses",
      "Certification prep",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
      "Advanced analytics and insights",
      "Dedicated customer success team",
      "International course collection featuring 15 languages",
      "Customizable content",
      "Hands-on tech training with add-on",
      "Strategic implementation services with add-on",
    ],
  },
];

const PriceContainer = () => {
  return (
    <div className="flex justify-center">
      <div className="flex space-x-10">
        {PricePlanes?.map((plan) => (
          <div
            key={plan.id}
            className="w-[450px] h-[650px] border-1 border-t-[10px] border-[#122c46] border-t-[#1b67b3] rounded-[10px]"
          >
            <div className="h-[120px] p-[20px] bg-[#c2dcf1]">
              <h1 className="font-bold text-xl ">{plan.name}</h1>
              <p className="text-sm mt-1">{plan.tagLine}</p>
              <div className="mt-[8px] flex space-x-2 items-center">
                <BsFillPeopleFill />
                <p>{plan.teamMembers}</p>
              </div>
            </div>
            <div className="p-[20px]">
              <div>
                <h1 className="text-xl font-semibold mb-[5px]">
                  Starting at {plan.cost}
                </h1>
                <p>Billed monthly or annually. Cancel Anytime</p>
              </div>
              <div className="mt-[20px]">
                <button className="h-[60px] w-full bg-[#1165b9] text-[#fff]">
                  <div className="flex items-center justify-center space-x-3">
                    <p>Start Subscription</p>
                    <FaArrowRight />
                  </div>
                </button>
              </div>
              <div className="mt-[20px]">
                <ul>
                  {plan.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="mb-[5px] flex items-center space-x-3"
                    >
                      <TiTick className="text-lg text-[#12098a]" />
                      <p>{benefit}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceContainer;
