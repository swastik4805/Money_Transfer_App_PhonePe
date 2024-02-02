
export function Balance({value}){
    return(
        <div>
            <div className="font-bold text-lg">
                Your Balance:
            </div>
            <div className="font-semibold ml-4 text-lg">
                {value}
            </div>
        </div>
    )
}