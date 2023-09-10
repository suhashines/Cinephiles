import React from 'react'
import { useParams } from 'react-router-dom';
import { movieStats } from '../../api-helpers/api-helpers';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const columns = [
  { id: 'date', label: 'Date', minWidth: 20 },
  { id: 'booking', label: 'Bookings', minWidth: 20 },
  { id: 'earning', label: 'Earnings', minWidth: 20 },
];

const TheatreMovieDetails = () => {
  const t_id = useParams().t_id;
  const id = useParams().id;

  const [stats, setStats] = React.useState();

  React.useEffect(() => {
      movieStats(t_id, id)
      .then((data) => {{setStats(data)}})
      .catch((err) => {console.log(err);});      
    }, [t_id, id]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box
        align = 'center'
      >
        <Typography
          sx={{
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#7c4699',
            padding: '20px',
          }}
        >
          Total Earnings: {stats?.total} Taka BDT
        </Typography>
      </Box>
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
            {stats?.stats?.map((stat, index) => {
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
                              {stat?.DATES}
                          </Typography>                                    
                      </TableCell>
                      <TableCell align='center'>
                          <Typography
                              sx={{
                                  fontSize: '20px',
                                  fontWeight: 'bold',
                                  // color: '#7c4699',
                              }}
                          >
                              {stat?.BOOKING}
                          </Typography>                                    
                      </TableCell>
                      <TableCell align='center'>
                          <Typography
                              sx={{
                                  fontSize: '20px',
                                  fontWeight: 'bold',
                                  // color: '#7c4699',
                              }}
                          >
                              {stat?.EARNING}
                          </Typography>                                    
                      </TableCell>
                  </TableRow>
                )
              })                
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TheatreMovieDetails