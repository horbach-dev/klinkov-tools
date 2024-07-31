from liqmap.mapping import HistoricalMapping
from datetime import datetime, timedelta

def generate_liquidation_maps(current_date, exchange):
    periods = [
        {"days": 1, "path": "day"},
#         {"days": 7, "path": "week"},
#         {"days": 30, "path": "month"}
    ]

    for period in periods:
        start_date = (current_date - timedelta(days=period["days"])).replace(hour=0, minute=0, second=0, microsecond=0)
        end_date = (current_date - timedelta(days=1)).replace(hour=23, minute=59, second=59, microsecond=59)

        start_date_str = start_date.strftime("%Y-%m-%d %H:%M:%S")
        end_date_str = end_date.strftime("%Y-%m-%d %H:%M:%S")

        mapping = HistoricalMapping(
            start_datetime=start_date_str,
            end_datetime=end_date_str,
            symbol='BTCUSDT',
            exchange=exchange,
        )

        mapping.liquidation_map_depth_from_historical(
            mode="top_n",
            path=f"result/{period['path']}/{exchange}",
            threshold_top_n=100,
            threshold_portion=0.0001,
        )

current_date = datetime.now()
exchanges = ['binance', 'bybit']

for exchange in exchanges:
    generate_liquidation_maps(current_date, exchange)