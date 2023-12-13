import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {push} from "redux-first-history";
import {adminAction} from "/src/features/admin/adminReducer.jsx";

const SubMenuButtonWrap = ({
                               text,
                               tab,
                                setMenuOpen
                           }) => {
    const dispatch = useDispatch()


    const [mouseOver, setMouseOver] = useState(false)


    return (
        <li
            onClick={() => {
                dispatch(adminAction.setTab(tab))

                dispatch(push('/admin'))

                setMenuOpen(false)
            }}
            onMouseOver={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            style={{
                cursor: "pointer"
            }}
        >
            <div
                style={{
                    width: '364px',
                    height: '67px',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: mouseOver ? "wheat" : "white",
                    boxSizing: "border-box",
                    flexDirection: "column"

                }}
            >
                {text}

            </div>

        </li>
    );
};

export default SubMenuButtonWrap;
