import React, {useEffect, useState} from 'react';
import SSeditor from "src/common/components/editor/SSeditor.jsx";
import SSwrapper from "src/common/components/wrapper/SSwrapper.jsx";
import SSbutton from "src/common/components/button/SSbutton.jsx";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {cmsAction} from "src/features/cms/cmsReducer.jsx";
import SScomment from "../../../../common/components/comment/SScomment.jsx";

const RentalContentView = () => {

    const dispatch = useDispatch()

    const {
        detail,
        contentDetailImg,
        readOnly,
    } = useSelector(({router, cmsReducer}) => ({
            detail: cmsReducer.contentDetail.data,
            contentDetailImg: cmsReducer.contentDetailImg.data,
            readOnly: cmsReducer.contentDetail.data?.readOnly


        }),
        shallowEqual
    )


    const [userId, setUserId] = useState()
    const [contentId, setContentId] = useState()


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

            <div
                style={{
                    width: '63%',
                    minHeight: '500px',
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <div
                    style={{
                        width: '58%',
                    }}

                >
                    <div
                        className={'mt-[40px]'}
                    ><SSeditor
                        height={'90vh'}
                        isEditMode={false}
                        changeHandler={(contents) => {
                        }}
                        initContents={contentHtml}

                    /></div>

                </div>

                <div
                    style={{
                        width: '38%',
                    }}
                >
                    <div class="mt-[40px]">

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

                        <SSwrapper
                            style={{
                                width: '100%',
                                boxSizing: 'border-box',
                                padding: '20px'
                            }}
                        >
                            (개발중)댓글창
                            <SScomment // TODO 댓글기록 넘기기
                                contentId={contentId}
                                initialComments={[{
                                    author: '나루토',
                                    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
                                    content: <p>하이루 방가</p>,
                                    datetime: '2024-01-23 10:23:34',
                                }]}></SScomment>
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
        </div>

    );
};

export default RentalContentView;
