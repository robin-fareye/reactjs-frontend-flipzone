import React from 'react';
import { Box } from '@mui/material';
import Slide from '../helper/Slide';

  const catagories=["cat1","cat2","cat3","cat4"]
  const items=[
    {
        name:"SOme item name",
        price:"$500",
        description:"something described",
        image:'https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70'
    },
    {
        name:"SOme item name",
        price:"$500",
        description:"something described",
        image:'https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70'
    },
    {
        name:"SOme item name",
        price:"$500",
        description:"something described",
        image:'https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70'
    },
    {
        name:"SOme item name",
        price:"$500",
        description:"something described",
        image:'https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70'
    },
    {
        name:"SOme item name",
        price:"$500",
        description:"something described",
        image:'https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70'
    },
  ]

const Home = () => {
  return (
    <div>
      {
        catagories?.map((item) => {
          return (
            <Box>
              <Slide
                data={items}
                title={item.name}
              />
            </Box>
          )
        })
      }
    </div>  )
}

export default Home;