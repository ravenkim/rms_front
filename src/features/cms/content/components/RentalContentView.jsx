import React, {useEffect, useState} from 'react';
import SSeditor from "src/common/components/editor/SSeditor.jsx";
import SSwrapper from "src/common/components/wrapper/SSwrapper.jsx";
import SSbutton from "src/common/components/button/SSbutton.jsx";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {cmsAction} from "src/features/cms/cmsReducer.jsx";
import CommentContainer from "src/common/components/comment/CommentContainer.jsx";
import {Tabs} from "antd";
import SSsectionWrap from "src/common/components/wrapper/SSsectionWrap.jsx";

const RentalContentView = () => {

    const dispatch = useDispatch()

    const {
        detail,
        contentDetailImg,
        readOnly,
        activeTab,
    } = useSelector(({router, cmsReducer}) => ({
            detail: cmsReducer.contentDetail.data,
            contentDetailImg: cmsReducer.contentDetailImg.data,
            readOnly: cmsReducer.contentDetail.data?.readOnly,
            activeTab: cmsReducer.tab

        }),
        shallowEqual
    )


    const [userId, setUserId] = useState()
    const [contentId, setContentId] = useState()


    useEffect(() => {
        if (!activeTab)
            dispatch(cmsAction.setTab("lecture"))
    }, []);


    useEffect(() => {
        if (detail) {
            //state 세팅
            const data = detail?.contentDtl


            setContentNm(data?.contentNm)
            setContentDesc(data?.contentDesc)
            setCateNm(data?.cateNm)

            setContentHtml(data?.contentHtml)
            setRentalStatNm(data?.rentalStatNm)
            setContentId(data?.contentId)

            if (detail?.boardFreeFields) {
                const obj = detail?.boardFreeFields
                const arr = Object.values(obj);
                const madeFreeField = arr.map((item, index) => (
                    item.type === 'input' ?
                        <li key={index}>
                            <h6
                                className={"text-[#ffffff]"}

                            >
                                {item.label}: {item.value}
                            </h6>
                        </li>
                        : null


                ))
                setFreeFieldsData(madeFreeField);


            }


        }
    }, [detail]);

    // 제목
    const [contentNm, setContentNm] = useState('')
    // 설명
    const [contentDesc, setContentDesc] = useState('')
    // 카테고리
    const [cateNm, setCateNm] = useState('')


    // 본문
    const [contentHtml, setContentHtml] = useState(null)


    const [rentalStatNm, setRentalStatNm] = useState('')

    //자유공간
    const [freeFieldsData, setFreeFieldsData] = useState()

    const initComments = [{
        commentId: '1',
        parentCommentId: '',
        author: '나루토',
        userId: '1',
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        content: <p>테스트 텍스트1</p>,
        regDt: '2024-01-23 10:23:34',
    }, {
        commentId: '2',
        parentCommentId: '1',
        author: '나루토',
        userId: '1',
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        content: <p>테스트 텍스트2</p>,
        regDt: '2024-01-23 10:23:34',
    }, {
        commentId: '3',
        parentCommentId: '1',
        author: '나루토',
        userId: '1',
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        content: <p>테스트 텍스트3</p>,
        regDt: '2024-01-23 10:23:34',
    }, {
        commentId: '4',
        parentCommentId: '',
        author: '나루토',
        userId: '1',
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        content: <p>테스트 텍스트4</p>,
        regDt: '2024-01-23 10:23:34',
    }, {
        commentId: '5',
        parentCommentId: '',
        author: '나루토',
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        content: <p>테스트 텍스트5</p>,
        regDt: '2024-01-23 10:23:34',
    }, {
        commentId: '6',
        parentCommentId: '5',
        author: '나루토',
        userId: '1',
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        content: <p>테스트 텍스트6</p>,
        regDt: '2024-01-23 10:23:34',
    }, {
        commentId: '7',
        parentCommentId: '',
        author: '나루토',
        userId: '1',
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        content: <p>테스트 텍스트7</p>,
        regDt: '2024-01-23 10:23:34',
    }, {
        commentId: '8',
        parentCommentId: '',
        author: '나루토',
        userId: '1',
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        content: <p>테스트 텍스트8</p>,
        regDt: '2024-01-23 10:23:34',
    }, {
        commentId: '9',
        parentCommentId: '',
        author: '나루토',
        userId: '1',
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        content: <p>테스트 텍스트9</p>,
        regDt: '2024-01-23 10:23:34',
    }, {
        commentId: '10',
        parentCommentId: '',
        author: '나루토',
        userId: '1',
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        content: <p>테스트 텍스트10</p>,
        regDt: '2024-01-23 10:23:34',
    }, {
        commentId: '11',
        parentCommentId: '9',
        author: '나루토',
        userId: '1',
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        content: <p>테스트 텍스트11</p>,
        regDt: '2024-01-23 10:23:34',
    }, {
        commentId: '12',
        parentCommentId: '9',
        author: '나루토',
        userId: '1',
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        content: <p>테스트 텍스트12</p>,
        regDt: '2024-01-23 10:23:34',
    }, {
        commentId: '13',
        parentCommentId: '',
        author: '나루토',
        userId: '1',
        avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
        content: <p>테스트 텍스트13</p>,
        regDt: '2024-01-23 10:23:34',
    }].map(item => ({...item, children: []}))

    const [initialComments, setInitialComments] = useState(initComments || [])

    const comments = initialComments.filter(item => !item.parentCommentId).map(parent => ({
        ...parent,
        children: initialComments.filter(child => child.parentCommentId === parent.commentId)
    }));

    console.log('comments', comments)


    return (
        <div
            className={'w-full flex items-center flex-col'}
        >
            <div
                className={'w-full bg-[#4f5ff5] bg-opacity-90 flex justify-center items-center min-h-[349px] '}
            >
                <div
                    className={'w-[63%] flex justify-between '}
                >
                    <SSwrapper
                        className={'w-[300px] h-[300px] mb-[20px] box-border flex justify-center items-center '}
                    >
                        <img src={contentDetailImg} alt="#" className={'max-w-[300px] max-h-[full]'}/>


                    </SSwrapper>


                    <div
                        className={'w-[calc(100%-320px)] mt-[20px] min-h-[100px]'}
                    >

                        <h5
                            className={"text-[#ffffff] mb-[15px]"}
                        >{cateNm}</h5>


                        <h1
                            className={"text-[#ffffff] mb-[40px]"}
                        >{contentNm}</h1>
                        <h5
                            className={"text-[#ffffff] mb-[40px]"}
                        >{contentDesc}</h5>


                        {/*자유 필드*/}


                        <ul

                            className={"text-[#ffffff]"}
                        >

                            {freeFieldsData}
                        </ul>


                    </div>
                </div>


            </div>

            {/*<div*/}
            {/*    style={{*/}
            {/*        width: '63%',*/}
            {/*        minHeight: '500px',*/}
            {/*        display: "flex",*/}
            {/*        flexDirection: "row",*/}
            {/*        justifyContent: "space-between"*/}
            {/*    }}*/}
            {/*>*/}
            <SSsectionWrap>
                <div className="flex space-x-[100px]">
                    <div
                        style={{
                            width: '58%',
                        }}

                    >
                        <div className={'mt-[40px]'}>
                            <SSwrapper className={'p-[30px] box-border'}>
                                <Tabs
                                    type=""
                                    size={'small'}
                                    activeKey={activeTab}
                                    onChange={(activeKey) => dispatch(cmsAction.setTab(activeKey))}
                                    rootClassName={'border-t-[1px] border-solid border-t-[#111321] box-border '}
                                    items={[
                                        {
                                            label: `강의 소개`,
                                            key: `lecture`,
                                            children: <SSeditor
                                                height={'90vh'}
                                                isEditMode={false}
                                                changeHandler={(contents) => {
                                                }}
                                                initContents={contentHtml}
                                            />,
                                        },
                                        {
                                            label: `댓글`,
                                            key: `comment`,
                                            children: <CommentContainer // TODO 댓글기록 넘기기
                                                contentId={contentId}
                                                comments={comments}
                                                setInitialComments={setInitialComments}>
                                            </CommentContainer>,
                                        }
                                    ]}
                                />
                            </SSwrapper>
                        </div>

                    </div>

                    <div
                        style={{
                            width: '38%',
                        }}
                    >
                        <div className="mt-[40px]">

                            <SSwrapper
                                style={{
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    padding: '20px'

                                }}

                            >
                                현재 상태: {rentalStatNm}

                                <SSbutton
                                    style={{marginTop: '20px'}}
                                    disabled={true}
                                > 대여하기(배치로 인하여 2차 예정) </SSbutton>


                                <SSbutton disabled={true} style={{marginTop: '10px'}}> 예약하기 (2차 개발 예정)</SSbutton>


                                {
                                    // 좋아요 버튼
                                    detail?.contentDtl?.likeYn === 'Y'
                                        ? <SSbutton
                                            style={{marginTop: '10px'}}
                                            danger
                                            onClick={() => {
                                                dispatch(cmsAction.dislikeContent({contentId: contentId}))
                                            }}

                                        > ❤️ 진짜로 이렇게 멋진걸 취소 한다구요? </SSbutton>
                                        : <SSbutton
                                            onClick={() => {
                                                dispatch(cmsAction.likeContent({contentId: contentId}))
                                            }}
                                            style={{marginTop: '10px'}}
                                        >
                                            ♡ 좋아요
                                        </SSbutton>
                                }

                            </SSwrapper>
                        </div>


                        {/*수정 권한 있는지에 따라 보여줌*/}
                        {!readOnly &&
                            <div
                                style={{}}
                            >
                                디자인 변경 예정

                                <SSbutton disabled={true}> 수정 (2차 예정)</SSbutton>
                                <SSbutton disabled={true} danger> 삭제 (2차 예정) </SSbutton>
                            </div>
                        }


                    </div>
                </div>

            </SSsectionWrap>
        </div>

    );
};

export default RentalContentView;
