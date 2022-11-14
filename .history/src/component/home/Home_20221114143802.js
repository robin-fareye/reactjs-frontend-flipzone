import React from 'react'
import { Box, Typography, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import './Home.css'

const Home = () => {
  const categories = [
    {
      name: "Category name"
    },
    {
      name: "Category name"
    },
    {
      name: "Category name"
    },
    {
      name: "Category name"
    },
  ]

  const categoryItems = [
    {
      name: "Item name",
      photo: "https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70",
      price: "$100",
      description: "Product Desription"
    },
    {
      name: "Item name",
      photo: "https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70",
      price: "$100",
      description: "Product Desription"
    },
    {
      name: "Item name",
      photo: "https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70",
      price: "$100",
      description: "Product Desription"
    },
    {
      name: "Item name",
      photo: "https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70",
      price: "$100",
      description: "Product Desription"
    },
    {
      name: "Item name",
      photo: "https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70",
      price: "$100",
      description: "Product Desription"
    },
    {
      name: "Item name",
      photo: "https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70",
      price: "$100",
      description: "Product Desription"
    },
    {
      name: "Item name",
      photo: "https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70",
      price: "$100",
      description: "Product Desription"
    },
    {
      name: "Item name",
      photo: "https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70",
      price: "$100",
      description: "Product Desription"
    },
  ]

  const categoryItem = (item) => {
    return (
      // <Box className='category-container'>
      //   <Box className='category-container-header'>
      //     <Typography>{item.name}</Typography>
      //   </Box>
      //   <Box className='category-main'>
      //     {
      //       categoryItems?.map((item) => {
      //         return productItem(item)
      //       })
      //     }
      //   </Box>
      // </Box>

      <ImageList className="category-item-list"
        sx={{
          gridAutoFlow: "column",
          gridTemplateColumns: 'repeat(4, 1fr) !important'
        }}
        >
        {categoryItems?.map((item) => {
          return (
            <ImageListItem>
              <img
              className='product-item-image'
              src={`${item.photo}`} alt='img'/>
              <ImageListItemBar title={item.name}/>
            </ImageListItem>
          )
        })}
      </ImageList>
    )
  }

  const productItem = (item) => {
    return (
      <Box className='item-container'>
        <img
        className='product-item-image'
        src={`${item.photo}`}
        alt='image' />
        <Typography>{item.name}</Typography>
        <Typography>{item.price}</Typography>
        <Typography>{item.description}</Typography>
      </Box>
    )
  }

  return (
    <Box className='main-container'>
      {/* {
        categories?.map((item) => {
          return categoryItem(item)
        })
      } */}
      <ImageList>
        {categories?.map(item => {
          return (
            <ImageListItem>
              <Typography>{item.name}</Typography>
              {categoryItem(item)}
            </ImageListItem>
          )
        })}
      </ImageList>
    </Box>
  )
}

export default Home