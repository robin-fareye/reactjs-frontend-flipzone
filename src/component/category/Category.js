import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './Category.css'


const Category = () => {
    const navData = ['abcs', 'bcdf', 'cjfv', 'ddvbj', 'cjfv', 'ddvbj', 'cjfv', 'ddvbj'];

    return (
        <Box className="cat-component">
            {
                navData.map((item, index) => (
                    <Box className="cat-container" key={index}>
                        <img className="cat-image" alt="Category" src={require('../../assets/logo.png')} />
                        <Typography className="cat-text">{item}</Typography>
                    </Box>
                ))
            }
        </Box>
    )
}

export default Category;