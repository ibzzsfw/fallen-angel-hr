import React, { useState } from 'react';
import styles from '../scss/manage/manage.module.scss';
import {
    FlexGrid,
    Row,
    Column,
} from '@carbon/react';
import Promotion from '../components/Promotion';

const Manage = () => {

    return (
        <FlexGrid fullWidth className={styles.manage}>
            <Row>
                <Column max={6} xlg={6} lg={6} md={0} sm={0} className={styles.bg} />
                <Column max={10} xlg={10} lg={10} md={8} sm={4} className={styles.mainCol}>
                    <Promotion />
                </Column>
            </Row>
        </FlexGrid>
    )
}

export default Manage;