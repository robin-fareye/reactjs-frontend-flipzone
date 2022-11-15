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

    const getItemCount = () => {
        return 1;
    }

    // useEffect(() => {
    //     getProducts();
    // }, [text])


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
                    <Typography>
                        Cart
                    </Typography>
                    {getItemCount() > 0 && <Typography className="cart-item-count">
                        {getItemCount()}
                    </Typography>}
                </Toolbar>
            </Box>
        </Box>
    );
}

export default Header;