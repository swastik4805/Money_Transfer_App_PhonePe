import { Link } from "react-router-dom";

export function BottomWarning({label, buttonText, to}){
    return(
        <div className="flex justify-center">
            <div className="pr-2">
                {label}
            </div>
            <Link to={to} className="pointer underline pl-1 cursor-pointer">
            {buttonText}
            </Link>
        </div>
    )
}