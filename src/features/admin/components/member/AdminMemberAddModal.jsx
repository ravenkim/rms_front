import React, {useState} from 'react';
import {Input, Modal, Select} from "antd";
import SSlabelForInput from "../../../../common/components/label/SSlabelForInput.jsx";

const AdminMemberAddModal = ({
    setModalVisible,
    modalVisible
                             }) => {


    const [modalOpen, setModalOpen] = useState(false)


    const addHandler = () => {
        
        console.log('추가됨')
        setModalVisible(false)
    }

    const cancelHandler = () => {
        setModalVisible(false)
         console.log('취소됨')
    }


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    return (
            <Modal
                title="사용자 추가"
                open={modalVisible}
                onOk={addHandler}
                onCancel={cancelHandler}
                okText="추가하기"
                cancelText="취소"
                width={800}
            >
                <SSlabelForInput
                    label ={'이름'}
                >
                    <Input

                    />
                </SSlabelForInput>
                <SSlabelForInput
                    label ={'이메일'}
                >
                    <Input

                    />
                </SSlabelForInput>
                <SSlabelForInput
                    label ={'권한'}
                >
                    <Select/>
                </SSlabelForInput>
                <SSlabelForInput
                    label ={'재직 상태'}
                >
                    <Input

                    />
                </SSlabelForInput>

            </Modal>
    );
};

export default AdminMemberAddModal;
