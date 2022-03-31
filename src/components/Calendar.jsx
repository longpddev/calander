import React, { useMemo, useState, useContext, createContext, memo } from 'react'
import CalendarBody from './CalendarBody'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import moment from 'moment'

export const calendarContext = createContext();

const Calendar = ({ timeDefault, onChange }) => {
    const [ time, setTime ] = useState(() => timeDefault.clone())
    const [ isShowMonth, setIsShowMonth ] = useState(false);
    const [ isShowYear, setIsShowYear ] = useState(false);
    const handleChange = (timeChange) => {
        setTime(timeChange)
        onChange && onChange(timeChange)
        console.log(timeChange)
    }
    return (
        <calendarContext.Provider value={{
            time, handleChange, isShowMonth, setIsShowMonth, isShowYear, setIsShowYear
        }}>
            <div className="overflow-hidden rounded-lg bg-white border border-gay-200 shadow-lg p-4 relative">

                <div className="space-x-2 mb-3">
                    <button 
                        className="font-semibold px-3 py-1 rounded-lg bg-gray-100"
                        onClick={() => handleChange(moment())}
                    >
                        Today
                    </button>
                    <button 
                        className="font-semibold px-3 py-1 rounded-lg bg-gray-100"
                        onClick={() => handleChange(moment().add(1, 'D'))}
                    >
                        Tomorrow
                    </button>
                    <button 
                        className="font-semibold px-3 py-1 rounded-lg bg-gray-100"
                        onClick={() => handleChange(moment().add(2, 'D'))}
                    >
                        In 2 Days
                    </button>
                </div>
                <div className="mb-3 flex ">
                    <button 
                        className="rounded-lg p-2 shadow-lg bg-white flex-none"
                        onClick={() => handleChange(time.subtract(1, 'M').clone())}
                    >
                        <MdNavigateBefore fontSize="large" />
                    </button>
                    <div className="flex-1 text-center px-2 font-medium flex justify-center items-center">
                        <span className="hover:underline no-select pointer" onClick={() => setIsShowMonth(true)}>{time.format('MMMM')}</span>&nbsp;
                        <span className="hover:underline no-select pointer" onClick={() => setIsShowYear(true)}>{time.format('YYYY')}</span>
                    </div>
                    <button className="rounded-lg p-2 shadow-lg bg-white flex-none">
                        <MdNavigateNext fontSize="large" onClick={() => handleChange(time.add(1, 'M').clone())}/>
                    </button>
                </div>
                <CalendarBody 
                    time={time}
                />

                <div className="space-x-2 mt-2 flex">
                    <button className="flex-1 rounded-lg px-2 py-1 shadow-md button-action">Remove</button>
                    <button className="flex-1 rounded-lg px-2 py-1 shadow-md button-action active">Done</button>
                </div>
                <CalendarSetMonth />
                <CalendarSetYear />
            </div>
        </calendarContext.Provider>
    )
}

const CalendarSetMonth = memo(() => {
    const { time, handleChange, isShowMonth, setIsShowMonth, isShowYear, setIsShowYear } = useContext(calendarContext);
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    return (
        <div className="absolute inset-0 z-2 bg-white flex flex-col p-4 transition-all" style={{
            left: isShowMonth ? "0" : "150%"
        }}>
            <div className="mb-3 flex ">
                <button 
                    className="rounded-lg p-2 shadow-lg bg-white flex-none"
                    onClick={() => setIsShowMonth(false)}
                >
                    <MdNavigateBefore fontSize="large" />
                </button>
                <div className="flex-1 text-center px-2 font-medium flex justify-center items-center">
                    <span className="no-select pointer">{time.format('MMMM')}</span>&nbsp;
                    <span className="hover:underline no-select pointer" onClick={() => setIsShowYear(true)}>{time.format('YYYY')}</span>
                </div>
                <button className="rounded-lg p-2 shadow-lg bg-white flex-none opacity-0">
                    <MdNavigateNext fontSize="large"/>
                </button>
            </div>
            <div className="flex flex-wrap flex-1 mt-4">
                {Array(12).fill(0).map((_, index) => (
                    <button className="button-action w-1/2 py-1 text-sm" onClick={() => handleChange(time.set('month', index).clone())}>
                        {monthNames[index]} {time.year()}
                    </button>
                ))}
            </div>
        </div>
    )
})

const CalendarSetYear = memo(() => {
    const { time, handleChange, isShowYear, setIsShowMonth, setIsShowYear } = useContext(calendarContext);
    const minYear = time.year() - 15;
    return (
        <div className="absolute inset-0 z-3 bg-white flex flex-col p-4 transition-all max-h-[100%] overflow-auto" style={{
            left: isShowYear ? "0" : "150%"
        }}>
            <div className="mb-3 flex ">
                <button 
                    className="rounded-lg p-2 shadow-lg bg-white flex-none"
                    onClick={() => setIsShowYear(false)}
                >
                    <MdNavigateBefore fontSize="large" />
                </button>
                <div className="flex-1 text-center px-2 font-medium flex justify-center items-center">
                    <span 
                        onClick={() => {
                            setIsShowMonth(true)
                            setIsShowYear(false)
                        }}
                        className="hover:underline no-select pointer"
                    >{time.format('MMMM')}</span>&nbsp;
                    <span className="no-select pointer">{time.format('YYYY')}</span>
                </div>
                <button className="rounded-lg p-2 shadow-lg bg-white flex-none opacity-0">
                    <MdNavigateNext fontSize="large"/>
                </button>
            </div>
            <div className="flex flex-wrap flex-1 mt-4">
                {Array(30).fill(0).map((_, index) => (
                    <button className="button-action w-1/2 py-1 text-sm" onClick={() => handleChange(time.set('year', minYear + index).clone())}>
                        { minYear + index}
                    </button>
                ))}
            </div>
        </div>
    )
})

export default memo(Calendar)