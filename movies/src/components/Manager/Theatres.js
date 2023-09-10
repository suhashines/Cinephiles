import { Box, Button, Dialog, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react'
import { deleteTheatre, getManagerTheatres } from '../../api-helpers/api-helpers';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';

const columns = [
    { id: 'theatre', label: 'Theatre', minWidth: 20 },
    { id: 'movies', label: 'Movies', minWidth: 20 },
    { id: 'edit', label: 'Edit Theatre', minWidth: 20 },
    { id: 'showtime', label: 'Add Showtime', minWidth: 20},  
    { id: 'delete', label: 'Delete Theatre', minWidth: 20 }
  ];

const Theatres = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
  
    // const handleChangePage = (event, newPage) => {
    //   setPage(newPage);
    // };
  
    // const handleChangeRowsPerPage = (event) => {
    //   setRowsPerPage(+event.target.value);
    //   setPage(0);
    // };
  
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const [theatres, setTheatres] = React.useState([]);
    const [deletedTheatre, setDeletedTheatre] = React.useState();
  
      React.useEffect(() => {
          getManagerTheatres(localStorage.getItem('adminId'))
          .then((data) => {setTheatres(data.theatres);})
          .catch((err) => {console.log(err);});
      }, [localStorage.getItem('adminId')]);
      console.log(localStorage.getItem('adminId'));

      const handleDelete = (id) => {
        setDeletedTheatre(id)
        setOpen(true)
      }
  
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 850 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns?.map((column, index) => (
                  <TableCell
                    key={index}
                    align={'center'}
                    style={{ minWidth: column.minWidth, backgroundColor: '#2b2d42', color: 'white' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {theatres?.map((theatre, index) => {
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                // .map((theatre, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                <TableCell align='center'>
                                    <Typography
                                        sx={{
                                            fontSize: '20px',
                                            fontWeight: 'bold',
                                            // color: '#7c4699',
                                        }}
                                    >
                                        {theatre?.LOCATION}
                                    </Typography>                                    
                                </TableCell>
                                <TableCell align='center'>
                                    <Button
                                        LinkComponent={Link}
                                        to={`/theatres/${theatre.T_ID}/movies`}
                                        type="submit"
                                        variant="outlined"
                                        sx={{
                                            // margin: 'auto',
                                            color: 'white',
                                            bgcolor: 'green',
                                            fontSize: '12px',
                                            '&:hover': {
                                                backgroundColor: '#e3e4e6',
                                                borderColor: '#7c4699',
                                                color: '#7c4699'
                                            },
                                        }}
                                    >
                                        Details
                                    </Button>
    
                                </TableCell>
                                <TableCell align='center'>
                                    <Button
                                        LinkComponent={Link}
                                        to={`/theatres/${theatre.T_ID}`}
                                        // onClick={() => {handleOpen();
                                        //                 cancelBooking(booking.BOOK_ID);
                                                        
                                        //                 }}
                                        type="submit"
                                        variant="outlined"
                                        sx={{
                                            // margin: 'auto',
                                            color: 'white',
                                            bgcolor: '#7c4699',
                                            fontSize: '12px',
                                            '&:hover': {
                                                backgroundColor: '#e3e4e6',
                                                borderColor: '#7c4699',
                                                color: '#7c4699'
                                            },
                                        }}
                                    >
                                        Edit
                                    </Button>
    
                                </TableCell>
                                <TableCell align='center'>
                                    <Button
                                        LinkComponent={Link}
                                        to={`/theatres/${theatre.T_ID}/showtimes`}
                                        // onClick={() => {handleOpen();
                                        //                 cancelBooking(booking.BOOK_ID);
                                                        
                                        //                 }}
                                        type="submit"
                                        variant="outlined"
                                        sx={{
                                            // margin: 'auto',
                                            color: 'white',
                                            bgcolor: 'blue',
                                            fontSize: '12px',
                                            '&:hover': {
                                                backgroundColor: '#e3e4e6',
                                                borderColor: '#7c4699',
                                                color: '#7c4699'
                                            },
                                        }}
                                    >
                                        Add
                                    </Button>
    
                                </TableCell>
                                <TableCell align='center'>
                                    <Button
                                        onClick={() => {
                                                    handleDelete(theatre.T_ID);                                                        
                                                }}
                                        type="submit"
                                        variant="outlined"
                                        sx={{
                                            // margin: 'auto',
                                            color: 'white',
                                            bgcolor: 'red',
                                            fontSize: '12px',
                                            '&:hover': {
                                                backgroundColor: '#e3e4e6',
                                                borderColor: '#7c4699',
                                                color: '#7c4699'
                                            },
                                        }}
                                    >
                                        Delete
                                    </Button>
    
                                </TableCell>
                            {/* ); */}
                        {/* })} */}
                    </TableRow>
                  )
                })                
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog PaperProps={{style:{borderRadius:20, padding:40}}} open={open}>
            <Box sx={{ml:"auto", padding:0}}>
                <IconButton onClick={handleClose}>
                    <CloseRoundedIcon/>
                </IconButton>
            </Box>
            <Typography variant="h4" textAlign={"center"}>
                Are you sure
            </Typography>
            <Typography variant="h4" textAlign={"center"}>
                you want to delete
            </Typography>
            <Typography variant="h4" textAlign={"center"}>
                this theatre?
            </Typography>
            <Typography variant="h4" textAlign={"center"}>
                <br></br>
            </Typography>
            <Box
                align='center'
                margin={"auto"}
                // justifyContent={"center"}
                width='50%'
            >
                <Button
                    onClick={()=>{
                                deleteTheatre(deletedTheatre)
                                handleClose();                    
                                window.location.reload();
                            }} 
                    sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42", color:"white", align:'center'}} 
                    variant={"contained"} 
                    // fullWidth
                >
                    Yes
                </Button>
            </Box>            
        </Dialog>
    </Paper>
  );
}

export default Theatres