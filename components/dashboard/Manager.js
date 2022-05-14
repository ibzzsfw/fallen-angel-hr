import React from 'react';
import {
    Tile,
    Row,
    Column,
    ClickableTile
} from '@carbon/react';
import styles from '../../scss/dashboard/manager.module.scss';
import { DonutChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import "../../scss/plex-and-carbon-components.module.css";

const Manager = () => {

    const dataCount = [1, 2, 3, 4, 5].map(i => {
        return {
            "group": `Position ${i}`,
            "value": Math.random() * 10
        }
    })

    const optionsCount = {
        "title": "Employee count by position",
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
            "group": `Attend`,
            "value": 29
        },
        {
            "group": `Absent`,
            "value": 4
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

    return (<>
        <Row className={styles.chartRow}>
            <Column max={6}>
                <Row>
                    <div className={styles.welcome}>
                        <h1>Department: <span>Accounting</span></h1>
                    </div>
                    <div className={styles['sum']}>
                        <Tile as='div' className={styles.card}>
                            <div className={styles['sum-tile-title']}>Head count</div>
                            <div className={styles.value}>
                                <div className={styles['sum-tile-number']}>30</div>
                            </div>
                        </Tile>
                        <Tile as='div' className={styles.card}>
                            <div className={styles['sum-tile-title']}>Attend</div>
                            <div className={styles.value}>
                                <div className={styles['sum-tile-number']}>24</div>
                                <div className={styles['sum-tile-percent']}>(80%)</div>
                            </div>
                        </Tile>
                        <ClickableTile as='div' className={styles.card}>
                            <div className={styles['sum-tile-title']}>Leave request</div>
                            <div className={styles.value}>
                                <div className={styles['sum-tile-number']}>2</div>
                            </div>
                        </ClickableTile>
                        <ClickableTile as='div' className={styles.card}>
                            <div className={styles['sum-tile-title']}>Absent</div>
                            <div className={styles.value}>
                                <div className={styles['sum-tile-number']}>6</div>
                                <div className={styles['sum-tile-percent']}>(20%)</div>
                            </div>
                        </ClickableTile>
                    </div>
                </Row>
            </Column>
            <Column max={5}>
                <Tile>
                    <DonutChart
                        data={dataPro}
                        options={optionsPro}>
                    </DonutChart>
                </Tile>
            </Column>
            <Column max={5}>
                <Tile>
                    <DonutChart
                        data={dataCount}
                        options={optionsCount}>
                    </DonutChart>
                </Tile>
            </Column>
        </Row>
        <Row>
            <Tile />
        </Row>
        <Row>
            <Tile />
        </Row>
    </>)
}

export default Manager;