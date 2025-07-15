import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from "axios";
const UserSelect = ({selectedUser, setSelectedUser}) => {  //passed these two to parent App.jsx and then to child  ClaimButton.jsx

    const [users, setUsers] = useState([]);
    // const [selectedUser, setSelectedUser] = useState("")
    const [newUser ,setNewUser] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/users");
                console.log(response.data.Allusers);
                setUsers(response.data.Allusers);
                // console.log(selectedUser)
            }
            catch (err) {
                console.log(err);
            }

        }
        fetchData();
    }, [])

    const handleAddUser = async() => {
        if(!newUser.trim()) return console.log("please add valid user");
        try{
            const res = await axios.post("http://localhost:3000/api/create",{name : newUser,
            totalPoints : 0,
            });

            setUsers([...users,res.data.newUser]);
            setNewUser("");
        }
        catch(err){
            console.log("Add user error",err);
            if(err.response && err.response.status ===409){
                alert("User with this name already Exist.");
            }
            else {
                alert("Something went Wrong while adding user.")
            }
        }
    }


    return (
        <>
            <div>UserSelect</div>
            <select name="" id="" value={selectedUser} onChange={(e) =>{ 
                console.log("selected value" , e.target.value); setSelectedUser(e.target.value)}}>
                <option value=""> -- Select a User --</option>
                {users.map((user, _) => (
                    <option key={user._id} value={user._id} > {user.name}</option>
                ))}
            </select>

            <div className="Add-user">
                <input type="text" value={newUser} onChange={ (e) =>setNewUser(e.target.value)} />
                <button onClick={handleAddUser}>Add</button>
            </div>
        </>)
}

export default UserSelect