import React, {useState} from 'react';
import {Avatar, Form, Button, List, Input, Divider} from 'antd';
// import moment from 'moment';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {formatDate} from "../../utils/dataProcessingUtils.jsx";
import SSbutton from "../button/SSbutton.jsx";
import comment_icon from 'src/assets/img/comment_icon.svg'

const {TextArea} = Input;

const IconText = ({src, text}) => (
    <span className="flex content-center text-[#4f5ff5] text-xs">
        <img src={src} className="mr-2"/>
        {text}
    </span>
);

const CommentList = ({comments, isParent}) => {

    const [openReply, setOpenReply] = useState(false)
    const [replyingTo, setReplyingTo] = useState(null);

    const header = `${comments.length}개의 댓글`

    return (
        <List
            dataSource={comments}
            header={isParent && header}
            pagination={isParent ? {pageSize: 5, size: "small"} : false}
            itemLayout="vertical"
            size={"small"}
            split={false}
            renderItem={(item, index) => (
                <>
                    <List.Item className={`${isParent ? "px-0" : "px-3"} py-3`}
                               key={item.commentId}
                               actions={isParent && [
                                   <IconText src={comment_icon} text={'댓글보기'}/>,
                                   <IconText src={comment_icon} text={'댓글달기'}/>,
                               ]}
                    >
                        {/*<List.Item.Meta*/}
                        {/*    avatar={<Avatar src={item.avatar} size={40}/>}*/}
                        {/*    title={<div className="text-sm mb-0 pb-0">{item.author}</div>}*/}
                        {/*    description={<div className="text-xs mt-0 pt-0">{item.regDt}</div>}*/}
                        {/*/>*/}

                        <InitialComment {...item} replyingTo={replyingTo} setReplyingTo={setReplyingTo}/>

                    </List.Item>
                    {isParent && item.children.length === 0 && <hr/>}
                    {!isParent && index != comments.length - 1 && <hr/>}
                    {item.children.length > 0 &&
                        <div className="ml-4 rounded-lg outline outline-[#ECEDF0] outline-1 bg-[#F5F5F5]/80">
                            <CommentList comments={item.children} isParent={false}/></div>}
                </>
            )}
        />
    )
}

const CommentEditor = ({contentId, replyingTo, setInitialComments}) => {

    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const {
        userId,
        userNm,
        userProfileImg,
    } = useSelector(({userReducer}) => ({
            userId: userReducer.user.userId,
            userNm: userReducer.user.userNm,
            userProfileImg: userReducer.userProfileImg.data,
        }),
        shallowEqual
    )


    const handleSubmit = () => {
        if (!value) return;

        setSubmitting(true);

        setTimeout(() => {

            // const date = moment().format('YYYY-MM-DD HH:mm:ss');
            const date = ('1234-12-12')
            const newComment = {
                contentId: contentId,
                parentCommentId: replyingTo,
                author: userNm,
                userId: userId,
                avatar: userProfileImg,
                content: value,  // TODO 줄바꿈 표시 되게 렌더
                // content: <div className='whitespace-pre-wrap break-all overflow-auto'>{value}</div>,
                datetime: date,
                delYn: delYn,
            };
            // TODO 댓글/대댓글 전송 로직


            setSubmitting(false);
            setValue('');
        }, 1000);
    };

    // TODO 수정로직?

    const handleChange = e => {
        setValue(e.target.value);
    };

    return (
        // <form action="" method={'post'} encType={"application/json"} onSubmit={handleSubmit}>
        //     <div className="container mx-auto rounded-lg border border-[#acacba] bg-white p-0">
        //     <textarea className="w-full resize-none rounded-lg border-0 p-3 focus:outline-none" rows={2}
        //               onChange={handleChange} value={value} placeholder="여기에 댓글을 입력하세요."></textarea>
        //
        //         <div className="border-t border-gray-200"></div>
        //
        //         <div className="mt-1.5 flex justify-end space-x-2 mr-2 mb-1.5">
        //             <button
        //                 className="text-sm rounded-lg bg-[#e3e4e8] px-6 py-1 text-[#51525c] hover:bg-gray-300 focus:outline-none">취소
        //             </button>
        //             {/*<button*/}
        //             {/*    className="text-sm rounded-lg bg-[#4f5ff5] px-6 py-1 text-white hover:bg-indigo-700 focus:outline-none">등록하기*/}
        //             {/*</button>*/}
        //             <SSbutton htmlType={"submit"} loading={submitting} type="primary">등록하기</SSbutton>
        //         </div>
        //     </div>
        // </form>

        <Comment
            avatar={userProfileImg}
            content={
                <div>
                    <Form.Item>
                        <TextArea rows={4} onChange={handleChange} value={value}/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                            Add Comment
                        </Button>
                    </Form.Item>
                </div>
            }
        />
    )
};

const InitialComment = ({
                            commentId, parentCommentId, author, userId, avatar, content, regDt, children,
                            replyingTo, setReplyingTo
                        }) => {

    // TODO 댓글삭제 로직

    return (
        <div className="flex-1">
            <div className="flex">
                <div className="flex-shrink-0">
                    <Avatar
                        className="rounded-full w-10 h-10"
                        src={avatar}
                        alt=""/>
                </div>
                <div className="flex-1 px-2 mb-3 leading-tight">
                    <strong className="text-[12px]">{author}</strong><br/>
                    <span className="text-[10px] text-gray-400">{formatDate(regDt)}</span>
                </div>
            </div>
            <div className="text-base">{content}</div>
            {/*{!parentCommentId &&*/}
            {/*    <span className="text-xs text-gray-400 hover:text-slate-600"*/}
            {/*          onClick={() => {*/}
            {/*              setReplyingTo(commentId === replyingTo ? '' : commentId)*/}
            {/*          }}*/}
            {/*    >Reply to</span>*/}
            {/*}*/}

            {/*{children.length > 0 && <CommentList comments={children} isParent={false}/>}*/}

            {commentId === replyingTo && <>
                {/*<CommentEditor replyingTo={replyingTo}/>*/}
            </>}
        </div>
    )
}

const Comment = (
    {
        avatar, info, content
    }
) => {


    return (
        <div className="flex">
            <div className="flex-shrink-0 mr-0">
                <Avatar
                    className="mt-2 rounded-full w-10 h-10 sm:w-10 sm:h-10"
                    src={avatar}
                    alt=""/>
            </div>
            <div className="flex-1 px-2 py-2 mb-3 sm:px-6 sm:py-4 leading-tight">
                <strong className="text-sm">{author}</strong><br/>
                <span className="text-xs text-gray-400">{formatDate(regDt)}</span>

                {/*<div className="mt-4 flex items-center">*/}
                {/*    <div className="flex -space-x-2 mr-2">*/}
                {/*        <img className="rounded-full w-6 h-6 border border-white"*/}
                {/*             src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"*/}
                {/*             alt="">*/}
                {/*            <img className="rounded-full w-6 h-6 border border-white"*/}
                {/*                 src="https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"*/}
                {/*                 alt="">*/}
                {/*    </div>*/}
                {/*    <div className="text-sm text-gray-500 font-semibold">*/}
                {/*        5 Replies*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            {content}
        </div>
    );
}


const CommentContainer = ({
                              contentId,
                              comments,
                              setInitialComments
                          }) => {

    return (
        <div>
            {comments.length > 0 && <CommentList comments={comments} isParent={true}/>}
            {/*<CommentEditor contentId={contentId} setInitialComments={setInitialComments}/>*/}
        </div>
    );
};

export default CommentContainer;
