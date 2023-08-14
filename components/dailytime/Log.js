import {
    Button,
    Column,
    DataTable,
    FlexGrid,
    Link,
    Pagination,
    Row,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
    TableToolbar,
    TableToolbarContent,
    TableToolbarSearch
} from '@carbon/react';
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { dateFormat } from '../../utils/utils';
import headers from './common/header';

const Log = ({ raw, getInformationByPosition }) => {

    const [totalItems, setTotalItems] = useState(raw.length);
    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const [rows, setRows] = useState(raw);

    const POSTaddOT = useCallback((clockOut) => {
        axios.post('http://localhost:3000/api/dailytime/addOT', {
            employeeid: getInformationByPosition[0].employeeID,
            clockout: clockOut,
            positionid: getInformationByPosition[0].positionID,
        })
    }, [getInformationByPosition])

    useEffect(() => {

        let arr = []

        if (rows) {
            setTotalItems(rows.length)

            raw.map((r, index) => {

                let OT = null
                if (getInformationByPosition[0].clockOut < r.clockOut) {
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

                let deduct = 0

                if (r.clockOut < getInformationByPosition[0].clockOut) {
                    deduct += ((((getInformationByPosition[0].salary / 30) / 8) / 60) * (new Date('2022-02-02T' + r.clockOut.toString()) - new Date('2022-02-02T' + getInformationByPosition[0].clockOut.toString())) / 60000)
                }
                if (r.clockIn > getInformationByPosition[0].clockIn) {
                    deduct += ((((getInformationByPosition[0].salary / 30) / 8) / 60) * (new Date('2022-02-02T' + r.clockIn.toString()) - new Date('2022-02-02T' + getInformationByPosition[0].clockIn.toString())) / 60000)
                }

                arr.push({
                    id: index.toString(),
                    date: dateFormat(r.date),
                    clockIn: r.clockIn,
                    clockOut: r.clockOut,
                    type: r.type,
                    lateEarlyDeduct: Math.round(deduct * 100) / 100,
                    OT: OT,
                })
            })
        }
        setRows(arr);

    }, [POSTaddOT, getInformationByPosition, raw, rows]);

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
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
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