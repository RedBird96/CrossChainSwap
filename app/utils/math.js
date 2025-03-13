import { BigNumber, FixedNumber, utils } from 'ethers'
import _ from 'lodash'
import moment from 'moment'

export const headString = (string, delimiter = '-') => _.head(split(string, { delimiter }))

export const isString = (str) => typeof str === 'string'

export const isNumber = (number) => (typeof number === 'number' && !isNaN(number)) || (isString(number) && number && !isNaN(split(number).join('')))

export const ellipse = (string, length = 10, prefix = '') => !isString(string) || !string ? '' : string.length < (length * 2) + 3 ? string : `${string.startsWith(prefix) ? prefix : ''}${string.replace(prefix, '').slice(0, length)}...${string.replace(prefix, '').slice(-length)}`

export const timeDiff = (fromTime = moment().subtract(5, 'minutes'), unit = 'seconds', toTime = moment(), exact = false) => moment(toTime).diff(moment(fromTime), unit, exact)

export const toNumber = (number) => isNumber(number) ? Number(number) : 0

export const toBigNumber = number => {
  try {
    if (FixedNumber.isFixedNumber(number)) return number.round(0).toString().replace('.0', '')
    return BigNumber.from(number).toString()
  } catch (error) {
    return headString(number?.toString(), '.') || '0'
  }
}

export const toCase = (str, _case = 'normal') => {
    if (typeof str !== 'string') return str
    str = str.trim()
    switch (_case) {
      case 'upper':
        str = str.toUpperCase()
        break
      case 'lower':
        str = str.toLowerCase()
        break
      default:
        break
    }
    return str
}

export const split = (str, options) => {
  let { delimiter, toCase: _toCase, filterBlank } = { ...options }
  delimiter = typeof delimiter === 'string' ? delimiter : ','
  _toCase = _toCase || 'normal'
  filterBlank = typeof filterBlank === 'boolean' ? filterBlank : true
  return (typeof str !== 'string' && ![undefined, null].includes(str) ? [str] : (typeof str === 'string' ? str : '').split(delimiter).map(s => toCase(s, _toCase))).filter(s => !filterBlank || s)
}
  
export const toArray = (x, options) => {
  let { delimiter, toCase: _toCase, filterBlank } = { ...options }
  delimiter = typeof delimiter === 'string' ? delimiter : ','
  _toCase = _toCase || 'normal'
  filterBlank = typeof filterBlank === 'boolean' ? filterBlank : true
  if (Array.isArray(x)) return x.map(_x => toCase(_x, _toCase)).filter(_x => !filterBlank || _x)
  return split(x, { delimiter, toCase: _toCase, filterBlank })
}
  
export const formatCompactNumber = (num) => {
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum >= 1e9) {
    return `${sign}${(absNum / 1e9).toLocaleString('en-US', { maximumFractionDigits: 2 })}B`;
  }
  if (absNum >= 1e6) {
    return `${sign}${(absNum / 1e6).toLocaleString('en-US', { maximumFractionDigits: 2 })}M`;
  }
  if (absNum >= 1e3) {
    return `${sign}${(absNum / 1e3).toLocaleString('en-US', { maximumFractionDigits: 2 })}K`;
  }
  return absNum.toLocaleString('en-US', { maximumFractionDigits: 2 });
};