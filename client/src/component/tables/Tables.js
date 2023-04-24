import  { useEffect, useState } from 'react'
import axios from "axios"
import "./tables.css"
import {Link} from "react-router-dom";
const Tables = () => {

  const [data,setData] = useState([]);
  const [carsArray,setCarsArray] = useState([]);
  const [gender,setGender] = useState('');
  const [phonePrice,setPhoneprice] = useState('');
  const [income,setIncome] = useState('');
  const [quote,setQuote] = useState('');
  const [lastName,setLastName] = useState('');
  const [emailLastName,setEmailLastName] = useState('');
  const [emailNumber,setEmailNumber] = useState('');

//   &gender=${gender}
  
  useEffect(()=>{

    const fetching = async(req,res)=>{
        try {

            const response = await axios.get(`http://localhost:5000/api/v1/user?car=${carsArray}&gender=${gender}&phone_price=${phonePrice}&income=${income}&quoteLength=${quote}&last_name=${lastName}&emailNumber=${emailNumber}&emailLastName=${emailLastName}`);
            const dat =  response.data;
            setData(dat.data);
            console.log(dat.data);

        } catch (error) {

            console.log(error);
        }   
    }
    fetching();

  },[carsArray,gender,phonePrice,income,quote,lastName,emailNumber,emailLastName])


  const handleCars = (e)=>{
    const {value,checked,name} = e.target;
    if(name==="cars"){
        if(checked){
            setCarsArray((pre)=>[...pre,value])
        }
        else{
            setCarsArray((pre)=>pre.filter((e)=>e!==value))
        }
    }
    if(name==="gender"){
        if(value==="both"){
            setGender("")
        }else if(value==="Male"){
            setGender("Male")
        }else {
            setGender("Female")
        }
    }
    if(name==="emailNumber"){
        if(checked){
            setEmailNumber("jdngj");
        }else{
            setEmailNumber('');
        }
    }
    if(name==="emailLastName"){
        if(checked){
            setEmailLastName("jdngj");
        }else{
            setEmailLastName('');
        }
    }

    console.log(value);

  }
//   console.log(carsArray);


  return (
    <div className='container'>



        <div className='filters-container'>
            <h3>FILTERS</h3>
            <div>

                <h4>cars</h4>
                <input type="checkbox" name="cars" value="BMW" onChange={handleCars} />
                <label > BMW</label><br/>
                <input type="checkbox" name="cars" value="Audi" onChange={handleCars}/>
                <label > AUDI</label><br/>
                <input type="checkbox" name="cars" value="Mercedes-Benz" onChange={handleCars}/>
                <label > MERCEDES_BENZ</label><br/><br></br>


                <h4>GENDER</h4>
                <select name="gender" id="gender" onChange={handleCars} defaultValue="both">
                    <option value = "both">Both</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>


                <h4>PHONE PRICE</h4>
                <label>grater than</label><br/>
                <input name="phone_price" value={phonePrice} onChange={(e)=>setPhoneprice(e.target.value)}/>

                <h4>INCOME IN $</h4>
                <label>less than</label><br/>
                <input name="income" value={income} onChange={(e)=>setIncome(e.target.value)}/>

                <h4>QuoteLength</h4>
                greater than<input name="quote" value={quote} onChange={(e)=>setQuote(e.target.value)}/>
                <h5>last_name starts With</h5>
                <input name="last_name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>

                <h5>email not contains number</h5>
                <input type="checkbox" name="emailNumber" value="yes" onChange={handleCars} />yes
                <h5>email contains lastName</h5>
                <input type="checkbox" name="emailLastName" value="yes" onChange={handleCars} />yes
                <Link to="/lastTask"><h4>LAST TASK</h4></Link>
                

            </div>
            
            
        </div>



        <div className='tables-container'>
        <table>
            <thead>
                <tr>
                    <th>index</th>
                    <th>Car</th>
                    <th>City</th>
                    <th>Email</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Gender</th>
                    <th>Income</th>
                    <th>PhonePrice</th>
                    <th>Quote</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.slice(0,100).map((valueobj,idx)=>{
                        return(
                            <tr key={valueobj._id} >
                                <td>{idx+1}</td>
                                <td>{valueobj.car}</td>
                                <td>{valueobj.city}</td>
                                <td>{valueobj.email}</td>
                                <td>{valueobj.first_name}</td>
                                <td>{valueobj.last_name}</td>
                                <td>{valueobj.gender}</td>
                                <td>{valueobj.income}</td>
                                <td>{valueobj.phone_price}</td>
                                <td>{valueobj.quote}</td>
                            </tr>
                        )
                    })
                    
                }
                
            </tbody>
        </table>
        {data.length<1&&<div>NO RECORDS FOUND</div>}
        </div>
    </div>
  )
}

export default Tables