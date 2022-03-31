import React, { useMemo, memo, useContext } from 'react'
import clsx from 'clsx'
import { calendarContext } from './Calendar'
const CalendarBody = () => {
    const { time, handleChange } = useContext(calendarContext);
    const timeClone = time.clone();
    // console.log({
    //     time, 
    //     day: time.date(),
    //     week: time.isoWeekday(),
    //     format: time.format('DD MM YYYY'),
    //     weekOfFirstDay: time.startOf('month').isoWeekday(),
    //     startOfMonth: time.startOf('month').date(),
    //     endOfMonth: time.endOf('month').date()
    // })
    const weekOfFirstDay = timeClone.startOf('month').isoWeekday()
    const endOfMonth = timeClone.endOf('month').date();
    const month = useMemo(() => {
        let point = 0;
        let index = 1;
        let array = [];
        let indexArray = -1;
        let isStart = false;
        let date = 0;
        while(index <= 36 || date < endOfMonth) {
            let label, value, isSelect = false, disabled = false
            if(point === 0 ) {
                array.push([]);
                indexArray++;
            }

            if(!isStart && weekOfFirstDay === point + 1) {
                isStart = true;
                date = 1;
            }

            if(isStart && date <= endOfMonth) {
                label = date
                value = date
                date++;
            }

            array[indexArray].push({
                label: label,
                value: value,
                isSelect: isSelect,
                disabled: disabled
            })
            point++;
            index++;
            if(point > 6) point = 0;
        }

        return array;
    }, [ time ])

    return (
        <div className="">
            <div className="flex w-full">
                <div className="w-1/7 py-2 text-center font-medium text-gray-400 no-select">Mo</div>
                <div className="w-1/7 py-2 text-center font-medium text-gray-400 no-select">Tu</div>
                <div className="w-1/7 py-2 text-center font-medium text-gray-400 no-select">We</div>
                <div className="w-1/7 py-2 text-center font-medium text-gray-400 no-select">Th</div>
                <div className="w-1/7 py-2 text-center font-medium text-gray-400 no-select">Fr</div>
                <div className="w-1/7 py-2 text-center font-medium text-gray-400 no-select">Sa</div>
                <div className="w-1/7 py-2 text-center font-medium text-gray-400 no-select">Su</div>
            </div>
            {month.map((week, index) => (
                <div className="flex w-full" key={index}>
                    {week.map((day, j) => (
                        <button className={clsx(
                            "w-1/7 p-1 min-w-[38px] relative min-h-[38px] font-medium text-center button-action",
                            {
                                'disabled': !day.value
                            }
                        )} key={j}>
                            <span className="absolute-center">{day.label}</span>
                        </button>
                    ))}
                </div>
            ))}
            
        </div>
    )
}

export default memo(CalendarBody)