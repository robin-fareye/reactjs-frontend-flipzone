/* eslint-disable */
import { useEffect, useState } from 'react';
import './Header.css'
import { ShoppingCart } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import { Badge, List, ListItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { getCartItems } from '../../api/CartApi';
import { logoutUser } from '../../api/Login';

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

const Header = ({userId, cartItemCount, setSearchText}) => {
    const navigate= useNavigate();
    const location = useLocation();
    const [text, setText] = useState("");
    const [open, setOpen] = useState(true);
    //const [cartItemCount, setCartItemCount] = useState("")

    const [currentUserId,setCurrentUserId]=useState(userId)
    const getText = (text) => {
        setText(text);
        setOpen(false);
        setSearchText(text);
    }

    const logout=async()=>{
        return await logoutUser()
    }
    const handleLogout=()=>{
        let res=logout()
        console.log("RESSS:",res);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box  style={{ width: '100%', backgroundColor: '#0D4C92', color: 'aliceblue' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <img style={{ height: 30, width: 30 }} alt="LOGO" src={require('../../assets/logo.png')} onClick={() => {
                        
                            navigate("/homePage", {state: {currentUserId: currentUserId}})}}/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        onClick={() => navigate("/homePage",{state: {currentUserId: currentUserId}})}
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

                    <Box display='flex' onClick={() => navigate("/cart", {state :{currentUserId:currentUserId}})}>
                    <Badge color="secondary">
                        <ShoppingCart />
                    </Badge>
                    <Typography >
                        Cart
                    </Typography>
                    {<Typography className="cart-item-count">
                        { cartItemCount }
                    </Typography>}
                    </Box>
                    <Button
                        color="inherit"
                        sx={{ ml: 5, fontSize: 15 }}
                        onClick={handleLogout}
                    >
                        Log out
                    </Button>
                </Toolbar>
                
            </Box>
            
        </Box>
    );
}

export default Header;