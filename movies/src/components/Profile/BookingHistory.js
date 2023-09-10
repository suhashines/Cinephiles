import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { cancelBooking, getBookings } from '../../api-helpers/api-helpers';
import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';


const columns = [
  { id: 'movie', label: 'Movie' },
  { id: 'seats', label: 'Seats', minWidth: 20 },
  {
    id: 'category',
    label: 'Category',
    minWidth: 40,
    // align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 50,
    // align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 70,
    align: 'center',
    format: (value) => value.toLocaleDateString('en-US'),
  },  
  {
    id: 'booking_id',
    label: 'Booking ID',
    minWidth: 70,
    // align: 'right',
    // format: (value) => value.toFixed(2),
  },
    {
        id: 'delete',
        label: 'Delete Booking',
        minWidth: 70,
        align: 'center',
        // format: (value) => value.toFixed(2),
    },
];


export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [movies, setMovies] = React.useState([]);

    React.useEffect(() => {
        getBookings(localStorage.getItem('userId'))
        .then((data) => {setMovies(data);})
        .catch((err) => {console.log(err);});
    }, [localStorage.getItem('userId')]);
    console.log(movies);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 490 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: '#2b2d42', color: 'white' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {movies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((movie, index) => {
                return (
                <>
                {/* <TableRow hover role="checkbox" tabIndex={-1} key={index}>  
                    <TableCell>
                        {movie.TITLE}
                    </TableCell>
                </TableRow> */}
                    {movie.details.map((booking, item) => {
                        return(
                            <TableRow hover role="checkbox" tabIndex={-1} key={item}>
                                {/* <TableCell key={movie.M_ID}> */}
                                    {/* {column.format && typeof value === 'number'
                                    ? column.format(value): value} */}
                                    {/* {movie.TITLE} */}
                                {/* </TableCell> */}
                                {/* {booking.map((column, hash) => { */}
                                    {/* return ( */}
                                        <TableCell>
                                            {(item==0) && movie.TITLE}
                                        </TableCell>
                                        <TableCell align="center">
                                            {booking.S_ID}
                                        </TableCell>
                                        <TableCell>
                                            {booking.CATEGORY}
                                        </TableCell>
                                        <TableCell>
                                            {booking.PRICE}
                                        </TableCell>
                                        <TableCell>
                                            {booking.SHOWTIME}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {booking.BOOK_ID}
                                        </TableCell>
                                        <TableCell align='center'>
                                          {booking.DIFFERENCE > 0 && (
                                            <Button
                                                onClick={() => {handleOpen();
                                                                cancelBooking(booking.BOOK_ID);
                                                                
                                                                }}
                                                type="submit"
                                                variant="outlined"
                                                sx={{
                                                    margin: 'auto',
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
                                                Delete
                                            </Button>
                                          )}
                                        </TableCell>
                                    {/* ); */}
                                {/* })} */}
                            </TableRow>
                        )
                    })}
                </>
                )
              })                
            }
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[15, 25, 100]}
        component="div"
        count={movies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}

        <Dialog PaperProps={{style:{borderRadius:20, padding:50}}} open={open}>
            {/* <Box sx={{ml:"auto", padding:1}}>
                <IconButton onClick={handleClose}>
                    <CloseRoundedIcon/>
                </IconButton>
            </Box> */}
            <Typography variant="h4" textAlign={"center"}>
                Booking Deleted
            </Typography>
            <Typography variant="h4" textAlign={"center"}>
                Successfully!
            </Typography>
            <Typography variant="h4" textAlign={"center"}>
                <br></br>
            </Typography>
            <Button
                onClick={()=>{handleClose();                    
                            window.location.reload();
                        }} 
                sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42", color:"white"}} 
                variant={"contained"} 
                // fullWidth
            >
                OK
            </Button>
        </Dialog>
    </Paper>
  );
}