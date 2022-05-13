import {
    Tile,
    Row,
    Column,
    Stack
} from '@carbon/react';
import styles from '../../scss/dashboard/admin.module.scss';
import { DonutChart, StackedBarChart } from "@carbon/charts-react";
import { Person_03, Person_04 } from '@carbon/pictograms-react'
import "@carbon/charts/styles.css";
import "../../scss/plex-and-carbon-components.module.css";

const Admin = () => {

    const dataCount = [1, 2, 3, 4, 5].map(i => {
        return {
            "group": `Position ${i}`,
            "value": Math.random() * 10
        }
    })

    const optionsCount = {
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

    const dataPro = [
        {
            "group": `< 30k`,
            "value": Math.random() * 10
        },
        {
            "group": `30k - 40k`,
            "value": Math.random() * 10
        },
        {
            "group": `40k - 60k`,
            "value": Math.random() * 10
        },
        {
            "group": `> 60k`,
            "value": Math.random() * 10
        }
    ]

    const optionsPro = {
        "title": "Employee count by status",
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

    const employeeByDepartmentData = [1, 2, 3, 4, 5].map(i => {

        return (
            [1, 2, 3, 4, 5, 6].map(j => {

                return {
                    "group": `Position ${i + Math.random() * 10}`,
                    "key": `Department ${j}`,
                    "value": Math.random() * 10
                }
            })
        )
    }).flat()

    const employeeByDepartmentOptions = {
        "title": "Horizontal stacked bar (discrete)",
        "axes": {
            "left": {
                "scaleType": "labels",
                "mapsTo": "key"
            },
            "bottom": {
                "stacked": true,
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
                        <Column>
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
                        data={dataCount}
                        options={optionsCount}>
                    </DonutChart>
                </Tile>
            </Column>
            <Column>
                <Tile>
                    <DonutChart
                        data={dataPro}
                        options={optionsPro}>
                    </DonutChart>
                </Tile>
            </Column>
            <Column>
                <Tile>
                    <DonutChart
                        data={dataPro}
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
                            <Person_03 className={styles.male}/>
                            <div className={styles.value}>49%</div>
                        </div>
                        <div className={styles.gender}>
                            <Person_04 className={styles.female}/>
                            <div className={styles.value}>51%</div>
                        </div>
                    </div>
                </Tile>
                <Tile />
            </Column>
            <Column max={11}>
                <Tile>
                    <StackedBarChart
                        data={employeeByDepartmentData}
                        options={employeeByDepartmentOptions}>
                    </StackedBarChart>
                </Tile>
            </Column>
        </Row>
    </>)
}

export default Admin;