import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useState } from "react";
import Swal from 'sweetalert2';


function Header(props){
  let navigate = useNavigate();

  let getTokenDetails = ()=>{
    //read the data from localStorage
    let token = localStorage.getItem('auth-token');
    if(token === null){
      return false;
    }else {
      return jwt_decode(token)
    }
  }

  let [userLogin,setUserLogin] = useState(getTokenDetails());

  let onSuccess = (credentialResponse)=>{
    let token = credentialResponse.credential;
    //save the data
    localStorage.setItem('auth-token',token);
    Swal.fire({
      icon: 'success',
      title: 'Login successfully',
      text: '',
    }).then(()=>{
      window.location.reload();
    });
  };
  let onError = ()=>{
    Swal.fire({
      icon: 'Error',
      title: 'Oops...',
      text: 'login Fail Try Again',
    });
  };
  console.log(userLogin);
  let logout = ()=>{
    Swal.fire({
      title: 'Are you sure to logout?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout me'
    }).then((result) => {
      if (result.isConfirmed) {
          //reomve data from localStorage
          localStorage.removeItem('auth-token');
          window.location.reload();
      }
    });

  }
    return (
      
        <>
        <GoogleOAuthProvider clientId="27694834787-jcda86a71fq8v8advgu335f14kbjjhe4.apps.googleusercontent.com">...
                <div className="modal fade" id="Google-sign-in" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="staticBackdropLabel">Google Sign-In</h4>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <GoogleLogin
                  onSuccess={onSuccess}
                  onError={onError}
                />
                </div>
              </div>
            </div>
          </div>
           <header className={"row " + props.color}>
                <div className="col-12">
                    <div className="container-lg d-flex justify-content-between p-3">
                        <div className="">
                            <p className="brand-logo1 m-0 bg-light fw-bold h3 hand" onClick={()=>navigate('/')}>e!</p>
                        </div>
                        {userLogin ? <div>
                          <span className="fs-5 text-white fw-bold me-3">Welcome, {userLogin.family_name}</span>
                          <button className="btn btn-outline-light border fa fa-exit" onClick={logout}>Logout</button>
                        </div> : (
                        <div className="pt-1">
                            <button className="btn text-white" data-bs-toggle="modal" data-bs-target="#Google-sign-in">Login</button>
                            <button className="btn btn-outline-light border">Create an account</button>
                        </div>
                        )}
                    </div>
                </div>
            </header>
          </GoogleOAuthProvider>;
        </>
    );
};

export default Header;