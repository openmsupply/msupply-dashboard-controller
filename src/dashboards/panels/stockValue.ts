const gridPos: GridPosition = {
  x: 0,
  y: 0,
  w: 10,
  h: 2
};

const valueMaps: [ ValueMap ] = [
  { 
    op: "=", 
    text: "N/A", 
    value: "null"
  } 
];

const targets: [ Target ] = [
  {
    rawQuery: true,
    rawSql: `
      select current_date as time, sum(a.value)
      from aggregator a
      join store s on a.storeid = s.id
      where a.dataelement='totalStockValue' and s.name in ([[store]])
      group by 1
    `,
  }
];

const gauge: Gauge = {
  maxValue: 100,
  minValue: 0,
  show: false,
  thresholdLabels: false,
  thresholdMarkers: true
};

const stockValue: GaugePanel = {
  id: 1,
  title: "Total Stock Value",
  type: "singlestat",
  format: "currencyUSD",
  prefix: "USD",
  prefixFontSize: "50%",
  valueName: "avg",
  valueFontSize: "80%",
  datasource: "PostgreSQL",
  gridPos,
  valueMaps,
  targets,
  gauge,
}

export default stockValue;