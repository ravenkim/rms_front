import React, {useState} from 'react';
import {Avatar, Form, Button, List, Input} from 'antd';
import moment from 'moment';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {formatDate} from "../../utils/dataProcessingUtils.jsx";

const {TextArea} = Input;

const CommentList = ({comments}) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({onChange, onSubmit, submitting, value}) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);


const Comment = ({avatar, content, author, datetime, onReplyClick, children}) => (
    <div className="flex">
        <div className="flex-shrink-0 mr-1">
            <Avatar
                className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                src={avatar}
                alt=""/>
        </div>
        <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
            {(author && datetime) && <>
                <strong>{author}</strong>
                <span className="text-xs text-gray-400">{formatDate(datetime)}</span>
            </>}
            {content}
            {(author && datetime) &&
                <span
                    className="text-xs text-gray-400 hover:text-slate-600"
                    onClick={() => {
                    }}
                >
                    Reply to
                </span>
            }
            {children}

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



const SScomment = ({
                       contentId,
                       initialComments
                   }) => {
    const [comments, setComments] = useState(initialComments || []);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);



    const {
        userNm,
        userProfileImg,

    } = useSelector(({userReducer}) => ({
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
                author: userNm,
                avatar: userProfileImg,
                content: value,
                // content: <div className='whitespace-pre-wrap break-all overflow-auto'>{value}</div>,
                datetime: date,
            };
            setComments([newComment, ...comments]);
            setSubmitting(false);
            setValue('');
        }, 1000);
    };

    const handleChange = e => {
        setValue(e.target.value);
    };

    const handleReplyClick = (commentId) => {
        setReplyingTo(commentId);
        // TODO 대댓로직
    };

    return (
        <div>
            {comments.length > 0 && <CommentList comments={comments}/>}
            <Comment
                avatar={userProfileImg}
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
                onReplyClick={() => handleReplyClick(commentId)}
            />
        </div>
    );
};

export default SScomment;
