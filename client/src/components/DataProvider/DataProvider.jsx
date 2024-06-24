import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";

export const AppState = createContext();

function DataProvider ({children})  {

    const [user, setUser] = useState({})

    async function checkUser(){
        try {
            const {data} = await axiosInstance('/users/check',{
                headers:{
                Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            })
            console.log(data);
            setUser(data)
            console.log(user)
            console.log("try block")
            } catch (error) {
                console.log(error.response);
                setUser()
        }
    }

    useEffect(() => {
        checkUser()
    }, []);

	return (
        
		<AppState.Provider value={{user}}>
			{children}
		</AppState.Provider>
	);
};

export default DataProvider