import React, {useEffect} from 'react';
import SSsectionWrap from "../../common/components/wrapper/SSsectionWrap.jsx";
import SSwrapper from "../../common/components/wrapper/SSwrapper.jsx";
import {Divider, Tabs} from "antd";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

import UserInfo from "./components/UserInfo.jsx";
import LikesInfo from "./components/LikesInfo.jsx";
import RentalsInfo from "./components/RentalsInfo.jsx";
import ReservationsInfo from "./components/ReservationsInfo.jsx";
import {profileAction} from "./profileReducer.jsx";

import {UserOutlined} from '@ant-design/icons';
import {Avatar, Space} from 'antd';


const Profile = () => {

    const dispatch = useDispatch()

    const {
        activeTab,
        userProfileImg,
        user

    } = useSelector(({userReducer, profileReducer}) => ({
            user: userReducer.user,
            activeTab: profileReducer.tab,
            userProfileImg: profileReducer.getUserProfileImg
        }),
        shallowEqual
    )


    useEffect(() => {
        dispatch(profileAction.getUserProfileImg())
    }, []);

    useEffect(() => {
        if (!activeTab) dispatch(profileAction.setTab("userInfo"))
        if (!userProfileImg) dispatch(profileAction.getUserProfileImg(null))
    }, [])

    return (
        <>
            <SSsectionWrap>
                <SSwrapper className={'w-full m-[0] bg-[#f5f5f5] bg-opacity-50 p-[16px]'}>
                    <div className={'flex pb-[16px] items-center gap-[20px]'}>
                        {/*<img src="" alt="#" className={'desktop:max-w-[80px] desktop:max-h-[80px]'}/>*/}
                        {userProfileImg?.data == null ? <Space wrap size={80}>
                            <Avatar size={80} icon={<UserOutlined/>}/>
                        </Space> : <img src={userProfileImg?.data} alt="#"/>}


                        <h2>{user.userNm}님, 어서오세요!</h2>
                    </div>
                    <Tabs
                        type="card"
                        size={'small'}
                        activeKey={activeTab}
                        onChange={(activeKey) => dispatch(profileAction.setTab(activeKey))}
                        items={[
                            {
                                label: `회원 정보`,
                                key: `userInfo`,
                                children: <UserInfo/>,
                            },
                            {
                                label: `대여 목록`,
                                key: `rentalsInfo`,
                                children: <RentalsInfo/>,
                            },
                            {
                                label: `관심 목록`,
                                key: `likesInfo`,
                                children: <LikesInfo/>,

                            },
                            {
                                label: `예약 목록`,
                                key: `reservationsInfo`,
                                children: <ReservationsInfo/>,

                            }
                        ]}
                        rootClassName={'border-t-[1px] border-solid border-t-[#111321] box-border '}
                    />
                </SSwrapper>
            </SSsectionWrap>
            {/*{getProfileImg}*/}
            {activeTab}
            {userProfileImg?.data == null ? '널이다 이자시가' : 'ㅁㄴㅇ'}

        </>
    )
}

export default Profile
