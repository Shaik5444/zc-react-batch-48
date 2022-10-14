import axios from "axios";
// import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../Search/Header";


function Wallpaper(){

    // let selectInput = useRef(); //it will give referance element
    let [locationList,setLocationList] = useState([]);
    let [disabled,setDisabled] = useState(true); 

    let getLocationList = async()=>{
        try{
            let response = await axios.get('https://zc-batch-48-app-api.herokuapp.com/api/get-location');
            let data = response.data;
            // console.log(data);
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
    let getLocationId = async (event)=>{
        let value = event.target.value;
        if(value !== ""){
            try{
                let url = `https://zc-batch-48-app-api.herokuapp.com//api/get-restaurant-by-location-id/${value}`;
                let {data} = await axios.get(url);
                if (data.status === true){
                    if(data.result.length === 0){
                        setDisabled(true);
                    }else{
                        setDisabled(false);
                    }
                };
            }catch(error){
                console.log(error);
                alert('server side error');
            }
        };
    };
    useEffect(()=>{
        getLocationList();
    },[]);
    
    return ( 
        <>
        {/* <div className="modal fade" id="login" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Login</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="Email-authentication m-4"><i className="fa fa-envelope email me-2" aria-hidden="true"></i> Continue with Gmail</div>
                    <div className="Facebook-authentication m-4"><i className="fa fa-facebook-square Facebook me-1" aria-hidden="true"></i> Continue with Facebook</div>
                  ...
                </div>
                <div className="modal-footer justify-content-center">
                    <div className="text-account">Don’t have account?</div>
                    <span className="text-signup">Sign UP</span>
                </div>
              </div>
            </div>
        </div> */}
        {/* <!-- modal-create an account --> */}
        {/* <div className="modal fade" id="create-an-account" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Sign UP</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="Email-authentication m-4"><i className="fa fa-envelope email me-2" aria-hidden="true"></i> Continue with Gmail</div>
                    <div className="Facebook-authentication m-4"><i className="fa fa-facebook-square Facebook me-1" aria-hidden="true"></i> Continue with Facebook</div>
                  ...
                </div>
                <div className="modal-footer justify-content-center">
                    <div className="text-account">Already have an account?</div>
                    <span className="text-signup">Login</span>
                </div>
              </div>
            </div>
        </div> */}
        <main className="container-fluid">
            <section className="row align-content-start">
                <header className="main-section col-12 ">
                    <div className="col-12"><Header color=""/></div>
                    {/* <div className="container d-lg-flex d-md-flex justify-content-end py-3 d-none">
                        <button className="btn text-white me-3" data-bs-toggle="modal" data-bs-target="#login">Login</button>
                        <button className="btn btn-outline-light border"data-bs-toggle="modal" data-bs-target="#create-an-account">Create an account</button>
                    </div> */}
                    <div className="position mt-lg-4">
                        <div className="brand bg-white d-flex justify-content-center align-items-center mt-lg-2">
                            <p className="brand-logo mt-lg-2">e!</p>
                        </div>
                        <div className="Title-header">
                            <p className="main-title text-center">Find the best restaurants, cafés, and bars</p>
                        </div>
                    </div>
                    {/* <!--  --> */}
                    <main className="container">
                        <section className="row justify-content-center">
                            <div className="search d-flex mt-2">
                                <div className="Location-list me-3">
                                    {/* <!-- <button data-bs-toggle="collapse" data-bs-target="#Filter-area" aria-controls="#Filter-area"> --> */}
                                        {/* <!-- <input type="text" className="search-location form-control" placeholder="Please type a location">  --> */}

                                        {/* <input type="text" className="form-control mb-3 mb-lg-0 me-lg-3 py-lg-3 px-lg-3" placeholder="Please type a location"/> */}
                                        <select  className="form-select mb-3 mb-lg-0 me-lg-3 py-lg-3 px-lg-3" onChange={getLocationId}>
                                            <option>Please select a location</option>
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
                                        {/* <ul className="search-autocomplete" id="Filter-area">
                                            <li>Sarjapur Road, Bengaluru</li>
                                            <li>HSR Layout, Bengaluru</li>
                                            <li>Kormangala, Bengaluru</li>
                                            <li>Jay Nagar, Bengaluru</li>
                                        </ul> */}
                                    {/* <!-- </button> --> */}
                                </div>
                                <div className="Location-list1">
                                    {/* <!-- <button data-bs-toggle="collapse" data-bs-target="#Filter-restaurant" aria-controls="#Filter-restaurant"> --> */}
                                    <div className="input-group">
                                        <span className="input-group-text bg-white">
                                            <i className="fa fa-search"></i>
                                        </span>
                                        {/* <!-- <input type="text" className="search-location form-control" placeholder="Search for restaurants"> --> */}
                                        <input type="text" className="form-control me-3 py-lg-3 px-lg-3" placeholder="Search for restaurants" disabled = {disabled}/>
                                        
                                        {/* <ul className="search-autocomplete1 p-3" id="Filter-restaurant">
                                            <li className="search-autocomplete-item">
                                                <img src="/assests/food-item-img.png" alt=""/>
                                                <div className="ms-3">
                                                    <p className="restaurant-dropbox ">The Big Chill Cakery</p>
                                                    <p className="location-dropbox">Sarjapur Road, Bengaluru</p>
                                                </div>
                                            </li>
                                            <hr/>
                                            <li className="search-autocomplete-item ">
                                                <img src="/assests/food-item-img.png" alt=""/>
                                                <div className="ms-3">
                                                    <p className="restaurant-dropbox ">Punjabi Rasoi</p>
                                                    <p className="location-dropbox">Sarjapur Road, Bengaluru</p>
                                                </div>
                                            </li>
                                            <hr/>
                                            <li className="search-autocomplete-item">
                                                <img src="/assests/food-item-img.png" alt=""/>
                                                <div className="ms-3">
                                                    <p className="restaurant-dropbox">Punjabi Rasoi</p>
                                                    <p className="location-dropbox pb-1">Sarjapur Road, Bengaluru</p>
                                                </div>
                                            </li>
                                        </ul> */}
                                    </div>
                                    {/* <!-- </button> --> */}
                                </div>
                            </div>
                            {/* <!-- </div> --> */}
                        </section>
                    </main>
                </header>
            </section>
        </main>
        </>
    );
};

export default Wallpaper;