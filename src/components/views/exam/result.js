import React, { useEffect, useState } from "react";
import { Base64 } from "js-base64";
import { Link } from "react-router-dom";

function Result() {
    const [gradeData, setGradeData] = useState(null);
    const [statusText, setStatusText] = useState("");

    useEffect(() => {
        const storedData = sessionStorage.getItem("simplifiedGradeData");
        if (storedData) {
            const decodedData = Base64.decode(storedData);

            const parsedData = JSON.parse(decodedData);
            setGradeData(parsedData);

            if (parsedData.status === 0) {
                setStatusText("Not Pass");
            } else if (parsedData.status === 1) {
                setStatusText("Passed");
            }
        }
    }, []);

    return (
        <>
            <h3 className="exam__inner-heading text-center">{gradeData?.testName} - Results</h3>
            <div className="row">
                <div className="col-12">
                    <div className="td-sidebar">
                        <h2>Test name: {gradeData?.testName}</h2>
                        <h2>Your Grade: {gradeData?.score}</h2>
                        <h2>Status: {statusText}</h2>
                    </div>
                </div>
            </div>
            <Link to="/" className="btn btn-notfound mt-3">
                <i class="fa fa-long-arrow-left"></i> Back to Home
            </Link>
        </>
    );
}

export default Result;
