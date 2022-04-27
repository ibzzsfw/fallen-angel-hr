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
} from 'carbon-components-react';
import { rows, headers } from './LogData';

const Log = () => {

    const [totalItems, setTotalItems] = useState(rows.length);
    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [currentPageSize, setCurrentPageSize] = useState(10);

    useEffect(() => setTotalItems(rows.length), [rows]);

    return (
        <div className="cds--grid cds--grid--full-width log">
            <div className="cds--row">
                <div className="cds--col">
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
                                        {/* pass in `onInputChange` change here to make filtering work */}
                                        <TableToolbarSearch onChange={onInputChange} placeholder={'Search something'} />
                                        <TableToolbarMenu>
                                            <TableToolbarAction >
                                                Action 1
                                            </TableToolbarAction>
                                            <TableToolbarAction >
                                                Action 2
                                            </TableToolbarAction>
                                            <TableToolbarAction >
                                                Action 3
                                            </TableToolbarAction>
                                        </TableToolbarMenu>
                                        <Button onClick={console.log('Button click')}>Primary Button</Button>
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
                </div>
            </div>
        </div>
    )
}

export default Log;