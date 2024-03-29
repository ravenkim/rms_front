import React, {useState, Fragment, useMemo} from 'react';
import {
    Calendar
} from 'react-big-calendar'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjsLocalizer from 'react-big-calendar/lib/localizers/dayjs';
import SSbutton from "../button/SSbutton.jsx";
import {DatePicker, message, Space} from "antd";
import iconInfo from 'src/assets/img/icon_info.svg'
import Swal from "sweetalert2/src/sweetalert2.js";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

const Toolbar = ({date, onNavigate}) => {

    return (
        <div className="rbc-toolbar">
          <span className="rbc-btn-group relative w-full flex justify-center items-center">
              <div>

                  <SSbutton onClick={() => onNavigate('PREV')}>이전</SSbutton>
                  <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</span>
                  <SSbutton onClick={() => onNavigate('NEXT')}>다음</SSbutton>
              </div>
              <div className={'absolute left-0 top-0'}>
                  <SSbutton onClick={() => onNavigate('TODAY')}>오늘로 돌아가기</SSbutton>
              </div>

          </span>
        </div>
    )
}

const SSCalendar = () => {

    const dispatch = useDispatch()

    const {
        user
    } = useSelector(({userReducer})=>({
        user:userReducer.user
    }),
        shallowEqual
    )

    const [events,setEvents] = useState([ // 예약목록 -- 나중에 데이터 리덕스로 불러오기로 변경
    {
        'title': 'All Day Event very long title',
        'allDay': true,
        'start': new Date(2024, 1, 1), // monthIndex는 0부터 1월
        'end': new Date(2024, 1, 10) // end date는 -1값이 실제 표시값
    },
    {
        'title': 'Long Event',
        'start': new Date(2024, 1, 7),
        'end': new Date(2024, 1, 10)
    },

    {
        'title': 'DTS STARTS',
        'start': new Date(2024, 1, 13, 0, 0, 0),
        'end': new Date(2024, 1, 20, 0, 0, 0)
    },

    {
        'title': 'DTS ENDS',
        'start': new Date(2024, 1, 6, 0, 0, 0),
        'end': new Date(2024, 1, 13, 0, 0, 0)
    },

    {
        'title': 'Some Event',
        'start': new Date(2024, 1, 9, 0, 0, 0),
        'end': new Date(2024, 1, 9, 0, 0, 0)
    },
    {
        'title': 'Conference',
        'start': new Date(2024, 3, 11),
        'end': new Date(2024, 3, 13),
        desc: 'Big conference for important people'
    },
    {
        'title': 'Meeting',
        'start': new Date(2024, 3, 12, 10, 30, 0, 0),
        'end': new Date(2024, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
        'title': 'Lunch',
        'start': new Date(2024, 3, 12, 12, 0, 0, 0),
        'end': new Date(2024, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch'
    },
    {
        'title': 'Meeting',
        'start': new Date(2024, 3, 12, 14, 0, 0, 0),
        'end': new Date(2024, 3, 12, 15, 0, 0, 0)
    },
    {
        'title': 'Happy Hour',
        'start': new Date(2024, 2, 12, 17, 0, 0, 0),
        'end': new Date(2024, 2, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
    },
    {
        'title': 'Dinner',
        'start': new Date(2024, 3, 12, 20, 0, 0, 0),
        'end': new Date(2024, 3, 12, 21, 0, 0, 0)
    },
    {
        'title': 'Birthday Party',
        'start': new Date(2015, 3, 13, 7, 0, 0),
        'end': new Date(2015, 3, 13, 10, 30, 0)
    },
    {
        'title': 'Birthday Party 2',
        'start': new Date(2015, 3, 13, 7, 0, 0),
        'end': new Date(2015, 3, 13, 10, 30, 0)
    },
    {
        'title': 'Birthday Party 3',
        'start': new Date(2015, 3, 13, 7, 0, 0),
        'end': new Date(2015, 3, 13, 10, 30, 0)
    },
    {
        'title': 'Late Night Event',
        'start': new Date(2015, 3, 17, 19, 30, 0),
        'end': new Date(2015, 3, 18, 2, 0, 0)
    },
    {
        'title': 'Multi-day Event',
        'start': new Date(2015, 3, 20, 19, 30, 0),
        'end': new Date(2015, 3, 22, 2, 0, 0)
    }
]);

    const localizer = dayjsLocalizer(dayjs); // dayjs로 날짜 불러오기
    const [isModalVisible, setIsModalVisible] = useState(false); // 예약객체 나타나게 하기
    const [selectedRange, setSelectedRange] = useState({ start: null, end: null }); // 날짜 선택하기

    const components = useMemo(() => ({
            toolbar: Toolbar
        }),
        []);

    // 날짜 겹침 확인 함수
    const isOverlap = (newStart, newEnd) => {
        return events.some(event => {
            const eventStart = dayjs(event.start);
            const eventEnd = dayjs(event.end);
            const newStartDayjs = dayjs(newStart);
            const newEndDayjs = dayjs(newEnd);
            return (
                newStartDayjs.isSameOrBefore(eventEnd) && newEndDayjs.isSameOrAfter(eventStart)
            );
        });
    };

    const handleOk = () => {
        // 14일을 초과하지 않게 하기!!
        const startDayjs = dayjs(selectedRange.start);
        const endDayjs = dayjs(selectedRange.end);
        const daysDiff = endDayjs.diff(startDayjs, 'day'); // 간격이 14일을 초과하는지 확인하기

        if (daysDiff > 13 || isOverlap(selectedRange.start, selectedRange.end)) { // 14일 미만이면서 이미 예약되어 있지 않은 경우에만 예약진행하기 위해 작성
            let errorMessage = daysDiff > 13 ? '예약 기간은 최대 14일을 초과할 수 없습니다. 다시 선택해주세요.' : '예약하고자 하는 날짜는 이미 예약중입니다. 다시 선택해주세요.';
            // 에러 메시지 띄우기
            message.error(errorMessage);
        } else {
            // 예약 진행
            const newEvent = {
                title: user.userNm, // 사용자 이름 나타내는게 제일 좋을듯?
                start: selectedRange.start,
                end: selectedRange.end,
                allDay: false
            };
            setEvents((currentEvents) => [...currentEvents, newEvent]);
            setIsModalVisible(false);
            // to-do 성공 메시지 추가하기

            // then !!!
            Swal.fire({
                title:"예약 성공",
                text:"예약이 완료되었습니다. 예약목록에서 확인해주세요.",
                icon:"success"
            })
            // then !!!
            // 예약 캘린더 팝업 닫기 추가
        }
    };

    const handleSelectSlot = ({ start, end }) => {
        setSelectedRange({ start, end });
        setIsModalVisible(true); // 오른쪽 선택창 열기
    };

    return (
        <>
            <div className={'flex justify-start items-start h-full ' + (isModalVisible ? 'gap-[20px] ' : '')}>
                <Calendar
                    localizer={localizer}
                    events={events} // 달력에 이미 예약되어 있는 날 표시
                    startAccessor="start"
                    endAccessor="end"
                    components={components}
                    selectable // 날짜 클릭 가능
                    showMultiDayTimes
                    step={60}
                    views={{
                        /*day: true, */
                        month: true
                    }}
                    onSelectSlot={handleSelectSlot} // 달력의 빈 곳을 클릭하면 실행 -- 새로운 예약 생성하기

                    className={'w-full min-h-[500px] h-auto'} // 스타일 정의
                />
                <div className={'flex flex-col justify-between overflow-hidden gap-[8px] box-border border-[#ECEDF0] border-[1px] ' + (isModalVisible ? 'w-auto min-w-[330px] h-full min-h-[500px] border-solid p-[10px]' : 'w-0 h-0 p-[0px] ')}>
                    <div className={'flex flex-col gap-[6px]'}>
                        <div className={'flex flex-col text-[#232433] '}>
                            <p className={'mb-[8px]'}>예약 날짜를 지정해주세요.</p>
                            <span className={'text-[#FF4040]'}>1회 예약은 최대 14일까지 가능합니다. </span>
                            <span className={'break-keep mb-[8px]'}>언제든지 취소할 수 있어요, <br/>예약목록에서 확인해주세요.</span>
                        </div>
                        <div className={'flex flex-col gap-[8px]'}>
                            <Space wrap>
                                <DatePicker.RangePicker
                                    format={"YYYY-MM-DD"}
                                    onChange={(dates, dateStrings)=>{
                                        setSelectedRange({
                                            start:dates ? dates[0].toDate() : null,
                                            end: dates ? dates[1].toDate() : null
                                        })
                                    }}
                                />
                            </Space>
                            <div className={'flex justify-start gap-[6px]'}>
                                <SSbutton onClick={handleOk}>예약하기</SSbutton>
                                <SSbutton onClick={()=>{
                                    setIsModalVisible(false)
                                    // 닫기 누른 후 데이트피커 value 값 초기화하기
                                }}>접기</SSbutton>
                            </div>
                        </div>
                    </div>
                    <div className={'w-full flex gap-[6px] justify-start items-start'}>
                        <img src={iconInfo} alt="#" className={'w-[20px]'}/><span className={'text-[#51525C] break-keep'}>문의사항이 있으면 언제든지 알려주세요. 최대한 빠르게 확인할게요! :)</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SSCalendar;

