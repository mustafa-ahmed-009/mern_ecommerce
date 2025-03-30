import { useNavigate } from "react-router-dom";

interface TitleAndButtonProps {
  title: string;
  pathName: string;
}
const TitleAndButton: React.FC<TitleAndButtonProps> = ({ title, pathName }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mv-2">
      <h3>{title} </h3>
      <button className="btn btn-outline" onClick={() => navigate(pathName)}>
        المزيد
      </button>
    </div>
  );
};

export default TitleAndButton;
