import React from "react";
import styles from '../scss/documentRequest/document.module.scss';
import Banner from "../components/Banner";
import { 
    FlexGrid,
    Row,
    Column,
    Tile,
    Stack,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel
} from "@carbon/react";
import AddBookDoc from "../components/documentRequest/AddBookingDoc";
import DocSummary from "../components/documentRequest/DocSummary";
import DocStatus from "../components/documentRequest/DocStatus";

const Document = () => {

    return (
        <FlexGrid fullWidth className={styles.document}>
            < Banner heading="Document request" p="Self-Requesting documents" tabs={true} />
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
                                            <AddBookDoc />
                                            <DocSummary />
                                        </Stack>
                                    </Column>
                                </Row>
                            </TabPanel>
                            <TabPanel>
                                <DocStatus />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Column>
            </Row>
        </FlexGrid>
    )
}

export default Document;