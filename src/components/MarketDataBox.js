import { useContext, useEffect, useState } from "react";
import { HiCurrencyDollar } from 'react-icons/hi';
import { IoMdTrendingDown, IoMdTrendingUp } from 'react-icons/io';
import { numberWithCommas } from "../helper";
import { getCoinSupply } from '../anuma-api-client';
import PriceContext from "./PriceContext";


const MarketDataBox = () => {
    const [circCoinsMData, setCircCoinsMData] = useState("-");
    const [isConnected, setIsConnected] = useState(false);
    const { price, marketData } = useContext(PriceContext);

    const initBox = async () => {
        const coin_supply = await getCoinSupply() 
        setCircCoinsMData(Math.round(parseFloat(coin_supply.circulatingSupply) / 100000000));
    }

    const mcap = (() => {
        if (!circCoinsMData || !price) {
            return "N/A"
        }
        const mcap = (circCoinsMData * price).toFixed(0)
        if (mcap / 1_000_000_000 > 10) {
            return (mcap / 1_000_000_000).toFixed(1) + " B"
        } else if (mcap / 1_000_000_000 > 1) {
            return (mcap / 1_000_000_000).toFixed(2) + " B"
        } else if (mcap / 1_000_000 > 10) {
            return (mcap / 1_000_000).toFixed(1) + " M"
        } else if (mcap / 1_000_000 > 1) {
            return (mcap / 1_000_000).toFixed(2) + " M"
        } else if (mcap / 1_000 > 10) {
            return (mcap / 1_000).toFixed(1) + " K"
        } else if (mcap / 1_000 > 1) {
            return (mcap / 1_000).toFixed(2) + " K"
        } else {
            return mcap
        }
    })

    useEffect(() => {
        initBox();
    }, [])



    return <>
        <div className="cardBox mx-0">
            <table>
                <tr>
                    <td colspan='2' className="text-center" style={{ "fontSize": "3.8rem" }}>
                        <HiCurrencyDollar style={{ transform: "translateY(-10px)" }} />
                        <div id="light1" className="cardLight" />
                    </td>
                </tr>
                <tr>
                    <td colspan="2" className="text-center">
                        <h3>Market data</h3>
                    </td>
                </tr>
                <tr>
                    <td className="cardBoxElement">Price</td>
                    <td>$ {price ? price : 'N/A'} / ANUM</td>
                </tr>
                <tr>
                    <td style={{ fontSize: "small" }} className="cardBoxElement" align="right">1h %</td>
                    <td style={{ fontSize: "small" }} className="utxo-value-mono">
                        {marketData?.price_change_percentage_1h_in_currency?.usd > 0 ? <IoMdTrendingUp color='#398851' /> : <IoMdTrendingDown color='#d63328' />}
                        {marketData?.price_change_percentage_1h_in_currency?.usd?.toFixed(1) || 'N/A'} %<br />
                    </td>
                </tr>
                <tr>
                    <td style={{ fontSize: "small" }} className="cardBoxElement" align="right">24h %</td>
                    <td style={{ fontSize: "small" }} className="utxo-value-mono">
                        {marketData?.price_change_percentage_24h > 0 ? <IoMdTrendingUp color='#398851' /> : <IoMdTrendingDown color='#d63328' />}
                        {marketData?.price_change_percentage_24h?.toFixed(1) || 'N/A'} %<br />
                    </td>
                </tr>
                <tr>
                    <td style={{ fontSize: "small" }} className="cardBoxElement" align="right">7d %</td>
                    <td style={{ fontSize: "small" }} className="utxo-value-mono">
                        {marketData?.price_change_percentage_7d > 0 ? <IoMdTrendingUp color='#398851' /> : <IoMdTrendingDown color='#d63328' />}
                        {marketData?.price_change_percentage_7d?.toFixed(1) || 'N/A'} %<br />
                    </td>
                </tr>
                <tr>
                    <td className="cardBoxElement">Volume</td>
                    <td className="pt-1">$ {numberWithCommas(marketData?.total_volume?.usd) || 'N/A'}</td>
                </tr>
                <tr>
                    <td className="cardBoxElement">MCAP</td>
                    <td className="pt-1">$ {(mcap()) || 'N/A'}<a href="https://www.coingecko.com/en/coins/anuma" target="_blank" className="rank ms-1">Rank #{marketData?.market_cap_rank || 'N/A'}</a></td>
                </tr>
            </table>
        </div>
    </>
}


export default MarketDataBox
