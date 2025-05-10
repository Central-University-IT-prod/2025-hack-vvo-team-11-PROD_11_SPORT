import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react'
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
];

export const Schedule = () => {
    const [tours, setTours] = useState(
        [
            { tourName: "Бокс", firstPlayer: "Петя", secondPlayer: "Олег" },
            { tourName: "Теннис", firstPlayer: "Вася", secondPlayer: "Ольга" },
            { tourName: "Настольный Теннис", firstPlayer: "Игорь", secondPlayer: "Костя" },
        ]
    )

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <TableContainer style={{ background: '#f1f1df', width: 'auto' }} component={Paper}>
                <Table sx={{ minWidth: 'auto' }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Название события</TableCell>
                            <TableCell align="right">Первый участник</TableCell>
                            <TableCell align="right">Второй участник</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tours.map((row, idx) => (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell style={{ fontSize: '20px' }} align="left">{row.tourName}</TableCell>
                                <TableCell style={{ fontSize: '14px' }} align="right">{row.firstPlayer}</TableCell>
                                <TableCell style={{ fontSize: '14px' }} align="right">{row.secondPlayer}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}