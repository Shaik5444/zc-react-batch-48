
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function SearchPageResult(){
    let params = useParams();
    let navigate = useNavigate();
    let { meal_id } = params;
    let [restaurantList, setRestaurantList] = useState([]);
    let [locationList,setLocationList] = useState([]);
    let [filter,setFilter] = useState({meal_type: meal_id})

    let filterOpertion = async (filter)=>{
        let URL = 'http://localhost:5003/api/filter';
        try {
            let {data} = await axios.post(URL,filter);
            if (data.status === true){
                setRestaurantList([...data.newResult]);
            }    
        } catch (error) {
            alert('server error');
            console.log(error);
        }
    };
    let getLocationList = async()=>{
        try{
            let response = await axios.get('http://localhost:5003/api/get-location');
            let data = response.data;
            if(data.status === true){
                setLocationList([...data.result]);
            }else{
                setLocationList([]);
            }
        }catch(error){
            console.log(error);
            alert('server error');
        }
    };
    let makeFiltration = (event, type)=>{
        let value = event.target.value;
        let _filter = { ...filter };
        switch (type){
            case "location":
                if(Number(value) > 0){
                     _filter['location'] = Number(value);
                }else{
                    delete  _filter['location'];
                }
                break;
            case "sort":
                _filter['sort'] = Number(value);
                break;
            case "cost-for-two":
                let costForTwo = value.split('-')
                _filter['lcost'] = Number(costForTwo[0]);
                _filter['hcost'] = Number(costForTwo[1]);
                break;
        };
        console.log(_filter);
        setFilter({..._filter})
        filterOpertion(_filter);

    }
    // console.log(restaurantList);

    useEffect(()=>{
        filterOpertion(filter);
        getLocationList();
    },[]);

    return (
        <>           <div className="container-lg">
        <section className="row">
            <div className="col-12">
                <p className="m-0 h2 py-4">Breakfast Places in Mumbai</p>
            </div>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-4 border border-1 p-4">
                    <div className="d-flex justify-content-between">
                        <p className="Filter fw-bold m-0">Filters</p>
                        <button
                         className="d-lg-none btn" 
                         data-bs-toggle="collapse"
                         data-bs-target="#Filter-area" 
                         aria-controls="Filter-area">

                        <span className="fa fa fa-arrow-down"></span>
                        </button>
                    </div>
                    <div className="collapse show" id="Filter-area">
                        <p className="select-Location m-0 mb-1">Select Location</p>
                        <select name="" id="" className="form-select text-muted" onChange={(event)=>makeFiltration(event, "location")} >
                            <option value="-1" className="">--- select ---</option>
                            {
                                locationList.map((location,index)=>{
                                    return(
                                        <option value={location.location_id} key={index}>
                                            {location.name}, {location.city}
                                        </option>
                                    );
                                })
                            }
                     
                        </select>
                        {/* <!-- cuisine --> */}
                        <p className="Cuisine my-2 mt-4">Cuisine</p>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox"/>
                            <label htmlFor="" className="place form-check-label">North Indian</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked/>
                            <label htmlFor="" className="place form-check-label">South Indian</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked/>
                            <label htmlFor="" className="place form-check-label ">Chinese</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox"/>
                            <label htmlFor="" className="place form-check-label">Fast Food</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox"/>
                            <label htmlFor="" className="place form-check-label">Street Food</label>
                        </div>
                        {/* <!-- Cost For Two --> */}
                        <p className="fair my-2 mt-4">Cost For Two</p>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="cost-for-two" value="0-500" onChange={(event)=>makeFiltration(event, "cost-for-two")}/>
                            <label htmlFor="" className="cost form-check-label">Less than ` 500</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="cost-for-two" value="500-1000" onChange={(event)=>makeFiltration(event, "cost-for-two")}/>
                            <label htmlFor="" className="cost form-check-label">` 500 to ` 1000</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="cost-for-two" value="1000-1500" onChange={(event)=>makeFiltration(event, "cost-for-two")}/>
                            <label htmlFor="" className="cost form-check-label">` 1000 to ` 1500</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="cost-for-two" value="1500-2000"onChange={(event)=>makeFiltration(event, "cost-for-two")} />
                            <label htmlFor="" className="cost form-check-label">` 1500 to ` 2000</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="cost-for-two" value="2000-99999" onChange={(event)=>makeFiltration(event, "cost-for-two")}/>
                            <label htmlFor="" className="cost form-check-label">` 2000+</label>
                        </div>
                        {/* <!-- Sort --> */}
                        <p className="sort my-2 mt-4 fw-bold">Sort</p>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sort" value="1" onChange={(event)=>makeFiltration(event, "sort")}/>
                            <label htmlFor="" className="cost form-check-label">Price low to high</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sort" value="-1" onChange={(event)=>makeFiltration(event, "sort")}/>
                            <label htmlFor="" className="cost form-check-label">Price high to low</label>
                        </div>
                    </div>
                </div>

                {/* search result */}
                <div className="col-12 col-lg-7 col-md-7 m-0 ms-lg-3 ms-md-3 mt-3 mt-lg-0 mt-md-0">
                    <div className="row">
                        {
                            restaurantList.map((restaurant,index)=>{
                                return (<div className="col-12  border border-2 py-lg-4 px-md-5 py-2 mb-3" key={index} onClick={()=>navigate('/restaurant/' + restaurant._id)}>
                                <div className="d-flex align-items-center">
                                    <img src={"/" + restaurant.image} alt="" className="search-food-img"/>
                                    <div className="ms-5 mt-2">
                                        <p className="restaurant ms-0 h4 fw-bold">{restaurant.name}</p>
                                        <p className="area ms-0 fw-bold mt-2">{restaurant.city}</p>
                                        <p className="ms-0 location">{restaurant.locality}, {restaurant.city}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="Rate col-lg-3 col-md-5 col-6">
                                        <p>CUISINES:</p>
                                        <p>COST FOR TWO:</p>
                                    </div>
                                    <div className="specific-palce-rate col-lg-4 col-md-5 col-6">
                                        <p>
                                            {
                                                restaurant.cuisine.reduce((pValue,cValue)=>{
                                                    return pValue.name + ', ' + cValue.name
                                                })
                                            };
                                        </p>
                                        <p><i className="fa fa-inr me-1" aria-hidden="true"></i>{restaurant.min_price}</p>
                                    </div>
                                </div>
                            </div>
                                    
                                )
                            })
                        }
             {/* pagination */}
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div className="row">
        <div className="col-12 d-flex justify-content-center mt-lg-0 mt-md-0 mt-3">
            <ul className="pagination">
                <li className="page-item">
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                </li>
                <li className="page-item">1</li>
                <li className="page-item">2</li>
                <li className="page-item">3</li>
                <li className="page-item">4</li>
                <li className="page-item">5</li>
                <li className="page-item">
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                </li>
            </ul>
        </div>
    </div></>
    )
};

export default SearchPageResult;