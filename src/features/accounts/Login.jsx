import SSwrapper from "../../common/components/wrapper/SSwrapper.jsx";
import {Input} from "antd";
import SSbutton from "../../common/components/button/SSbutton.jsx";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import MainLogoSvg from "../../common/components/Svg/MainLogoSvg.jsx";


const Login = () => {


    const [userID, setUserID] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const dispatch = useDispatch()


    const loginHandler = () => {

    }


    useEffect(() => {
        console.log(userID)
    }, [userID]);

    return (
        <div className='relative w-full h-full'>
            <div className='w-full absolute top-[16px] left-1/2 -translate-x-1/2 flex justify-center items-center'>
                <MainLogoSvg width={"162px"}/>
            </div>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <SSwrapper
                    className={
                        `w-full mx-[20px] px-[40px] py-[30px]
                        tablet:max-w-[900px] tablet:px-[50px] tablet:py-[40px]
                 desktop:px-[60px] desktop:py-[50px] desktop:max-w-[900px] 
                `
                    }
                >
                    <div
                        style={{
                            width: '100%'
                        }}
                        className='pb-[30px]'
                    >
                        <h2 className='text-[#111321] text-[22px] tablet:text-[26px] desktop:text-[30px]'>안녕하세요 :)</h2>
                        <h2 className='text-[#111321] text-[22px] tablet:text-[26px] desktop:text-[30px]'>RMS 입니다.</h2>
                    </div>
                    <Input
                        value={userID}
                        onChange={(e) => setUserID(e.value)}
                        prefix={<UserOutlined/>}
                        placeholder="아이디를 입력하세요."
                        style={{
                            marginBottom: '25px',
                            height: '40px',
                        }}
                    />

                    <Input.Password
                        prefix={<LockOutlined/>}
                        style={{
                            marginBottom: '50px',
                            height: '40px',
                        }}
                        placeholder="비밀번호를 입력하세요."/>
                    <SSbutton
                        type='primary'
                        block
                        className={`h-[60px] text-[20px] font-bold bg-[#4F5FF5] mb-[25px]`}
                    >
                        로그인
                    </SSbutton>
                    <div className='flex w-full justify-center items-center'>
                        <ul className='flex flex-row gap-[10px] tablet:gap-[16px] text-[#51525C] items-center justify-center'>
                            <li onClick={() => dispatch(push("/searchId"))} className='cursor-pointer'>아이디 찾기</li>
                            <div className='w-[1px] h-[14px] bg-[#51525C]'></div>
                            <li onClick={() => dispatch(push("/searchPw"))} className='cursor-pointer'>비밀번호 찾기</li>
                        </ul>
                    </div>
                </SSwrapper>
            </div>
        </div>
    );
};

export default Login;
