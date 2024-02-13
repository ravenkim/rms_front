import React, {useState} from 'react';
import {Avatar, Form, Button, List, Input} from 'antd';
import moment from 'moment';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {formatDate} from "../../utils/dataProcessingUtils.jsx";

const {TextArea} = Input;

const CommentList = ({comments, isParent}) => {

    const [openReply, setOpenReply] = useState(false)
    const [replyingTo, setReplyingTo] = useState(null);

    const header = isParent ?
        `${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}` :
        `${openReply ? '댓글접기' : '댓글보기'}`;

    return (
        <List
            dataSource={comments}
            header={<div onClick={() => !isParent && setOpenReply((perv) => !perv)}>{header}</div>}
            itemLayout="horizontal"
            renderItem={props => isParent || openReply ?
                <InitialComment {...props} replyingTo={replyingTo} setReplyingTo={setReplyingTo}/> : <></>}
        />
    )
};

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

            const date = moment().format('YYYY-MM-DD HH:mm:ss');
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

const InitialComment = ({commentId, parentCommentId, author, userId, avatar, content, regDt, children,
                            replyingTo, setReplyingTo}) => {

    // TODO 댓글삭제 로직

    return (
        <Comment
            avatar={avatar}
            content={<>
                <strong>{author}</strong>
                <span className="text-xs text-gray-400">{formatDate(regDt)}</span>
                {content}
                {!parentCommentId &&
                    <span className="text-xs text-gray-400 hover:text-slate-600"
                          onClick={() => {setReplyingTo(commentId === replyingTo ? '' : commentId)}}
                    >Reply to</span>
                }
                {children.length > 0 && <CommentList comments={children} isParent={false}/>}

                {commentId === replyingTo && <>
                    <CommentEditor replyingTo={replyingTo}/>
                </>}
            </>
            }
        />
    )
}

const Comment = (
    {
        avatar, content
    }
) => {


    return (
        <div className="flex">
            <div className="flex-shrink-0 mr-1">
                <Avatar
                    className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                    src={avatar}
                    alt=""/>
            </div>
            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                {content}

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
            <CommentEditor contentId={contentId} setInitialComments={setInitialComments}/>
        </div>
    );
};

export default CommentContainer;
