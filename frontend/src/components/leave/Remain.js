import React from "react";
import styles from '../../scss/leave/remain-tile.module.scss';
import {
    Stack,
    Tile,
} from '@carbon/react';

const Remain = () => {

    const remainByType = (item) => {

        let type = item.type.charAt(0).toUpperCase() + item.type.slice(1)
        let amount = item.amount

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
                    [
                        { type: 'sick', amount: '13' },
                        { type: 'annual', amount: '1' },
                        { type: 'maternity', amount: '50' },
                        { type: 'paternity', amount: '0' },
                        { type: 'study', amount: '0' },
                    ].map(item => {
                        return remainByType(item);
                    })
                }
            </Stack>
        </Tile>
    )
}

export default Remain;