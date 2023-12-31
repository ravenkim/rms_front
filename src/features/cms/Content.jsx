import React, {useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import SSeditor from "../../common/components/editor/SSeditor.jsx";
import RentalContentView from "./content/rental/RentalContentView.jsx";
import background from "../../common/components/layout/components/Background.jsx";
import {cmsAction} from "./cmsReducer.jsx";

const Content = () => {

    const dispatch = useDispatch()


    const {
        path,
        contentype,
    } = useSelector(({router, cmsReducer}) => ({
            path: router.location?.pathname,
            contentype: cmsReducer.contentDetail.data,

        }),
        shallowEqual
    )


    const [editMode, setEditMode] = useState(false)


    //1. url에서 아이디 확인
    const [contentId, setContentId] = useState(null)

    useEffect(() => {
        if (path) {
            const data = path.split('/')
            setContentId(Number(data[2]))
        }

    }, [path]);


    //2. 아이디 확인하고 대이터 요청
    useEffect(() => {
        if (contentId) {
            dispatch(cmsAction.getContentDetail(contentId))
            dispatch(cmsAction.getContentDetailImg(contentId))

        }
    }, [contentId]);


    //3. 데이터 들어오면 타입 설정
    const [type, setType] = useState()


    useEffect(() => {
        if (contentype) {
            setType(contentype?.boardInfo?.contentViewType)

        }
    }, [contentype]);


    // useEffect(() => {
    //     console.log(type)
    // }, [type]);


    const [mode, setMode] = useState()


    return (
        <div
            style={{
                backgroundColor: '#F5F5F5',
                width: ' 100%'
            }}
        >

            {/*상세 타입에 따라 나누는 구간*/}
            {type === 'rental' &&
                <RentalContentView/>
            }
        </div>


    );
};

export default Content;
