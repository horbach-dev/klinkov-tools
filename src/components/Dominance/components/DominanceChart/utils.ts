export const calculatePercentageOfTotalBitcoin = data => {
  // Находим общую сумму всех marketCap
  const totalMarketCap = data.reduce((acc, curr) => {
    if (curr.marketCap) {
      acc += curr.marketCap
    }

    return acc
  }, 0)

  // Находим marketCap Bitcoin
  const bitcoinMarketCap = data.find(item => item.symbol === 'BTC').marketCap

  // Вычисляем процент Bitcoin от общей суммы
  const bitcoinPercentage = (bitcoinMarketCap / totalMarketCap) * 200

  return bitcoinPercentage.toFixed(2) // Округляем до двух знаков после запятой
}
