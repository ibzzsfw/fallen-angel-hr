import React, { useEffect, useState } from 'react';
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
    Row,
    Tile
} from '@carbon/react';
import stylesBanner from '../scss/banner.module.scss';
import { monthNames } from '../utils/utils'

const Payment = (props) => {

    //console.log(props);

    useEffect(() => {
        console.log(props.getIncomeByMonth);
    }, [getStaticProps])

    const [now, setNow] = useState(new Date());
    const [availableMonth, setAvailableMonth] = useState([]);

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
            <Row className={stylesBanner.banner}>
                <Column lg={16}>
                    <h1 className={stylesBanner.heading}>{'Payment'}</h1>
                    <p className={stylesBanner.p}>{'Description'}</p>
                </Column>
            </Row>
            <Row className={styles.contentRow}>
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
                            label=''
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
                <Column max={{ span: 8, offset: 2 }} className={styles.slip}>
                    <div className={styles.slipbody}>
                        <div className={styles.head}>FallenAngel</div>
                        <div className={styles.body}>
                            <div className={styles.left}>
                                <div className={styles.mainTitle}>Pay slip</div>
                                <div className={styles.date}>
                                    <p>for the period of</p>
                                    <Tag className={styles.tag} size="sm" type="green">Fabuary</Tag>
                                </div>
                                <Tile className={styles.Tile}>
                                    <div className={styles.earn} style={{color: 'green'}}>Earning</div>
                                    <div className={styles.wraperS}>
                                        <div className={styles.title}>Salary</div>
                                        <div className={styles.value}>฿100000</div>
                                    </div>
                                    <div className={styles.wraperS}>
                                        <div className={styles.title}>Overtime</div>
                                        <div className={styles.value}>฿1000</div>
                                    </div>
                                    <div className={styles.totalS}>
                                        <div className={styles.title}>Total</div>
                                        <div className={styles.value}>฿101000</div>
                                    </div>
                                </Tile>
                                <Tile className={styles.Tile}>
                                    <div className={styles.earn} style={{color: 'red'}}>Deduction</div>
                                    <div className={styles.wraperS}>
                                        <div className={styles.title}>Late</div>
                                        <div className={styles.value}>฿1000</div>
                                    </div>
                                    <div className={styles.wraperS}>
                                        <div className={styles.title}>Absent</div>
                                        <div className={styles.value}>-</div>
                                    </div>
                                    <div className={styles.totalS}>
                                        <div className={styles.title}>Total</div>
                                        <div className={styles.value}>฿1000</div>
                                    </div>
                                </Tile>
                                <div className={styles.net}>
                                    <div className={styles.title}>Net pay</div>
                                    <div className={styles.value}><span>12345 </span>BAHT</div>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.info}>
                                    <div className={styles.title}>1. Employee Information</div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>Name</div>
                                        <div className={styles.infoVal}>Suppakorn</div>
                                    </div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>ID</div>
                                        <div className={styles.infoVal}>IT007</div>
                                    </div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>Phone</div>
                                        <div className={styles.infoVal}>(+66)954205601</div>
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>1. Employee Information</div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>Name</div>
                                        <div className={styles.infoVal}>Suppakorn</div>
                                    </div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>ID</div>
                                        <div className={styles.infoVal}>IT007</div>
                                    </div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>Phone</div>
                                        <div className={styles.infoVal}>(+66)954205601</div>
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>1. Employee Information</div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>Name</div>
                                        <div className={styles.infoVal}>Suppakorn</div>
                                    </div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>ID</div>
                                        <div className={styles.infoVal}>IT007</div>
                                    </div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>Phone</div>
                                        <div className={styles.infoVal}>(+66)954205601</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Column>
            </Row>
        </FlexGrid>
    )
}

export default Payment;

export const getStaticProps = async () => {

    const res1 = await axios.get('http://localhost:3000/api/payment/getIncomeByMonth',
                        {headers: {employeeid: "1ac39e28-8e18-4a54-b56a-14a53fac104c"}})
    const getIncomeByMonth = await res1.data;

/*     const res2 = await axios.get('http://localhost:3000/api/dailytime/getLog',
                        {headers: {employeeid: "1ac39e28-8e18-4a54-b56a-14a53fac104c"}})
    const getDeductionByMonth = await res2.data; */

    return {
        props: {
            getIncomeByMonth: getIncomeByMonth,
            /* getDeductionByMonth: getDeductionByMonth */
        }
    }
}