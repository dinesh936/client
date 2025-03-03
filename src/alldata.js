import axios from 'axios';
import { useState, useEffect } from "react";
import './all.css';

export default function Alldata() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Fetch data from backend
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://server-605x.onrender.com/data');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Delete user function
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`https://server-605x.onrender.com/data/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Open modal
    const handleOpenModal = (user) => {
        setSelectedUser({ ...user });
        setShowModal(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleInputChange = (e) => {
        setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        if (!selectedUser) return;

        try {
            await axios.put(`https://server-605x.onrender.com/data/${selectedUser._id}`, selectedUser);
            setUsers(users.map(user => (user._id === selectedUser._id ? selectedUser : user)));
            handleCloseModal();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">🌟 User Management System 🌟</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>${user.amount}</td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDelete(user._id)}>🗑 Delete</button>
                                <button className="update-btn" onClick={() => handleOpenModal(user)}>✏ Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Update Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update User</h2>
                        <label>Name:</label>
                        <input type="text" name="name" value={selectedUser?.name || ""} onChange={handleInputChange} />

                        <label>Email:</label>
                        <input type="email" name="email" value={selectedUser?.email || ""} onChange={handleInputChange} />

                        <label>Password:</label>
                        <input type="text" name="password" value={selectedUser?.password || ""} onChange={handleInputChange} />

                        <label>Amount:</label>
                        <input type="number" name="amount" value={selectedUser?.amount || ""} onChange={handleInputChange} />

                        <div className="modal-buttons">
                            <button className="save-btn" onClick={handleUpdate}>💾 Save</button>
                            <button className="cancel-btn" onClick={handleCloseModal}>❌ Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
