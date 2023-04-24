import React, { useState,useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
const TableTwo = () => {
    const[data,setData] = useState([]);
    useEffect(()=>{

        const fetching = async(req,res)=>{
            try {
    
                const response = await axios.get(`http://localhost:5000/api/v1/user/option3`);
                const dat =  response.data;
                setData(dat.data);
                console.log(dat.data);
    
            } catch (error) {
    
                console.log(error);
            }   
        }
        fetching();
    
      },[])
    




  return (
    <div>

        <table>
            <thead>
                <tr>
                    <th>INDEX</th>
                    <th>CITY</th>
                    <th>COUNT</th>
                    <th>AVERAGE INCOME</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.slice(0,10).map((valueobj,idx)=>{
                        return(
                            <tr key={valueobj._id} >
                                <td>{idx+1}</td>
                                <td>{valueobj._id}</td>
                                <td>{valueobj.count}</td>
                                <td>{valueobj.avg}</td>
                            </tr>
                        )
                    })
                    
                }
                
            </tbody>
        </table>

        <div>
            <button><Link to ="/">GO BACK</Link></button>
        </div>
    </div>
  )
}

export default TableTwo