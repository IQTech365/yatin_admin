import React, { useEffect, useState } from 'react'
import './AddGift.css'
import axios from 'axios'
import { url } from "../../Utils/Config";
export default function AddGift(props) {
    useEffect(() => {
        getGifts('gifts')


    }, [])
    const getGifts = (queryString) => {
        const userData = {
            queryString,
        };
        axios.post(url + 'event/getGift', userData)
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    return (
        <div>
            <div className='search-bar'></div>
            <div>

                <div className='Gift-Image'></div>
                <div className='Gift-desctiprion'></div>
                <div className='Gift-buttons'></div>

            </div>

        </div>
    )
}
