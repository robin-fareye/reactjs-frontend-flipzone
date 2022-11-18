import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Input } from "@mui/material";
import "./RetailerAddProduct.css";
import { listAll, ref } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase/Firebase";
import { uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { postProduct } from "../../api/ProductApi";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getAllCategories } from "../../api/CateogryApi";
import { getProductSellerWise } from "../../api/ProductApi.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { async } from "@firebase/util";
import { logoutUser } from "../../api/Login";

const RetailerProductListing = () => {
  const location = useLocation()
  const [items, setItems] = useState([]);

  const getProducts = async () => {
    let res = await getProductSellerWise(location?.state?.currentUserId)
    console.log("res", res);
    setItems(res?.data)
  }

  useEffect(() => {
    console.log("id: ", location?.state?.currentUserId);
    getProducts()
  }, []);

  const navigate = useNavigate();

  const hanldeLogout=async()=>{
    let res=await logoutUser()
    console.log("i ma ");
    navigate("/login");
  }
  const renderCardItem = (item, index) => {
    return (
      <Box className="card-list-container">
        <Box className="image-and-count">
          <img
            // className='image-item-catalouge'
            style={{ maxWidth: "100%" }}
            src={item.productImageURL}
            alt="image"
          />
        </Box>
        <Box className="description">
          <Typography variant="h6">{item.productName}</Typography>
          <Typography variant="body2">{`Description: ${item.productDescription}`}</Typography>
          <Typography style={{ marginTop: "13px" }} variant="h5">
            {item.price}
          </Typography>
          <Typography style={{ marginTop: "13px" }} variant="h5">
            {`Quantity Left : ${item.productQuantity}`}
          </Typography>
        </Box>
      </Box>
    );
  };
  return (
    <Box className="listing-container"  display='flex' style={{justifyContent:'center',margin:"10px"}}>
      <Box className="item-list">
        <Box className="order-list-header" display='flex' style={{justifyContent:'space-between'}}>
          <Typography className="item-count">{`My Product Listing(${items?.length})`}</Typography>
          <Box>
          <Button
            variant="contained"
            className="login-button"
            onClick={() => {
              navigate("/addProduct", { state: { currentUserId: location?.state?.currentUserId } });
            }}
          >
            Add New Product
          </Button>
          <Button
            variant="contained"
            className="login-button"
            onClick={
              ()=>{hanldeLogout()
              navigate('/login')
              }
            }
          >
            LogOut
          </Button>
          </Box>
        </Box>
        <Box className="list-box">
          {items?.map((item, index) => {
            return renderCardItem(item, index);
          })}
        </Box>
      </Box>

    </Box>
  );
};

export default RetailerProductListing;