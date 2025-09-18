import CountUp from "react-countup";
import "./stats.css";

function Stats({ title = "Items", count = 0, icon: Icon }) {

 
  return (
    <div className="stats">
      <div className="stat-item">
        <div>
          <CountUp end={count || 20} duration={2} />+ {title}
        </div>
        {Icon && <Icon style={{ color: "darkblue" }} className="stats-icon" />}
      </div>
    </div>
  );
}

export default Stats;
