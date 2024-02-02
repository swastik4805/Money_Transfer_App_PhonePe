import { useState } from "react";
import { Heading } from "../assets/components/Heading";
import { Inputbox } from "../assets/components/Inputbox";
import { Subheading } from "../assets/components/Subheading";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Button } from "../assets/components/Button";
import { BottomWarning } from "../assets/components/BottomWarning";

export function Signup(){
    const [firstName, setFirstname]=useState("");
    const [lastName, setLastname]= useState("");
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const navigate=useNavigate();
    return (
        <div>
            <div className="flex justify-center bg-slate-300 h-screen">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading props={"Signup"}></Heading>
                    <Subheading props={"Enter your details and create an account"} ></Subheading>
                    <Inputbox placeholder={"John"} label={"First Name"} onChange={(e)=>{
                        setFirstname(e.target.value);
                    }}></Inputbox>

                    <Inputbox placeholder={"Samual"} label={"Last Name"} onChange={(e)=>{
                        setLastname(e.target.value);
                    }}></Inputbox>

                    <Inputbox placeholder={"john123@gmail.com"} label={"Email"} onChange={(e)=>{
                        setUsername(e.target.value);
                    }}></Inputbox>

                    <Inputbox placeholder={"****"} label={"Password"} onChange={(e)=>{
                        setPassword(e.target.value);
                    }}></Inputbox>

                    <br></br>

                    <Button label={"Go!"} onClick={async ()=>{
                        const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,firstName,lastName,password
                        });
                        localStorage.setItem("token",response.data.token);
                        navigate("/dashboard");
                    }}>
                        Go!
                    </Button>
                    
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
                </div>
            </div>
        </div>
    )
}