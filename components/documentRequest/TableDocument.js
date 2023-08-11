import {
    Column,
    DataTable,
    FlexGrid,
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
import { useEffect, useState } from "react";
import styles from '../../scss/documentRequest/table-document.module.scss';
import Offcanvas from "../Offcanvas";
import { rows } from "./DocData";
import DocDetails from "./DocDetails";

const TableDocument = () => {

    const [totalItems, setTotalItems] = useState(0);
    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [currentPageSize, setCurrentPageSize] = useState(10);

    const [isOpen, setIsOpen] = useState(false);
    const [rowID, setRowID] = useState('');

    useEffect(() => setTotalItems(rows.length), [rows]);
    useEffect(() => {
        if (!isOpen) {
            setRowID('');
        }
    }, [isOpen]);

    useEffect(() => {
        console.log('isOpen', isOpen);
        console.log('rowID', rowID);
    }, [isOpen, rowID]);

    const headers = [
        {
            key: 'date',
            header: 'Requesting Date',
        },
        {
            key: 'type',
            header: 'Document type',
        },
        {
            key: 'purpose',
            header: 'Purpose',
        },
        {
            key: 'status',
            header: 'Status',
        },
    ];

    return (
        <FlexGrid fullWidth className={styles['table']}>
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
                            <TableContainer>
                                <TableToolbar>
                                    <TableToolbarContent>
                                        <TableToolbarSearch
                                            onChange={onInputChange}
                                            placeholder={'Search something'}
                                            defaultExpanded={true}
                                        />
                                    </TableToolbarContent>
                                </TableToolbar>
                                <Table {...getTableProps()}>
                                    <TableHead>
                                        <TableRow>
                                            {headers.map(header => (
                                                <TableHeader key={header.key} {...getHeaderProps({ header })}>
                                                    {header.header}
                                                </TableHeader>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            rows.map(row => (
                                                <TableRow
                                                    key={row.id}
                                                    {...getRowProps({ row })}
                                                    onClick={() => {
                                                        setRowID(row.id)
                                                        setIsOpen(true)
                                                    }}
                                                >
                                                    {row.cells.map((cell) => (
                                                        <TableCell key={cell.id}>{cell.value}</TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
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
            {
                isOpen &&
                <Offcanvas isOpen={q => setIsOpen(q)}>
                    <DocDetails />
                </Offcanvas>
            }
        </FlexGrid>
    )
}

export default TableDocument;