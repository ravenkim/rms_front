import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import SSbutton from "src/common/components/button/SSbutton.jsx";
import AdminMemberTable from "./AdminMemberTable.jsx";
import AdminMemberAddModal from "./AdminMemberAddModal.jsx";

const AdminMember = () => {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false)




    return (
        <div>


            <div className={'flex gap-[6px]'}>
                <SSbutton
                    onClick={() => {setModalVisible(true)}}

                >회원 추가</SSbutton>


                {/* todo 2차 기능 구현 예정*/}
                {/* 테이블 왼쪽에 select 추가후 버튼 누를시 메시지 입력 모달 */}
                <SSbutton
                    disabled = {true}
                >알림 보내기</SSbutton>
            </div>

            <div>
                <AdminMemberTable/>
            </div>


            <AdminMemberAddModal
                modalVisible ={modalVisible}
                setModalVisible = {setModalVisible}
            />



        </div>
    );
};

export default AdminMember;
