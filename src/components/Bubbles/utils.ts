function formatNumber(num) {
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(2) + ' трлн $'
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + ' млрд $'
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + ' млн $'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + ' тыс $'
  } else {
    return num + ' $'
  }
}

function formatPercent (percent) {
  return percent.toFixed(2)
}

function formatPrice (num) {
  if (num >= 1000) {
    return num.toFixed() + '$'
  }

  if (num >= 100) {
    return num.toFixed(2) + '$'
  }

  return num.toFixed(6) + '$'
}

export const performList = (list: any) => {
  return list.map(i => {
    return {
      '0': {
        logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${i.id}.png`,
        name: i.name,
        description: `${i.symbol}/USD`,
      },
      '1': {
        price: formatPrice(i.quotes[2].price),
      },
      '2': {
        volume: formatNumber(i.quotes[2].marketCap),
      },
      '3': {
        volume: formatNumber(i.quotes[2].volume24h),
      },
      '4': {
        percent: formatPercent(i.quotes[2].percentChange1h),
      },
      '5': {
        percent: formatPercent(i.quotes[2].percentChange24h),
      },
      '6': {
        percent: formatPercent(i.quotes[2].percentChange7d),
      },
      '7': {
        percent: formatPercent(i.quotes[2].percentChange30d),
      },
      '8': {
        percent: formatPercent(i.quotes[2].percentChange1y),
      },
      '9': {}
    }
  })
}
