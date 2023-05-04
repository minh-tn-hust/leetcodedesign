import Image from "next/image";
import ASSET from "@/shared/assets";
import SignInForm from "@/pages/authentication/components/SignInForm";
import SignUpForm from "@/pages/authentication/components/SignUpForm";
import {useState} from "react";


export default function AuthenticationScreen() {
    const STATE = {
        SIGN_IN: "sign_in",
        FORGOT_PASSWORD: "forgot_password",
        SIGN_UP: "sign_up"
    }

    const [authenState, setAuthenState] = useState(STATE.SIGN_IN);

    const changeFormType = function (type) {
        setAuthenState(state => type)
    };

    const handleForgetPassword = function () {
        changeFormType(STATE.FORGOT_PASSWORD);
    }

    const handleSignUp = function () {
        changeFormType(STATE.SIGN_UP);
    }

    const handleSignIn = function () {
        changeFormType(STATE.SIGN_IN);
    }

    return (
        <>
            <main>
                <div className={`flex items-center justify-center h-screen bg-[#ECF0F1] pt-12`}>
                    <div className={'w-[400px] bg-white shadow-black pt-10 pb-8 px-8 flex flex-col items-center'}>
                        <div>
                            <img
                                src={ASSET.LOGO.src}
                                className={'w-full h-20 object-contain'}
                            />
                            <div className={'font-bold text-xl mt-2'}>Code Judging</div>
                        </div>
                        {
                            authenState === STATE.SIGN_UP
                                ? <SignUpForm onSignIn={handleSignIn}/>
                                : authenState === STATE.SIGN_IN
                                    ? <SignInForm onSignUp={handleSignUp} onForgotPassword={handleForgetPassword}/>
                                    : <div>Forget password</div>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}