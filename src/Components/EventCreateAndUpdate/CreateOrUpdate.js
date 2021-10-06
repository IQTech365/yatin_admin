import React, { useState, useEffect } from 'react'
import Header from "../Helpers/Header/Header";
import './CreateOrUpdate.css'
export default function CreateOrUpdate(props) {
    useEffect(() => {

    }, [])
    return (
        <div> <Header url={props.location.pathname} ismobile="desktop-only" />
        </div>
    )
}
