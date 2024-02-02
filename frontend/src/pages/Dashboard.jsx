import { Appbar } from "../assets/components/Appbar"
import { Balance } from "../assets/components/Balance"
import { Users } from "../assets/components/Users"

const Dashboard=()=>{
    return(
        <div>
            <Appbar></Appbar>
            <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
        </div>
    )
}

export default Dashboard