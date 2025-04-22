
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">SI</span>
      </div>
      <span className="font-serif text-xl font-semibold text-primary">Serene Insights</span>
    </Link>
  );
}

