const mongoose=require("mongoose");
const Account=require("./db")


const TransferFunds= async (fromAccountId, toAccountId, amount)=>{

    const session =client.startSession();

    try{
        await session.withTransaction(async ()=>{
            await Account.findByIdAndUpdate(fromAccountId,{
                $inc: {balance: -amount}
            })
        
            await Account.findByIdAndUpdate(toAccountId, {
                $inc: {balance: +amount}
            })
        })
    }
    catch{
        console.log("Error processing payment")
    }
    finally{
        session.endSession();
    }

    
}

export default TransferFunds;