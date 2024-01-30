import React, {useEffect, useState} from 'react';
import SSeditor from "src/common/components/editor/SSeditor.jsx";
import SSwrapper from "src/common/components/wrapper/SSwrapper.jsx";
import SSbutton from "src/common/components/button/SSbutton.jsx";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {cmsAction} from "src/features/cms/cmsReducer.jsx";

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
            style={{
                width: '100%',
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <div
                className={'w-full '}
                style={{
                    backgroundColor: "rgba(79,95,245,0.9)",
                    display: 'flex',
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: 'center',
                    minHeight: '349px'
                }}

            >
                <div
                    style={{
                        width: '63%',
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <SSwrapper
                        style={{
                            width: '300px',
                            height: '300px',
                            marginBottom: '20px',
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={contentDetailImg} alt="#" className={'max-w-[300px]] max-h-[full]'}/>


                    </SSwrapper>


                    <div
                        style={{
                            width: 'calc(100% - 320px)',
                            height: 100,
                            marginTop: '20px',
                            color: "red"
                        }}
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
                        style={{marginTop: '20px'}}
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
                        height: '500px',
                        display: "flex",
                        flexDirection: 'column'
                    }}
                >


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



                    {/*수정 권한 있는지에 따라 보여줌*/}
                    {!readOnly &&
                        <div
                            style={{
                        }}
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