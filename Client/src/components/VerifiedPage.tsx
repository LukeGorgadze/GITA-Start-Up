import React from 'react'
import { useParams } from 'react-router-dom';
import { verifyUser } from '../JsLogic/verifyUser'
const VerifiedPage = (props: any) => {
    const { confirmationCode } = useParams();
    console.log(confirmationCode)
    verifyUser(confirmationCode)
    return (
        <div>
            <header className="flex flex-col w-[70%] mx-auto items-center mt-[150px] min-h-[700px]">
                <h1 className='font-bold text-[30px]'>
                    Account confirmed! ✅
                </h1>
                <h2>
                😊 You can now log in 😊
                </h2>
            </header>
        </div>
    )
}

export default VerifiedPage
