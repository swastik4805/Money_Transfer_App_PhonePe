import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../assets/components/Heading";
import { Subheading } from "../assets/components/Subheading";
import { Inputbox } from "../assets/components/Inputbox";
import { Button } from "../assets/components/Button";
import axios from "axios";
import { BottomWarning } from "../assets/components/BottomWarning";

const Signin=()=>{
    const [error, setError]=useState("");
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const navigate=useNavigate();
    return (
        <div>
            <div className="flex justify-center bg-slate-300 h-screen">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading props={"Signup"}></Heading>
                    <Subheading props={"Enter your details"} ></Subheading>
                    

                    <div className="text-sm bg-red-200">{error}</div>

                    <Inputbox placeholder={"john123@gmail.com"} label={"Email"} onChange={(e)=>{
                        setUsername(e.target.value);
                        setError("")
                    }}></Inputbox>

                    <Inputbox placeholder={"****"} label={"Password"} onChange={(e)=>{
                        setPassword(e.target.value);
                        setError("")
                    }}></Inputbox>

                    <br></br>

                    <Button label={"Go!"} onClick={async ()=>{
                        try{
                            const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
                                username,password
                            });
                            localStorage.setItem("token",response.data.token);
                               navigate("/dashboard");
                        }
                        catch{
                            setError("OOPS! An error has occured")
                        }
                        
                    }}>
                        Go!
                    </Button>
                    
                    <BottomWarning label={"Dont have an account?"} buttonText={"Sign up"} to={"/signup"}></BottomWarning>
                </div>
            </div>
        </div>
    )
}

export default Signin