import * as React from 'react';

import {Box, Grid, CardContent, Card, Stack} from '@mui/material'
import "./maindiv.css"
import StorefrontIcon from '@mui/icons-material/Storefront';
import BusinessIcon from '@mui/icons-material/Business';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Candlestick from '../charts/Candlestick';
import {useEffect, useState } from 'react'

export default function MainDiv({Nifty, sym, name, sector, interval}) {
  const [value, setValue] = useState({
    open : 0,
    close : 0,
    high : 0,
    low : 0,
    vol : 0,
    chg : 0,
    perChg : 0,
    price : 0,
  })

  
  useEffect(()=>{
    const apikey = process.env.REACT_APP_API_KEY

    const fetchData = async ()=>{
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${sym}&token=${apikey}`);
      const data = await response.json();
      console.log(data)
      setValue({
        open : data.o,
        close : data.pc,
        high : data.h,
        low : data.l,
        chg : data.d,
        perChg : data.dp,
        price : data.c,
      })
    }
    fetchData()
  },[sym])

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <Stack spacing={2} direction="row">
        <Card sx={{ minWidth: 49+"%", height : 150 }} className="gradient" id="card1">
        <CardContent>
        <Stack spacing={2} direction="row">
            <div className='iconstyle'>
            <BusinessIcon/>
            </div>
            <div className='paddingall'>
            <span className='analyticstitle'>
            {sym} - {name}
            </span>
            <br />
            <span className='analyticssubtitle'>
                Sector : {sector}
            </span>
            </div>
        </Stack>
        <a href={`https://stockanalysis.com/stocks/${sym}`}>Learn More</a>
      </CardContent>
    </Card>
        <Card sx={{ minWidth: 49+"%", height : 150 }} className="gradientlight" id="card2">
      <CardContent>

        <Stack spacing={2} direction="row">
            <div className='iconstyle'>
            <AnalyticsIcon/>
            </div>
            <div className='paddingall'>
            <span className='analyticstitle'>
            Analytics
            </span>
            <br />
            <span className='analyticssubtitle'>
            Niftyindex : {Nifty}  . {interval} minute 
            </span>
            <br />
            <span className='analyticssubtitle'>
            O : {value.open} |  C : {value.close} |  H : {value.high} |  L : {value.low}
            </span>
            </div>
        </Stack>
      </CardContent>
    </Card>
    </Stack>
        </Grid>
        <Grid item xs={4}>
        <Stack spacing={2}>
        <Card className='gradientlight' id="card3">
        <Stack spacing={2} direction="row">
        <div className="iconstyle">
            <StorefrontIcon/>
        </div>
        <div className='paddingall'>
        <span className='pricetitle' style={{color : "white"}}>{value.price}</span>
        <br />
        <span className='pricesubtitle' style={{color : "white"}}>Share price</span>
        </div>
        </Stack>
      
    </Card>
        <Card id="card4">
      
        <Stack spacing={2} direction="row">
        <div className="iconstyleblack">
            <StorefrontIcon/>
        </div>
        <div className='paddingall'>
        <span className='pricetitle' style={{fontWeight : "400"}}>Change : {value.chg}</span>
        <br />
        <span className='pricesubtitle'>% Change : {value.perChg}</span>
        </div>
        </Stack>
      
    </Card>
        </Stack>
        </Grid>
      </Grid>
      <Box height={20}/>
      <Grid container >
        <Grid item xs={12}>
        <Card sx={{ height: 60+"vh" }} id="card5">
        <CardContent>
          <Candlestick sym={sym} interval={interval} />
        </CardContent>

        </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
