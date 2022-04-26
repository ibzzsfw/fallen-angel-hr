import React from "react";
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

const Log = () => {

    const rows = [
        {
            attached_groups: 'Kevin’s VM Groups',
            id: 'a',
            name: 'Load Balancer 3',
            port: 3000,
            protocol: 'HTTP',
            rule: 'Round robin',
            status: <Link disabled>Disabled</Link>
        },
        {
            attached_groups: 'Maureen’s VM Groups',
            id: 'b',
            name: 'Load Balancer 1',
            port: 443,
            protocol: 'HTTP',
            rule: 'Round robin',
            status: <Link>Starting</Link>
        },
        {
            attached_groups: 'Andrew’s VM Groups',
            id: 'c',
            name: 'Load Balancer 2',
            port: 80,
            protocol: 'HTTP',
            rule: 'DNS delegation',
            status: <Link>Active</Link>
        },
        {
            attached_groups: 'Marc’s VM Groups',
            id: 'd',
            name: 'Load Balancer 6',
            port: 3000,
            protocol: 'HTTP',
            rule: 'Round robin',
            status: <Link disabled>Disabled</Link>
        },
        {
            attached_groups: 'Mel’s VM Groups',
            id: 'e',
            name: 'Load Balancer 4',
            port: 443,
            protocol: 'HTTP',
            rule: 'Round robin',
            status: <Link>Starting</Link>
        },
        {
            attached_groups: 'Ronja’s VM Groups',
            id: 'f',
            name: 'Load Balancer 5',
            port: 80,
            protocol: 'HTTP',
            rule: 'DNS delegation',
            status: <Link>Active</Link>
        }
    ];
    const headers = [
        {
            header: 'Name',
            key: 'name'
        },
        {
            header: 'Protocol',
            key: 'protocol'
        },
        {
            header: 'Port',
            key: 'port'
        },
        {
            header: 'Rule',
            key: 'rule'
        },
        {
            header: 'Attached groups',
            key: 'attached_groups'
        },
        {
            header: 'Status',
            key: 'status'
        }
    ];

    return (
        <div className="cds--grid cds--grid--full-width log">
            <div className="cds--row" style={{ marginTop: '$spacing-09' }}>
                <div className="cds--col">
                    <DataTable rows={rows} headers={headers}>
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
                                        <TableToolbarSearch onChange={onInputChange} />
                                        <TableToolbarMenu>
                                            <TableToolbarAction onClick={console.log('Action 1 Click')}>
                                                Action 1
                                            </TableToolbarAction>
                                            <TableToolbarAction onClick={console.log('Action 2 Click')}>
                                                Action 2
                                            </TableToolbarAction>
                                            <TableToolbarAction onClick={console.log('Action 3 Click')}>
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
                                                <TableHeader key={header.key} {...getHeaderProps({ header, isSortable: true })}>
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
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </DataTable>
                    <Pagination
                        backwardText="Previous page"
                        forwardText="Next page"
                        itemsPerPageText="Items per page:"
                        onChange={function noRefCheck() { }}
                        page={1}
                        pageSize={10}
                        pageSizes={[
                            10,
                            20,
                            30,
                            40,
                            50
                        ]}
                        size="md"
                        totalItems={103}
                    />
                </div>
            </div>
        </div>
    )
}

export default Log;