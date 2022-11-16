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

const RetailerProductListing = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/product/u/2`)
      .then((response) => response.json())
      .then((responseJson) => {
        //setFilterData(responseJson);
        setItems(responseJson);
      })
      .catch((error) => console.log("get all categories api fail ", error));
    // const data = getProductSellerWise(2);
    // console.log(".........", data);
    // setItems(data);
  }, []);

  const navigate = useNavigate();

  const renderCardItem = (item, index) => {
    return (
      <Box className="card-list-container">
        <Box className="image-and-count">
          <img
            // className='image-item-catalouge'
            src={item.productImageURL}
            alt="image"
          />
        </Box>
        <Box className="description">
          <Typography variant="h6">{item.productName}</Typography>
          <Typography variant="body2">{`Seller: ${item.seller}`}</Typography>
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
    <Box className="main-container">
      <Box className="item-list">
        <Box className="order-list-header">
          <Typography className="item-count">{`My Product Listing(${items?.length})`}</Typography>
        </Box>
        <Box className="list-box">
          {items?.map((item, index) => {
            return renderCardItem(item, index);
          })}
        </Box>
      </Box>
      <Button
        variant="contained"
        className="login-button"
        onClick={() => {
          navigate("/addProduct", { state: { id: 2 } });
        }}
      >
        Add New Product
      </Button>
    </Box>
  );
};

export default RetailerProductListing;