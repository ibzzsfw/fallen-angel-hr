import {
    Column,
    FlexGrid,
    Row,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@carbon/react';
import axios from 'axios';
import AddBooking from "../components/leave/AddBooking";
import LeaveSummary from "../components/leave/LeaveSummary";
import Remain from "../components/leave/Remain";
import StatusBooking from "../components/leave/StatusBooking";
import stylesBanner from '../scss/banner.module.scss';
import styles from '../scss/leave/leave.module.scss';

const Leave = (props) => {

    console.log(props)

    return (
        <FlexGrid fullWidth className={styles.leave}>
            <Row className={stylesBanner.banner + ' ' + stylesBanner.tabs}>
                <Column lg={16}>
                    <h1 className={stylesBanner.heading}>{'Leave'}</h1>
                    <p className={stylesBanner.p}>{'Self-Scheduling Leave application'}</p>
                </Column>
            </Row>
            <Row>
                <Column >
                    <Tabs aria-label="Tab navigation">
                        <TabList scrollIntoView style={{ justifyContent: 'flex-end' }}>
                            <Tab >Summary</Tab>
                            <Tab >Booking status</Tab>
                        </TabList>
                        <TabPanels className={styles['tab-content']}>
                            <TabPanel>
                                <Row className={styles.mainRow}>
                                    <Column max={5} className={styles.left}>
                                        <Stack gap='32px' className={styles.stack}>
                                            <AddBooking leaveType={props.leaveType} />
                                            <Remain remain={props.remain} />
                                        </Stack>
                                    </Column>
                                    <Column max={6} className={styles.right}>
                                        <LeaveSummary
                                            summaryMonth={props.summaryMonth}
                                            summaryYear={props.summaryYear}
                                        />
                                    </Column>
                                </Row>
                            </TabPanel>
                            <TabPanel>
                                <StatusBooking getLeaveBookingStatus={props.getLeaveBookingStatus} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Column>
            </Row>
        </FlexGrid>
    );
}

export default Leave;

export const getStaticProps = async () => {

    const res1 = await axios.get('http://localhost:3000/api/leave/remain', {
        headers: {
            employeeid: '1ac39e28-8e18-4a54-b56a-14a53fac104c'
        }
    })
    const remain = await res1.data

    const res2 = await axios.get('http://localhost:3000/api/leave/leaveType')
    const leaveType = await res2.data;

    let summaryMonth = []
    let summaryYear = []

    const promise = leaveType.map(async (type, index) => {
        let resY = await axios.get('http://localhost:3000/api/leave/leaveBookingSummary', {
            headers: {
                // employeeid: '0e38af30-7a6a-4201-9584-42264f2684fc',
                duration: 365,
                leaveid: type.leaveID
            }
        })

        summaryYear.push({
            leaveName: type.leaveName,
            status: resY.data,
        })

        let resM = await axios.get('http://localhost:3000/api/leave/leaveBookingSummary', {
            headers: {
                // employeeid: '0e38af30-7a6a-4201-9584-42264f2684fc',
                duration: 30,
                leaveid: type.leaveID
            }
        })

        summaryMonth.push({
            leaveName: type.leaveName,
            status: resM.data,
        })
    })
    await Promise.all(promise)

    let res3 = await axios.get('http://localhost:3000/api/leave/getLeaveBookingStatus')
    let getLeaveBookingStatus = await res3.data

    return {
        props: {
            remain: remain,
            summaryYear: summaryYear,
            summaryMonth: summaryMonth,
            leaveType: leaveType,
            getLeaveBookingStatus: getLeaveBookingStatus
        }
    }

}
