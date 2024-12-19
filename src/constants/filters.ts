/**
* Типы фильтра.
* @member {string} FilterTypes.popular - Популрярные.
* @member {string} FilterTypes.lowToHigh - От дешёвых к дорогим.
* @member {string} FilterTypes.highToLow - От дорогих к дешёвым.
* @member {string} FilterTypes.topRated - От высокого рейтинга к низкому.
*/
export enum FilterTypes {
  popular = 'Popular',
  lowToHigh = 'Price: low to high',
  highToLow = 'Price: high to low',
  topRated = 'Top rated first',
}
