import { DonutChart, StackedBarChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import { Person_03, Person_04 } from '@carbon/pictograms-react';
import {
    Column,
    Row,
    Tile
} from '@carbon/react';
import React, { useEffect, useState } from 'react';
import styles from '../../scss/dashboard/admin.module.scss';
import "../../scss/plex-and-carbon-components.module.css";

const Admin = ({ getStatusCount, getPositionCount, getDepartmentCount, getSalaryCount, getSex }) => {

    const statusCount = getStatusCount.map((e) => {
        return {
            "group": e.type,
            "value": e.countStatus
        }
    })

    const departmentCount = getDepartmentCount.map((e) => {
        return {
            "group": e.departmentName,
            "value": e.countDepartment
        }
    })

    const optionsCount = {
        "title": "Employee count by status",
        "resizable": true,
        "legend": {
            "alignment": "center"
        },
        "donut": {
            "center": {
                "label": "Records"
            },
            "alignment": "center"
        },
        "height": "350px"
    }

    const [lessthan30k, setlessthan30k] = useState();
    const [morethan30k, setmorethan30k] = useState();
    const [morethan40k, setmorethan40k] = useState();
    const [morethan60k, setmorethan60k] = useState();

    const countBySalary = (getSalaryCount) => {

        let lessthan30k = 0;
        let morethan30k = 0;
        let morethan40k = 0;
        let morethan60k = 0;

        getSalaryCount.map((e) => {
            if (e.salary < 30000) lessthan30k++;
            else if (e.salary >= 30000 && e.salary < 40000) morethan30k++;
            else if (e.salary >= 40000 && e.salary < 60000) morethan40k++;
            else if (e.salary > 60000) morethan60k++;
        })
        setlessthan30k(lessthan30k);
        setmorethan30k(morethan30k);
        setmorethan40k(morethan40k);
        setmorethan60k(morethan60k);
    }

    useEffect(() => {
        countBySalary(getSalaryCount);
    }, [getSalaryCount])

    const dataPro2 = [
        {
            "group": `< 30k`,
            "value": lessthan30k
        },
        {
            "group": `30k - 40k`,
            "value": morethan30k
        },
        {
            "group": `40k - 60k`,
            "value": morethan40k
        },
        {
            "group": `> 60k`,
            "value": morethan60k
        }
    ]

    const optionsPro2 = {
        "title": "Employee count by salary range",
        "resizable": true,
        "legend": {
            "alignment": "center"
        },
        "donut": {
            "center": {
                "label": "Employees"
            },
            "alignment": "center"
        },
        "height": "350px"
    }

    const optionsPro = {
        "title": "Employee count by department",
        "resizable": true,
        "legend": {
            "alignment": "center"
        },
        "donut": {
            "center": {
                "label": "Employees"
            },
            "alignment": "center"
        },
        "height": "350px"
    }

    const employeeByPositionData = getPositionCount.map((e) => {
        return {
            "group": e.positionName,
            "value": e.countPosition
        }
    }).flat()

    const employeeByPositionOptions = {
        "title": "Employee count by position",
        "legend": {
            "alignment": "center"
        },
        "axes": {
            "left": {
                "mapsTo": "group",
                "scaleType": "labels"
            },
            "bottom": {
                "mapsTo": "value"
            }
        },
        "height": "400px"
    }


    return (<>
        <Row className={styles['row-margin-bottom']}>
            <div className={styles.welcome}>
                <h1>{'Year  '}<span>{new Date().getUTCFullYear().toString()}</span></h1>
            </div>
        </Row>
        <Row className={styles['row-margin-bottom']}>
            {
                [
                    { title: 'Head count', value: '223' },
                    { title: 'Absenteeism', value: '1.15%' },
                    { title: 'Promotion', value: '32.5%' },
                    { title: 'Turnover', value: '3.28%' },
                ].map(item => {
                    return (
                        <Column key={item.title}>
                            <Tile className={styles.card}>
                                <div className={styles['sum-tile-title']}>{item.title}</div>
                                <div className={styles.value}>
                                    <div className={styles['sum-tile-number']}>{item.value}</div>
                                </div>
                            </Tile>
                        </Column>
                    )
                })
            }
        </Row>
        <Row className={styles['row-margin-bottom']}>
            <Column>
                <Tile>
                    <DonutChart
                        data={statusCount}
                        options={optionsCount}>
                    </DonutChart>
                </Tile>
            </Column>
            <Column>
                <Tile>
                    <DonutChart
                        data={dataPro2}
                        options={optionsPro2}>
                    </DonutChart>
                </Tile>
            </Column>
            <Column>
                <Tile>
                    <DonutChart
                        data={departmentCount}
                        options={optionsPro}>
                    </DonutChart>
                </Tile>
            </Column>
        </Row>
        <Row className={styles['row-margin-bottom']}>
            <Column max={5}>
                <Tile className={styles.employeeStructure}>
                    <div className={styles.title}>Employee structure</div>
                    <div className={styles.below}>
                        <div className={styles.gender}>
                            <Person_03 className={styles.male} />
                            <div className={styles.value}>{getSex[1].countSex}</div>
                        </div>
                        <div className={styles.gender}>
                            <Person_04 className={styles.female} />
                            <div className={styles.value}>{getSex[0].countSex}</div>
                        </div>
                    </div>
                </Tile>
                <Tile />
            </Column>
            <Column max={11}>
                <Tile>
                    <StackedBarChart
                        data={employeeByPositionData}
                        options={employeeByPositionOptions}>
                    </StackedBarChart>
                </Tile>
            </Column>
        </Row>
    </>)
}

export default Admin;