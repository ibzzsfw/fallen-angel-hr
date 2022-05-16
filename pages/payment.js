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
    Tile,
    Select,
    SelectItem
} from '@carbon/react';
import stylesBanner from '../scss/banner.module.scss';
import { monthNames, dateFormat } from '../utils/utils'
import axios from 'axios';

const Payment = (props) => {

    console.log(props);

    const [now, setNow] = useState(new Date());
    const [availableMonth, setAvailableMonth] = useState([]);
    const [sumOT, setSumOT] = useState(0);
    const [sumLate, setSumLate] = useState(0);
    const [sumEarly, setSumEarly] = useState(0);
    const [sumAbsent, setSumAbsent] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth());

    useEffect(() => {
        const months = [];
        [...Array(6).keys()].map(i => {
            let date = new Date(now.getFullYear(), now.getMonth() - i, 1)
            months.push({ month: date.getMonth(), year: date.getFullYear() })
        })

        setAvailableMonth(months);

    }, [now.getUTCMonth()])

    useEffect(() => {

        let sum = 0
        props.getIncomeByMonth.map(item => {
            sum += item.OTincome
        })
        setSumOT(sum);
    }, [props.getIncomeByMonth])

    useEffect(() => {

        let sumLate = 0
        let sumAbsent = 0
        let sumEarly = 0
        props.log.map(item => {
            if (item.type === 'late') {
                sumLate += 1
            } else if (item.type === 'earlyLeave') {
                sumEarly += 1
            } else if (item.type === 'absent') {
                sumAbsent += 1
            }
        })
        setSumLate(sumLate);
        setSumAbsent(sumAbsent);
        setSumEarly(sumEarly);
    }, [props.log])

    const sectionTitle = title => <p>{title}</p>

    const deductdate = new Date(props.log.date).getUTCDate().toString().padStart(2, '0') + '/' + new Date(props.log.date).getUTCMonth().toString().padStart(2, '0')

    return (
        <FlexGrid fullWidth className={styles.payment}>
            <Row className={stylesBanner.banner}>
                <Column lg={16}>
                    <h1 className={stylesBanner.heading}>{'Payment'}</h1>
                    <p className={stylesBanner.p}>{'Check your overall income'}</p>
                </Column>
            </Row>
            <Row className={styles.contentRow}>
                <Column max={4} className={styles.option}>
                    <Stack gap='32px'>
                        <Select
                            defaultValue="placeholder-item"
                            helperText="We provide 6 months of data"
                            id="select"
                            labelText="Select month"
                            size="md"
                            onChange={e => setSelectedMonth(e.target.value)}
                        >
                            <SelectItem
                                disabled
                                hidden
                                text="Choose an option"
                                value="placeholder-item"
                            />
                            {
                                availableMonth.map(time => {
                                    return (
                                        <SelectItem
                                            text={monthNames[time.month] + ', ' + time.year.toString()}
                                            value={time.month}
                                        />
                                    )
                                })
                            }
                        </Select>
                        <ExpandableTile className={styles.income}>
                            <TileAboveTheFoldContent>
                                <Stack gap='1rem' className={styles.stack}>
                                    <div className={styles['section-name']}>Income</div>
                                    <div className={styles.wraper}>
                                        <div className={styles.title}>Salary</div>
                                        <div className={styles.value}>฿{props.getIncomeByMonth[0].salary}</div>
                                    </div>
                                    <div className={styles.wraper}>
                                        <div className={styles.title}>Overtime</div>
                                        <div className={styles.value}>฿{sumOT}</div>
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
                                        {
                                            props.getIncomeByMonth.map(item => {
                                                return (
                                                    <div className={styles.ot}>
                                                        <div className={styles.date}>{new Date(item.date).getUTCDate().toString().padStart(2, '0')}</div>
                                                        <div className={styles.clock}>{item.clockOut}</div>
                                                        <div className={styles.value}>{item.OTincome}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </AccordionItem>
                                    <AccordionItem disabled title='Other' className={styles.AccordionItem} />
                                </Accordion>
                            </TileBelowTheFoldContent>
                        </ExpandableTile>
                        <ExpandableTile className={styles.deduction}>
                            <TileAboveTheFoldContent>
                                <div className={styles.aboveFold}>
                                    <div className={styles.title}>Deduction</div>
                                    <div className={styles.value}>- ฿{sumLate + sumAbsent + sumEarly}</div>
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
                                    {
                                        props.log.map(item => {
                                            if (item.type === 'late' && item.lateEarlyDeduct) {
                                                return (
                                                    <div className={styles.dec}>
                                                        <div className={styles.date}>{deductdate(item.date)}</div>                                                        <div className={styles.clock}>{item.clockIn}</div>
                                                        <div className={styles.value}>-{item.lateEarlyDeduct} ฿</div>
                                                        <Tag
                                                            className={styles["tag"]}
                                                            size="sm"
                                                            type="red"
                                                        >
                                                            Late
                                                        </Tag>
                                                    </div>
                                                )
                                            }
                                            if (item.type === 'earlyLeave' && item.lateEarlyDeduct) {
                                                return (
                                                    <div className={styles.dec}>
                                                        <div className={styles.date}>{deductdate(item.date)}</div>                                                        <div className={styles.clock}>{item.clockOut}</div>
                                                        <div className={styles.value}>-{item.lateEarlyDeduct} ฿</div>
                                                        <Tag
                                                            className={styles["tag"]}
                                                            size="sm"
                                                            type="magenta"
                                                        >
                                                            Eearly
                                                        </Tag>
                                                    </div>
                                                )
                                            }
                                            if (item.type === 'absent' && item.lateEarlyDeduct) {
                                                return (
                                                    <div className={styles.dec + ' ' + styles.absent}>
                                                        <div className={styles.date}>{deductdate(item.date)}</div>
                                                        <div className={styles.clock}>-</div>
                                                        <div className={styles.value}>-{item.lateEarlyDeduct} ฿</div>
                                                        <Tag
                                                            className={styles["tag"]}
                                                            size="sm"
                                                            type="purple"
                                                        >
                                                            Absent
                                                        </Tag>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                    {/* <div className={styles.dec}>
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
                                    </div> */}
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
                                    <Tag className={styles.tag} size="sm" type="green">{monthNames[selectedMonth]}</Tag>
                                </div>
                                <Tile className={styles.Tile}>
                                    <div className={styles.earn} style={{ color: 'green' }}>Earning</div>
                                    <div className={styles.wraperS}>
                                        <div className={styles.title}>Salary</div>
                                        <div className={styles.value}>฿{props.getIncomeByMonth[0].salary}</div>
                                    </div>
                                    <div className={styles.wraperS}>
                                        <div className={styles.title}>Overtime</div>
                                        <div className={styles.value}>฿{sumOT}</div>
                                    </div>
                                    <div className={styles.totalS}>
                                        <div className={styles.title}>Total</div>
                                        <div className={styles.value}>฿{props.getIncomeByMonth[0].salary + sumOT}</div>
                                    </div>
                                </Tile>
                                <Tile className={styles.Tile}>
                                    <div className={styles.earn} style={{ color: 'red' }}>Deduction</div>
                                    <div className={styles.wraperS}>
                                        <div className={styles.title}>Late</div>
                                        <div className={styles.value}>{sumLate > 0 ? '฿' + sumLate : '-'}</div>
                                    </div>
                                    <div className={styles.wraperS}>
                                        <div className={styles.title}>Absent</div>
                                        <div className={styles.value}>{sumAbsent > 0 ? '฿' + sumAbsent : '-'}</div>
                                    </div>
                                    <div className={styles.wraperS}>
                                        <div className={styles.title}>Early leave</div>
                                        <div className={styles.value}>฿{sumEarly > 0 ? '฿' + sumEarly : '-'}</div>
                                    </div>
                                    <div className={styles.totalS}>
                                        <div className={styles.title}>Total</div>
                                        <div className={styles.value}>฿{(sumLate + sumAbsent + sumEarly) > 0 ? '฿' + (sumLate + sumAbsent + sumEarly) : '-'}</div>
                                    </div>
                                </Tile>
                                <div className={styles.net}>
                                    <div className={styles.title}>Net pay</div>
                                    <div className={styles.value}><span>{props.getIncomeByMonth[0].salary + sumOT - (sumLate + sumAbsent + sumEarly)}</span>BAHT</div>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.info}>
                                    <div className={styles.title}>1. Employee Information</div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>Name</div>
                                        <div className={styles.infoVal}>{props.getProfile[0].firstName} {props.getProfile[0].LastName}</div>
                                    </div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>Phone</div>
                                        <div className={styles.infoVal}>{props.getProfile[0].phoneNumber}</div>
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>2. Company</div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>Department</div>
                                        <div className={styles.infoVal}>accounting and finance</div>
                                    </div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>Designation</div>
                                        <div className={styles.infoVal}>controller</div>
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.title}>3. Payment account</div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>Bank name</div>
                                        <div className={styles.infoVal}>{props.getProfile[0].bankName}</div>
                                    </div>
                                    <div className={styles.infoW}>
                                        <div className={styles.infoName}>Bank account</div>
                                        <div className={styles.infoVal}>{props.getProfile[0].bankAccount}</div>
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

    const res1 = await axios.get(`http://localhost:3000/api/payment/getIncomeByMonth`,
        { headers: { employeeid: "1ac39e28-8e18-4a54-b56a-14a53fac104c" } })
    const getIncomeByMonth = await res1.data;

    const res2 = await axios.get(`http://localhost:3000/api/dailytime/log`,
        {
            headers: {
                employeeid: '1ac39e28-8e18-4a54-b56a-14a53fac104c',
                type: 'absent'
            }
        })
    const log = await res2.data;

    const res3 = await axios.get(`http://localhost:3000/api/profile/getProfile`,
        { headers: { employeeid: "1ac39e28-8e18-4a54-b56a-14a53fac104c" } })
    const getProfile = await res3.data;

    return {
        props: {
            getIncomeByMonth: getIncomeByMonth,
            log: log,
            getProfile: getProfile
        }
    }
}