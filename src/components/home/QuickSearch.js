import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function QuickSearch(){
    let navigate = useNavigate();
    let [mealTypelist,setMealTypeList] = useState([]);


    let getMealTypes = async ()=>{
        try{ 

            let response = await axios.get('https://zc-batch-48-app-api.herokuapp.com/api/get-meal-types');
            let data = response.data;
            if(data.status === true){
                setMealTypeList([...data.result]);//recreate an array
            }else{
                setMealTypeList([]);
            }   
            }catch(error){
                alert('server side error');
        }
    };
    let getQuickSearchPage =(id)=>{
        navigate(`/Search-page/${id}`);
     };

    useEffect(()=>{
        getMealTypes();
    },[]);
    //[] == > useEffect will run once
    // console.log(mealTypelist);
    return <>    <div className="container">
    <div className="row">
        <div className="col-12 mt-5">
            <p className="quick-search-title fw-bolder ms-3">Quick Searches</p>
            <p className="quick-search-subtitle mb-4 ms-3">Discover restaurants by type of meal</p>
        </div>
    </div>
</div>
{/* <!-- 1st section --> */}
<div className="container-fluid">
    <div className="row m-lg-3 list-source">

        {mealTypelist.map((mealType,index)=>{
            return(
            <div key={index} 
            className="food-item col-12 col-lg-3 col-md-6 p-0 d-flex justify-content-center align-items-center" 
            onClick={ () =>getQuickSearchPage(mealType.meal_type)}>
                <img src={mealType.image} alt="" className="food-item-image"/>
                <div className="p-3">
                    <p className="food-item-title fw-bold m-0 px-3">{mealType.name}</p>
                    <p className="food-item-subtitle m-0 px-3 py-2">{mealType.content}</p>
                </div>
            </div>
            );
        })}

    </div>
</div>  
</>
};

export default QuickSearch;