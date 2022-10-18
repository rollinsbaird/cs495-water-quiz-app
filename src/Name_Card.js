import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const NameCard = (props) => {
    return(
        <Item>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary">{props.difficulty}</Typography>
                <Typography sx={{fontSize: 36, fontWeight: "bold" }} color="text.primary">{props.title}</Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary">{props.description}</Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary">{props.tags}</Typography>
            </CardContent>
        </Item>
    )
}

export default NameCard;