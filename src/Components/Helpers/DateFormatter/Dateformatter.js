import React, { useState, useEffect } from 'react'

export default function Dateformatter(props) {
    const [FormattedDate, setFormattedDate] = useState("")
    const [Months, setMonths] = useState(['NIL', 'Jan', 'Feb', 'March'
        , 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'])
    useEffect(() => {

        if (props.Date !== "") {
            //  2021 - 07 - 23 21: 06
            let type = "am"
            let hour = props.Date.split(" ")[1].split(":")[0]
            if (parseInt(hour) > 12) {
                hour = hour - 12;
                type = "pm"
            }
            let time = hour + ":" + props.Date.split(" ")[1].split(":")[1]
            let date = props.Date.split(" ")[0]
            date = date.split("-")
            date = date[2] + " " + Months[parseInt(date[1])] + " " + date[0]
            setFormattedDate(date + " " + time + " " + type)
        }
    }, [props.Date])
    return (
        <>
            {FormattedDate}
        </>
    )
}
