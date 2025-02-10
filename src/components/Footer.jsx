import {
  FaFacebook,
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const footerParts = [
  {
    name: "Learn Key Technologies",
    technologies: [
      "FullStack Developer ",
      "Web Developer",
      "Cloud engineer and Devops",
      "Quality Assurance",
      "AI / ML Engineer",
      "Data Science ",
    ],
  },
  {
    name: "Essential Skills",
    technologies: [
      "Data Analytics",
      "Artificial Intelligence",
      "Cybersecurity",
      "Financial Modeling",
      "Business Analysis",
    ],
  },
  {
    name: "Industry Solutions",
    technologies: [
      "Sales",
      "E-commerce",
      "Marketing Analytics",
      "Social Media Marketing",
      "Risk Management",
    ],
  },
];

const Footer = () => {
  return (
    <div className="w-full text-[#fff] bg-[#063e75] flex">
      <div className="w-[70vw] flex justify-around  p-8">
        {footerParts?.map((eachPart) => (
          <div key={eachPart?.name}>
            <h1 className="text-2xl font-bold mb-[20px] ">{eachPart?.name}</h1>
            <div>
              {eachPart?.technologies?.map((tech, index) => (
                <p className="text-sm mb-1 " key={index}>
                  {tech}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="w-[30vw] flex justify-center items-center">
        <div className="flex justify-around w-[20vw] h-[50px] ">
          <FaFacebook className="text-3xl" />
          <FaWhatsapp className="text-3xl" />
          <FaTwitter className="text-3xl" />
          <FaInstagram className="text-3xl" />
          <FaYoutube className="text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
