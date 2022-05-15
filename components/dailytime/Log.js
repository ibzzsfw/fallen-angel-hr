import React, { useEffect, useState } from "react";
import {
    Button,
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    Link,
    TableToolbar,
    TableToolbarSearch,
    TableToolbarContent,
    TableToolbarMenu,
    TableToolbarAction,
    TableContainer,
    Pagination,
    Tag,
    FlexGrid,
    Row,
    Column,
} from '@carbon/react';
import { dateFormat } from '../../utils/utils';
import axios from "axios";
// import { rows, headers } from './LogData';

const Log = ({ raw, getInformationByPosition }) => {

    const [totalItems, setTotalItems] = useState(raw.length);
    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const [rows, setRows] = useState(raw);

    const headers = [
        {
            key: 'date',
            header: 'Date',
        },
        {
            key: 'clockIn',
            header: 'Clock-in',
        },

        {
            key: 'clockOut',
            header: 'Clock-out',
        },
        {
            key: 'type',
            header: 'Type',
        },
        {
            key: 'lateEarlyDeduct',
            header: 'Deduction amount',
        },
        {
            key: 'OT',
            header: 'Overtime',
        },
    ];

    const POSTaddOT = (clockOut) => {

        console.log({
            employeeid: getInformationByPosition[0].employeeID,
            clockout: clockOut,
            positionid: getInformationByPosition[0].positionID,
        })

        axios.post('http://localhost:3000/api/dailytime/addOT', {
            employeeid: getInformationByPosition[0].employeeID,
            clockout: clockOut,
            positionid: getInformationByPosition[0].positionID,
        })
    }

    useEffect(() => {

        let arr = []

        if (rows) {
            setTotalItems(rows.length)

            raw.map((r, index) => {
                // (pro.salary/30)/8)/60) * (TIMEDIFF(position.clockOut, TIME(dailytime.clockOut))
                // r.lateEarlyDeduct = (((getInformationByPosition.salary / 30) / 8) / 60) * 

                let OT = null
                if (getInformationByPosition[0].clockOut != r.clockOut) {
                    OT = 
                    <Button
                        kind='tertiary'
                        size='sm'
                        onClick={() => POSTaddOT((
                            new Date(r.date).getUTCFullYear().toString()
                            + '-' + (new Date(r.date).getUTCMonth() + 1).toString().padStart(2, '0')
                            + '-' + new Date(r.date).getUTCDate().toString().padStart(2, '0') + 'T' + r.clockOut.toString()))}
                    >Add OT</Button>
                }

                // let type = <></>
                // if (r.type === 'normal') {
                //     type = <Tag
                //         size="sm"
                //         title="normal"
                //         type="green"
                //     >
                //         Normal
                //     </Tag>
                // }
                // if (r.type === 'late') {
                //     type = <Tag
                //         size="sm"
                //         title="late"
                //         type="red"
                //     >
                //         Late
                //     </Tag>
                // }
                // if (r.type === 'earlyLeave') {
                //     type = <Tag
                //         size="sm"
                //         title="early Leave"
                //         type="purple"
                //     >
                //         Early leave
                //     </Tag>
                // }

                let deduct = '-'

                if (r.clockOut != getInformationByPosition[0].clockOut) {
                    deduct = ((((getInformationByPosition[0].salary / 30) / 8) / 60) * (new Date('2022-02-02T' + r.clockOut.toString()) - new Date('2022-02-02T' + getInformationByPosition[0].clockOut.toString())) / 60000)
                }

                arr.push({
                    id: index.toString(),
                    date: dateFormat(r.date),
                    clockIn: r.clockIn,
                    clockOut: r.clockOut,
                    type: r.type,
                    lateEarlyDeduct: Math.floor(deduct),
                    OT: OT,
                })
            })
        }
        setRows(arr);


    }, [raw]);

    return (
        <FlexGrid>
            <Row>
                <Column>
                    <DataTable
                        rows={rows.slice(firstRowIndex, firstRowIndex + currentPageSize)}
                        headers={headers}
                        isSortable={true}>
                        {({
                            rows,
                            headers,
                            getHeaderProps,
                            getRowProps,
                            getTableProps,
                            onInputChange,
                        }) => (
                            <TableContainer title="Log table" description={<Link style={{ cursor: 'pointer' }}>Contact admin</Link>}>
                                <TableToolbar>
                                    <TableToolbarContent>
                                        <TableToolbarSearch onChange={onInputChange} placeholder={'Search something'} />
                                    </TableToolbarContent>
                                </TableToolbar>
                                <Table {...getTableProps()}>
                                    <TableHead>
                                        <TableRow>
                                            {headers.map((header) => (
                                                <TableHeader key={header.key} {...getHeaderProps({ header })}>
                                                    {header.header}
                                                </TableHeader>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.id} {...getRowProps({ row })}>
                                                {row.cells.map((cell) => (
                                                    <TableCell key={cell.id}>{cell.value}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                        {
                                            totalItems === 0
                                                ? <TableRow>
                                                    <TableCell>
                                                        <div className="empty-state">
                                                            <img src='https://quantum-computing.ibm.com/_nuxt/img/magnify.483b9f4.svg' alt='magnify' />
                                                            <div className="title">No records found</div>
                                                            <div className="description">Try adjusting your search or filter options to find what you are looking for.</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell />
                                                    <TableCell />
                                                    <TableCell />
                                                    <TableCell />
                                                    <TableCell />
                                                </TableRow>
                                                : <></>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </DataTable>
                    <Pagination
                        totalItems={totalItems}
                        backwardText="Previous page"
                        forwardText="Next page"
                        itemsPerPageText="Items per page:"
                        pageSize={currentPageSize}
                        pageSizes={[5, 10, 15, 25]}
                        size="md"
                        onChange={({ page, pageSize }) => {
                            if (pageSize !== currentPageSize) {
                                setCurrentPageSize(pageSize);
                            }
                            setFirstRowIndex(pageSize * (page - 1));
                        }}
                    />
                </Column>
            </Row>
        </FlexGrid>
    )
}

export default Log;