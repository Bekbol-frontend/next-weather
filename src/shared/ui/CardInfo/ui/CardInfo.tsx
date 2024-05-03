"use client"
import {Card, Metric, Text, Color, HorizontalPosition, VerticalPosition} from '@tremor/react'
import {memo} from "react";

interface IProps {
    text: string;
    metric: string | number;
    color?: Color;
    decoration?: HorizontalPosition | VerticalPosition
}

function CardInfo(props: IProps) {
    const {metric, text, color = "blue", decoration = "top"} = props

    return (
        <Card
            decoration={decoration}
            decorationColor={color}
        >
            <Text>{text}</Text>
            <Metric>
                {metric}
            </Metric>
        </Card>
    );
}

export default memo(CardInfo);