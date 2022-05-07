import React from "react";

import { FlexGrid, Row, Column } from '@carbon/react';

export default function Leave() {
    return (
        <FlexGrid>
            <Row>
                <Column lg={4}>Span 4 of 12</Column>
                <Column lg={4}>Span 4 of 12</Column>
                <Column lg={4}>Span 4 of 12</Column>
                <Column lg={4}>Span 4 of 12</Column>
            </Row>
        </FlexGrid>
    );
}