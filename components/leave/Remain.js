import React from "react";
import styles from '../../scss/leave/remain-tile.module.scss';
import {
    Stack,
    Tile,
} from '@carbon/react';

const Remain = ({ remain }) => {

    const remainByType = (key, value) => {

        let type = key
        let amount = value

        return (
            <div className={styles.remain}>
                <div className={styles.amount}>{amount}</div>
                <div className={styles.description}>{type}</div>
            </div>
        )
    }

    return (
        <Tile className={styles['remain-tile']}>
            <div className={styles.header}>
                <div className={styles.intro}>Your availble day for each leave type</div>
                <div className={styles.title}>Day remain this year</div>
            </div>
            <Stack orientation="horizontal" gap='2rem'>
                {
                    Object.keys(remain[0]).map(key => {
                        return remainByType(key, remain[0][key]);
                    })
                }
            </Stack>
        </Tile>
    )
}

export default Remain;