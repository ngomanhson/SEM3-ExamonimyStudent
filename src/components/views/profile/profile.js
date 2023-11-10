import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { toast } from "react-toastify";
import { format } from "date-fns";

function Profile() {
    const [info, setInfo] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState({});
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const loadProfile = async () => {
        const userToken = localStorage.getItem("accessToken");

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const profileResponse = await api.get(url.AUTH.PROFILE, config);
            setInfo(profileResponse.data);
        } catch (error) {}
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setEditedInfo({ ...info });
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // Reset editedInfo to the original data
        setEditedInfo({});
    };

    const handleSaveClick = async () => {
        try {
            const userToken = localStorage.getItem("accessToken");

            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const formData = new FormData();

            // If avatarFile is present, append it to the FormData
            if (avatarFile) {
                formData.append("avatar", avatarFile);
            }

            // Append other fields from editedInfo
            for (const key in editedInfo) {
                formData.append(key, editedInfo[key]);
            }

            // Send the request
            const isConfirmed = window.confirm("Are you sure you want to submit your exam?");
            if (isConfirmed) {
                const updateResponse = await api.put(url.AUTH.UPDATE_PROFILE, formData, config);

                if (updateResponse.status === 204) {
                    toast.success("Successfully updated.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                    toast.error("Error! An error occurred. Please try again later", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
            }

            // Update the local state with edited information
            setInfo(editedInfo);
            setIsEditing(false);
        } catch (error) {
            toast.error("Error! An error occurred. Please try again later.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };

    const allowedExtensions = ["png", "jpg", "jpeg", "heic"];

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileExtension = file.name.split(".").pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                toast.error("Only .png, .jpg, .jpeg, and .heic files are allowed.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // You can also reset the input field if needed
                e.target.value = "";
                return;
            }

            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <div className="td-sidebar">
            <div className="widget widget-dashboard">
                <h6>Profile Student</h6>
                <div className="pt-5">
                    {Object.keys(info).length > 0 ? (
                        <div className="row">
                            <div className="col-lg-4 mx-auto">
                                <div className="student-avatar">
                                    <label htmlFor="avatarInput">
                                        {isEditing ? (
                                            avatarPreview ? (
                                                <div className="avatar-inner">
                                                    <img src={avatarPreview} alt="Avatar Preview" className="avatar-preview" />
                                                    <img src="./assets/img/default-placeholder.png" alt="" className="img-default" />
                                                </div>
                                            ) : (
                                                <div className="avatar-inner">
                                                    <img src={info.avatar} alt={info.fullname} className="avatar-preview" />
                                                    <img src="./assets/img/default-placeholder.png" alt="" className="img-default" />
                                                </div>
                                            )
                                        ) : (
                                            <img src={info.avatar} alt={info.fullname} className="avatar-preview" />
                                        )}
                                    </label>
                                    <input id="avatarInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
                                </div>

                                <div className="student-content">
                                    <h5>{info.fullname}</h5>
                                    <p>
                                        Student ID: {info.student_code}
                                        <br />
                                        Class Name: {info.className}
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="table-responsive">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Full Name</th>
                                                <td>{info.fullname}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{info.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Birthday</th>
                                                <td>
                                                    {isEditing ? (
                                                        <input
                                                            type="date"
                                                            className="input-change"
                                                            value={format(new Date(editedInfo.birthday), "yyyy-MM-dd") || ""}
                                                            onChange={(e) => setEditedInfo({ ...editedInfo, birthday: e.target.value })}
                                                        />
                                                    ) : (
                                                        format(new Date(info.birthday), "dd/MM/yyyy")
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Gender</th>
                                                <td>
                                                    {isEditing ? (
                                                        <select className="input-change" value={editedInfo.gender || ""} onChange={(e) => setEditedInfo({ ...editedInfo, gender: e.target.value })}>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    ) : (
                                                        info.gender
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Phone</th>
                                                <td>
                                                    {isEditing ? (
                                                        <input
                                                            type="tel"
                                                            className="input-change"
                                                            value={editedInfo.phone || ""}
                                                            onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                                                        />
                                                    ) : (
                                                        info.phone
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                <td>
                                                    {isEditing ? (
                                                        <input
                                                            type="text"
                                                            className="input-change"
                                                            value={editedInfo.address || ""}
                                                            onChange={(e) => setEditedInfo({ ...editedInfo, address: e.target.value })}
                                                        />
                                                    ) : (
                                                        info.address
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-end">
                                    {isEditing ? (
                                        <div>
                                            <button className="btn-link-2 text-danger" onClick={handleCancelClick}>
                                                Cancel
                                            </button>
                                            <button className="btn-link-2" onClick={handleSaveClick}>
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <button className="btn-link-2" onClick={handleEditClick}>
                                            Edit information <i className="fa fa-pencil"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading profile data...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
