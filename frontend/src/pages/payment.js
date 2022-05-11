import React, { useEffect, useState } from 'react';
import Banner from '../components/banner';
import styles from '../scss/payment/payment.module.scss';
import {
    FlexGrid,
    Column,
    Dropdown,
    Stack,
    ExpandableTile,
    TileAboveTheFoldContent,
    TileBelowTheFoldContent,
    Accordion,
    AccordionItem,
    Tag,
} from '@carbon/react';

const Payment = () => {

    const [now, setNow] = useState(new Date());
    const [availableMonth, setAvailableMonth] = useState([]);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        const months = [];
        [...Array(6).keys()].map(i => {
            let date = new Date(now.getFullYear(), now.getMonth() - i, 1)
            months.push({ month: date.getMonth(), year: date.getFullYear() })
        })

        setAvailableMonth(months);

    }, [now.getUTCMonth()])

    const sectionTitle = title => <p>{title}</p>

    return (
        <FlexGrid fullWidth className={styles.payment}>
            < Banner heading="Payment" p="Some great description" tabs={false} />
            <Column max={4} className={styles.option}>
                <Stack gap='32px'>
                    <Dropdown
                        helperText="We provide the last 6 months of payment history"
                        id="month"
                        itemToString={item => item ? item.text : ''}
                        items={
                            availableMonth.map(time => {
                                return {
                                    id: time.month,
                                    text: monthNames[time.month] + ', ' + time.year.toString()
                                }
                            })
                        }
                        label={monthNames[now.getUTCMonth()] + ', ' + now.getFullYear().toString()}
                        titleText={<p>Select month</p>}
                    />
                    <ExpandableTile className={styles.income}>
                        <TileAboveTheFoldContent>
                            <Stack gap='1rem' className={styles.stack}>
                                <div className={styles['section-name']}>Income</div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Salary</div>
                                    <div className={styles.value}>฿100000</div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Overtime</div>
                                    <div className={styles.value}>฿3400</div>
                                </div>
                            </Stack>
                        </TileAboveTheFoldContent>
                        <TileBelowTheFoldContent>
                            <Accordion className={styles.Accordion}>
                                <AccordionItem title='Overtime' className={styles.AccordionItem}>
                                    <div className={styles.ot}>
                                        <div className={styles.colName}>Date</div>
                                        <div className={styles.colName}>Clock out</div>
                                        <div className={styles.colName}>Income</div>
                                    </div>
                                    <div className={styles.ot}>
                                        <div className={styles.date}>23/05</div>
                                        <div className={styles.clock}>18.30</div>
                                        <div className={styles.value}>360</div>
                                    </div>
                                    <div className={styles.ot}>
                                        <div className={styles.date}>24/05</div>
                                        <div className={styles.clock}>18.00</div>
                                        <div className={styles.value}>300</div>
                                    </div>
                                    <div className={styles.ot}>
                                        <div className={styles.date}>25/05</div>
                                        <div className={styles.clock}>21.00</div>
                                        <div className={styles.value}>500</div>
                                    </div>
                                </AccordionItem>
                                <AccordionItem disabled title='Other' className={styles.AccordionItem} />
                            </Accordion>
                        </TileBelowTheFoldContent>
                    </ExpandableTile>
                    <ExpandableTile className={styles.deduction}>
                        <TileAboveTheFoldContent>
                            <div className={styles.aboveFold}>
                                <div className={styles.title}>Deduction</div>
                                <div className={styles.value}>- ฿780</div>
                            </div>
                        </TileAboveTheFoldContent>
                        <TileBelowTheFoldContent>
                            <Accordion className={styles.Accordion}>
                                <div className={styles.dec}>
                                    <div className={styles.colName}>Date</div>
                                    <div className={styles.colName}>Clock</div>
                                    <div className={styles.colName}>Deduct</div>
                                    <div className={styles.colName}>Type</div>
                                </div>
                                <div className={styles.dec}>
                                    <div className={styles.date}>23/05</div>
                                    <div className={styles.clock}>08.39</div>
                                    <div className={styles.value}>-360</div>
                                    <Tag
                                        className={styles["tag"]}
                                        size="sm"
                                        type="red"
                                    >
                                        Late
                                    </Tag>
                                </div>
                                <div className={styles.dec}>
                                    <div className={styles.date}>24/05</div>
                                    <div className={styles.clock}>10.00</div>
                                    <div className={styles.value}>-300</div>
                                     <Tag
                                        className={styles["tag"]}
                                        size="sm"
                                        type="magenta"
                                    >
                                        Eearly
                                    </Tag>
                                </div>
                                <div className={styles.dec + ' ' + styles.absent}>
                                    <div className={styles.date}>25/05</div>
                                    <div className={styles.clock}>-</div>
                                    <div className={styles.value}>-500</div>
                                    <Tag
                                        className={styles["tag"]}
                                        size="sm"
                                        type="purple"
                                    >
                                        Absent
                                    </Tag>
                                </div>
                                <div className={styles.dec}>
                                    <div className={styles.date}>25/05</div>
                                    <div className={styles.clock}>-</div>
                                    <div className={styles.value}>-500</div>
                                   <Tag
                                        className={styles["tag"]}
                                        size="sm"
                                        type="blue"
                                    >
                                        Over leave
                                    </Tag>
                                </div>
                            </Accordion>
                        </TileBelowTheFoldContent>
                    </ExpandableTile>
                </Stack>
            </Column>
            <Column className={styles.slip}>

            </Column>
        </FlexGrid>
    )
}

export default Payment;