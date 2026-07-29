import { yardToday } from "@/lib/site";

export function YardStatus() {
  return (
    <div className="yard-status" role="region" aria-label="Yard schedule">
      <h3 className="yard-status__title">{yardToday.title}</h3>
      <ul className="yard-status__list">
        {yardToday.lines.map((line) => (
          <li key={line.text}>
            <span className="yard-status__icon" aria-hidden>
              {line.icon === "car" ? "🚗" : line.icon === "moto" ? "🏍️" : "🌧️"}
            </span>
            {line.text}
          </li>
        ))}
      </ul>
      <p className="yard-status__intake">{yardToday.nextIntake}</p>
    </div>
  );
}
