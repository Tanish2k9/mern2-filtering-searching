const mongoose = require("mongoose");
const userTable = require("../models/userTable");



const getUserData = async(req,res)=>{
    const {car,gender,income,phone_price,quoteLength,last_name,emailNumber,emailLastName} = req.query; 
    const arrayval = [];
    const queryObject = {};

    if(car){
        
        if(car.length>1){
            let cararr = car.split(',');
            queryObject.car={ $in: cararr } ;
        }else{
            queryObject.car={ $in: [car ] } ;
        }
    }



    if(gender){
        queryObject.gender=gender;
    }
   




    if(income){
        arrayval.push({$expr:{"$lt" : [{$toDouble:{ $substr: [ "$income", 1, -1 ] }},Number(income)]}});
        queryObject.$and =arrayval;
    }





    if(phone_price){
        arrayval.push({$expr:{$gt : [{$toInt :"$phone_price"} ,Number(phone_price)]}});
        queryObject.$and =arrayval;
    }




    if(quoteLength){
        arrayval.push({$expr:{$gt : [{ $strLenCP: '$quote' },Number( quoteLength)]}})
        queryObject.$and=arrayval
    }




    if(last_name){
        const vari = new RegExp('^' + last_name )
        queryObject.last_name= {$regex:vari,$options:'i'};
    }
   



    if(emailNumber){
        queryObject.email = {$not: /[0-9]/};
    }

    if(emailLastName){
        try {
            
            let datas = await userTable.find(queryObject);
            let data =[]

            datas.forEach((item)=>{
               const substr= item.last_name.toLowerCase();
                if(item.email.toLowerCase().includes(substr)){
                    data.push(item);
                }
            })

            return res.status(200).json({data});
        } catch (error) {
            return res.status(400).json({error:error});
        }

    }

            // console.log(lastName)

            // let data=[];
            // for(let i=0;i<lastName.length;i++){
            //      datas.forEach((item)=>{
            //         // if(item.email.match("/"+lastName[i]+"/")){
            //         //     result.push(item);
            //         // }
            //         const substr = lastName[i].toLowerCase();
            //         if(item.email.includes(substr)){
            //             data.push(item);
            //         }
            //     })
                
            // }
            // console.log(data);
            // const hi = await data.exec();
            




    


    //////////////////////////database query
    
    try {
        const data = await userTable.find(queryObject);
        res.status(200).json({data});

    } catch (error) {
        res.status(400).json({error:error});
    }
    

}








const getUser3 = async (req,res)=>{
    const pipeline = [
        {
        $group:{
            _id:"$city",
            count : {$sum:1},
            avg:{$avg:{$toDouble:{ $substr: [ "$income", 1, -1 ] }}},
        }, 
        },
        {$sort:{count:-1}}
    ]



    try {
        const data = (await userTable.aggregate(pipeline)).slice(0,10);
        res.status(200).json({data});
    } catch (error) {
        res.status(400).error({error});
    }

}
 


module.exports = {getUserData,getUser3};

