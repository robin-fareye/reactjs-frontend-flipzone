import { useEffect, useState } from 'react';
import './Header.css'
import { ShoppingCart } from '@mui/icons-material'

import { styled, alpha } from '@mui/material/styles';
import { Badge, List, ListItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 30,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Header = () => {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(true);


    const getText = (text) => {
        setText(text);
        setOpen(false)
    }

    // useEffect(() => {
    //     getProducts();
    // }, [text])


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <img style={{ height: 30, width: 30 }} alt="LOGO" src={require('../../assets/logo.png')} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        FlipZone
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => getText(e.target.value)}
                        />

                    </Search>

                    <Badge color="secondary">
                        <ShoppingCart />
                    </Badge>
                    <Typography onClick={() => window.location.replace("/cart")}>
                        Cart
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}



// const Header = () => {
//     const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
//     const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

//     const [text, setText] = useState();
//     const [open, setOpen] = useState(true)

//     const getText = (text) => {
//         setText(text);
//         setOpen(false)
//     }

//     const [products, setProducts] = useState([]);

//     const getProducts = () => {
//         return [];
//     }

//     useEffect(() => {
//         getProducts();
//     }, [text])


//     return (
//         <AppBar position='fixed' className='header-container'>
//             <Box className='header'>
//                 <Typography style={{ flex: 1 }}></Typography>
//                 <Typography className="subHeading">
//                     Home
//                 </Typography>

//                 <Box className="search">
//                     <InputBase
//                         placeholder="Search for products, brands and more"
//                         className='inputRoot inputInput'
//                         inputProps={{ 'aria-label': 'search' }}
//                         onChange={(e) => getText(e.target.value)}
//                     />
//                     <Box className="searchIcon">
//                         <Button>
//                             <img alt="SearchIcon" src={require('../../assets/searchIcon.png')} />
//                         </Button>
//                     </Box>
//                     {
//                         text &&
//                         <List className="listSearch" hidden={open}>
//                             {
//                                 products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
//                                     <ListItem>
//                                         {product.title.longTitle}
//                                     </ListItem>
//                                 ))
//                             }
//                         </List>
//                     }
//                 </Box>

//                 <Typography style={{ flex: 1, textAlign: 'center' }}>
//                     More
//                 </Typography>

//                 <Box className='cart'>
//                     <Badge color="secondary">
//                         <ShoppingCart />
//                     </Badge>
//                     <Typography>
//                         Cart
//                     </Typography>
//                 </Box>

//             </Box>
//         </AppBar>
//     )
// }



export default Header;