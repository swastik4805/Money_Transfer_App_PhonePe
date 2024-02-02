
export function Inputbox({label, placeholder, onChange}){
    return(
        <div>
            <div className="text-sm text-left">
                {label}
            </div>
            <input className="w-full px-2 py-1 border rounded border-slate-200" placeholder={placeholder}
            onChange={onChange}></input>
        </div>
    )
}