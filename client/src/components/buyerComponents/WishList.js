import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import {useAuthContext} from "../../hooks/useAuthContext"
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from "@mui/material/Box"
const WishList=()=>{

    const{user} = useAuthContext()
    const[ayurUser,setUser] = useState([])
    const[wishlist,setList]=useState([])

    

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    useEffect(()=>{

        const fetchList = async() =>{
            const response = await fetch(`/api/user/wishlist`,
                {headers:{
                    'Authorization' :`Bearer ${user.token}`
            }})

            const json = await response.json()
            
            if(response.ok){
                setList(json.wishlist) 
            }
        }
        fetchList()
        
    },[user])

    return(
        <div>
        <Box sx={{ overflowX: "hidden", marginTop: "20px" }}
        >
        <Typography sx={{width:800,margin:"auto",padding:"20px"}}
      variant="h4">
        My List
      </Typography>
        <Paper
        sx={{
            p: 2,
            margin: '1.25rem',
            maxWidth: "800",
            flexGrow: 1,
            backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        elevation={0}
        >
        {wishlist && wishlist.map((l)=>(          
                
        <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
          
          {l.images && l.images.length > 0 && (
                <Img alt="complex"  src={l.images[0].url}/>
            )}
          </ButtonBase>
        </Grid>
        <Grid item xs={20} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div" sx={{ cursor: 'pointer' }}>
                <Link to={`/product/${l._id}`} style={{ textDecoration: 'none' ,textTransform:"capitalize",color:"black",fontWeight:"bold"}}>{l.title} </Link>
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ mt: 2 }} style={{textTransform:"capitalize"}}>
              {l.slug}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {l.description.slice(0, 100)}...
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              Rs. {l.price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      ))}

        </Paper>

        </Box>
        </div>
    )

}

export default WishList;
