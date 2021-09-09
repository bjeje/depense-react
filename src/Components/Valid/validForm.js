import React, {Fragment, useEffect, useState} from 'react';
import "./validForm.scss"

export default function ValidForm(props) {

    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        setTitle(props.title)
        setMessage(props.message)
    }, []);

    return (
        <Fragment>
            <div className={`p-2 text-center alert bg_success`}>
                <div className={"title--valid"}><strong>{title}</strong></div>
                <div className={"message--valid"}>{message}</div>
            </div>
        </Fragment>
    );
}
